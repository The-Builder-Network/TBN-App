// ── Question tree types ──

export type QuestionType =
  | 'SelectQuestion'
  | 'CheckboxQuestion'
  | 'TextareaQuestion'
  | 'TitleQuestion'
  | 'PostalCodeQuestion'
  | 'AttachmentQuestion';

export type OptionType = 'StandardChoiceOption' | 'TextChoiceOption';

export interface QuestionOption {
  id: string;
  type: OptionType;
  formLabel: string;
  helpText: string | null;
  placeholder?: string;
  next?: QuestionNode;
}

export interface QuestionNode {
  id: string;
  type: QuestionType;
  required?: boolean;
  formLabel: string;
  helpText?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  options?: QuestionOption[];
  next?: QuestionNode;
}

export interface QuestionTree {
  questionTree: {
    id: string;
    name: string;
    schema: QuestionNode;
    jobFunnel?: {
      id: number;
      name: string;
      type: string;
    };
  };
}

export type AnswerValue = string | string[];

export type Answers = Record<string, AnswerValue>;

export interface HistoryEntry {
  node: QuestionNode;
  answer: AnswerValue;
}
