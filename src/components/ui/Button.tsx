import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextStyle,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

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

const variantClass: Record<Variant, string> = {
  primary: 'bg-primary',
  outline: 'bg-transparent border border-border',
  ghost: 'bg-transparent',
  secondary: 'bg-muted',
  destructive: 'bg-destructive',
};

const sizeClass: Record<Size, string> = {
  sm: 'px-4 py-2 rounded-md',
  md: 'px-5 py-3 rounded-md',
  lg: 'px-7 py-4 rounded-lg',
};

const textVariantClass: Record<Variant, string> = {
  primary: 'text-white font-semibold',
  outline: 'text-foreground font-semibold',
  ghost: 'text-foreground font-semibold',
  secondary: 'text-foreground font-semibold',
  destructive: 'text-white font-semibold',
};

const textSizeClass: Record<Size, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
};

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
  const baseClass = `flex-row items-center justify-center gap-2 ${variantClass[variant]} ${sizeClass[size]}${fullWidth ? ' w-full' : ''}${isDisabled ? ' opacity-50' : ''}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={baseClass}
      style={style}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? '#ffffff' : '#0A68FF'}
        />
      ) : (
        <Text
          className={`text-center ${textVariantClass[variant]} ${textSizeClass[size]}`}
          style={textStyle}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
