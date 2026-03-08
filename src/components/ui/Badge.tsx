import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Radius, Spacing } from '../../constants/fonts';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'info';

interface BadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export default function Badge({ children, label, variant = 'default', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label ?? children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
  },
  // Variants
  default: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.muted },
  outline: { backgroundColor: Colors.transparent, borderWidth: 1, borderColor: Colors.border },
  success: { backgroundColor: '#DCFCE7' },
  warning: { backgroundColor: '#FEF3C7' },
  destructive: { backgroundColor: '#FEE2E2' },
  info: { backgroundColor: '#DBEAFE' },
  // Text variants
  text_default: { color: Colors.primaryForeground },
  text_secondary: { color: Colors.mutedForeground },
  text_outline: { color: Colors.foreground },
  text_success: { color: '#166534' },
  text_warning: { color: '#92400E' },
  text_destructive: { color: '#991B1B' },
  text_info: { color: '#1E40AF' },
});
