import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Input({ label, error, required, ...props }: InputProps) {
  return (
    <View className="gap-2">
      {label ? (
        <Text className="text-foreground text-base font-medium">
          {label}
          {required && <Text className="text-destructive"> *</Text>}
        </Text>
      ) : null}
      <TextInput
        className={`text-foreground h-14 rounded-md border bg-white px-4 font-sans text-lg ${
          error ? 'border-destructive' : 'border-border'
        }`}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error ? <Text className="text-destructive text-sm">{error}</Text> : null}
    </View>
  );
}
