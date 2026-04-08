import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { validateUKPostcode } from '../../helpers/postcodeHelper';
import type { QuestionNode, AnswerValue } from '../../types/post-job';
import PostcodeInput from '../shared/PostcodeInput';

interface QuestionRendererProps {
  node: QuestionNode;
  initialAnswer?: AnswerValue;
  onNext: (answer: AnswerValue) => void;
  onBack: (() => void) | null;
}

const QuestionRenderer = ({ node, initialAnswer, onNext, onBack }: QuestionRendererProps) => {
  const [draft, setDraft] = useState<AnswerValue>(initialAnswer ?? getDefault(node));
  const [isPostcodeValid, setIsPostcodeValid] = useState(true);

  useEffect(() => {
    setDraft(initialAnswer ?? getDefault(node));
    setIsPostcodeValid(true);
  }, [node.id]);

  const canProceed = isValid(node, draft) && isPostcodeValid;

  return (
    <View className="mt-2 gap-3">
      {/* Label */}
      <View className="gap-1">
        <Text className="text-foreground text-base font-medium">
          {node.formLabel}
          {node.required !== false && <Text className="text-destructive"> *</Text>}
        </Text>
        {node.helpText ? (
          <Text className="text-muted-foreground text-sm">{node.helpText}</Text>
        ) : null}
      </View>

      {/* Question body */}
      {node.type === 'SelectQuestion' && (
        <SelectBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === 'CheckboxQuestion' && (
        <CheckboxBody node={node} value={draft as string[]} onChange={setDraft} />
      )}
      {node.type === 'TextareaQuestion' && (
        <TextareaBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === 'TitleQuestion' && (
        <TitleBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === 'PostalCodeQuestion' && (
        <PostalCodeBody
          node={node}
          value={draft as string}
          onChange={setDraft}
          onValidationChange={setIsPostcodeValid}
        />
      )}
      {node.type === 'AttachmentQuestion' && <AttachmentBody />}

      {/* Nav buttons */}
      <View className="flex-row gap-3 pt-2">
        {onBack && (
          <TouchableOpacity
            className="border-border h-12 items-center justify-center rounded-md border px-6"
            onPress={onBack}
            activeOpacity={0.8}>
            <Text className="text-foreground text-sm font-medium">Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={`bg-primary h-12 flex-1 items-center rounded-md justify-center${!canProceed ? ' opacity-40' : ''}`}
          onPress={() => {
            if (canProceed) onNext(draft);
          }}
          disabled={!canProceed}
          activeOpacity={0.85}>
          <Text className="text-base font-medium text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionRenderer;

// ─── Sub-renderers ───────────────────────────────────────────────

function SelectBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});

  return (
    <View className="gap-2 ">
      {node.options?.map((opt) => {
        const selected = value === opt.id;
        return (
          <View key={opt.id}>
            <TouchableOpacity
              className={`flex-row items-center gap-3 rounded-lg border px-3 py-3 ${selected ? 'border-primary bg-blue-50' : 'border-border bg-white'}`}
              onPress={() => onChange(opt.id)}
              activeOpacity={0.7}>
              {/* Radio circle */}
              <View
                className={`h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-border'}`}>
                {selected && <View className="bg-primary h-2.5 w-2.5 rounded-full" />}
              </View>
              <View className="flex-1">
                <Text className="text-foreground text-base">{opt.formLabel}</Text>
                {opt.helpText ? (
                  <Text className="text-muted-foreground mt-0.5 text-xs">{opt.helpText}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
            {opt.type === 'TextChoiceOption' && selected && (
              <TextInput
                className="border-border text-foreground ml-8 mt-2 h-10 rounded-md border bg-white px-3 font-sans text-base"
                placeholder={opt.placeholder ?? 'Please specify...'}
                placeholderTextColor="#6B7280"
                value={otherTexts[opt.id] ?? ''}
                onChangeText={(t) => setOtherTexts((prev) => ({ ...prev, [opt.id]: t }))}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

function CheckboxBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <View className="gap-2">
      {node.options?.map((opt) => {
        const checked = value.includes(opt.id);
        return (
          <TouchableOpacity
            key={opt.id}
            className={`flex-row items-center gap-3 rounded-lg border px-3 py-3 ${checked ? 'border-primary bg-blue-50' : 'border-border bg-white'}`}
            onPress={() => toggle(opt.id)}
            activeOpacity={0.7}>
            {/* Checkbox square */}
            <View
              className={`h-5 w-5 items-center justify-center rounded border-2 ${checked ? 'border-primary bg-primary' : 'border-border'}`}>
              {checked && <Text className="text-xs font-bold text-white">✓</Text>}
            </View>
            <View className="flex-1 font-sans">
              <Text className="text-foreground text-base">{opt.formLabel}</Text>
              {opt.helpText ? (
                <Text className="text-muted-foreground mt-0.5 text-xs">{opt.helpText}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TextareaBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View className="gap-1">
      <TextInput
        className="border-border text-foreground rounded-md border bg-white px-3 py-3 font-sans text-base"
        multiline
        style={{ minHeight: 160, textAlignVertical: 'top' }}
        placeholder={node.placeholder ?? ''}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChange}
        maxLength={node.maxLength}
      />
      {node.minLength ? (
        <Text className="text-muted-foreground text-xs">Min {node.minLength} chars</Text>
      ) : null}
    </View>
  );
}

function TitleBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <TextInput
      className="border-border text-foreground h-12 rounded-md border bg-white px-3 font-sans text-base"
      placeholder={node.placeholder ?? 'e.g. Single storey extension'}
      placeholderTextColor="#6B7280"
      value={value}
      onChangeText={onChange}
      maxLength={node.maxLength}
    />
  );
}

function PostalCodeBody({
  value,
  onChange,
  onValidationChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
  onValidationChange: (isValid: boolean) => void;
}) {
  return (
    <PostcodeInput
      value={value}
      onChange={onChange}
      onValidationChange={onValidationChange}
      placeholder="e.g. EX37 9HW"
    />
  );
}

function AttachmentBody() {
  return (
    <View
      className="border-border items-center justify-center rounded-lg border-2 border-dashed p-8"
      style={{ minHeight: 160 }}>
      <Text className="mb-3 text-3xl">📎</Text>
      <Text className="text-muted-foreground text-center text-sm">
        Photo uploads are available on the web app.{'\n'}You can still continue without photos.
      </Text>
    </View>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────

function getDefault(node: QuestionNode): AnswerValue {
  switch (node.type) {
    case 'CheckboxQuestion':
      return [] as string[];
    default:
      return '';
  }
}

function isValid(node: QuestionNode, answer: AnswerValue): boolean {
  if (node.required === false) return true;
  switch (node.type) {
    case 'SelectQuestion':
      return typeof answer === 'string' && answer.length > 0;
    case 'CheckboxQuestion':
      return Array.isArray(answer) && answer.length > 0;
    case 'TextareaQuestion': {
      const text = answer as string;
      return text.trim().length >= (node.minLength ?? 1);
    }
    case 'TitleQuestion':
      return typeof answer === 'string' && answer.trim().length > 0;
    case 'PostalCodeQuestion':
      return typeof answer === 'string' && answer.trim().length > 0;
    case 'AttachmentQuestion':
      return true;
    default:
      return true;
  }
}
