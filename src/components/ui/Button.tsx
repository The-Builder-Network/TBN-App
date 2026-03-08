import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Radius, Spacing } from '../../constants/fonts';

type Variant = 'primary' | 'outline' | 'ghost' | 'destructive' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  style,
  textStyle,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? Colors.white : Colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            isDisabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing[2],
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: Colors.transparent,
  },
  secondary: {
    backgroundColor: Colors.muted,
  },
  destructive: {
    backgroundColor: Colors.destructive,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1.5],
    borderRadius: Radius.sm,
  },
  size_md: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2.5],
  },
  size_lg: {
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3.5],
  },

  // Text base
  text: {
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
  },

  // Text variants
  text_primary: { color: Colors.primaryForeground },
  text_outline: { color: Colors.foreground },
  text_ghost: { color: Colors.foreground },
  text_secondary: { color: Colors.foreground },
  text_destructive: { color: Colors.destructiveForeground },
  textDisabled: { opacity: 0.7 },

  // Text sizes
  textSize_sm: { fontSize: FontSizes.sm },
  textSize_md: { fontSize: FontSizes.base },
  textSize_lg: { fontSize: FontSizes.md },
});
