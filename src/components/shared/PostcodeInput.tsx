import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { validateUKPostcode } from '../../helpers/postcodeHelper';

interface PostcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  placeholder?: string;
  className?: string;
}

export default function PostcodeInput({
  value,
  onChange,
  onValidationChange,
  placeholder = 'e.g. EX37 9HW',
  className = '',
}: PostcodeInputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState('');

  const normalized = useMemo(() => value.trim().toUpperCase(), [value]);

  useEffect(() => {
    if (!normalized) {
      setPlaceName('');
      setError('');
      onValidationChange?.(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      setError('');
      const result = await validateUKPostcode(normalized);
      setPlaceName(result.placeName);
      setError(result.error);
      onValidationChange?.(result.isValid);
      setIsValidating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [normalized, onValidationChange]);

  return (
    <View className={`gap-2 ${className}`.trim()}>
      <View className="border-border h-16 flex-row items-center rounded-xl border bg-white px-4">
        <TextInput
          className="text-foreground min-w-[92px] flex-1 p-0 font-sans text-lg"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={(text) => onChange(text.toUpperCase())}
          autoCapitalize="characters"
        />
        {placeName ? (
          <>
            <Text className="text-muted-foreground px-2 text-lg">|</Text>
            <Text className="text-muted-foreground flex-shrink text-lg" numberOfLines={1}>
              {placeName}
            </Text>
          </>
        ) : null}
      </View>

      {error ? <Text className="text-destructive text-sm">{error}</Text> : null}

      {isValidating ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color="#0A68FF" />
          <Text className="text-muted-foreground text-sm">Validating postcode...</Text>
        </View>
      ) : null}
    </View>
  );
}
