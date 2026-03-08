import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes } from '../../constants/fonts';

interface SeparatorProps {
  style?: ViewStyle;
  vertical?: boolean;
  label?: string;
}

export default function Separator({ style, vertical = false, label }: SeparatorProps) {
  if (label) {
    return (
      <View style={[styles.labelRow, style]}>
        <View style={styles.line} />
        <Text style={styles.labelText}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: Colors.border,
    width: '100%',
  },
  vertical: {
    width: 1,
    backgroundColor: Colors.border,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  labelText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.mutedForeground,
  },
});

