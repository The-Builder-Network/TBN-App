import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing } from '../../constants/fonts';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  center?: boolean;
  titleSize?: 'lg' | 'xl' | '2xl' | '3xl';
}

export default function SectionHeader({
  title,
  subtitle,
  style,
  center = false,
  titleSize = '2xl',
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, center && styles.centered, style]}>
      <Text
        style={[
          styles.title,
          { fontSize: FontSizes[titleSize] },
          center && styles.centeredText,
        ]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, center && styles.centeredText]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[2],
    marginBottom: Spacing[4],
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.foreground,
    lineHeight: 36,
  },
  centeredText: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mutedForeground,
    lineHeight: 22,
  },
});
