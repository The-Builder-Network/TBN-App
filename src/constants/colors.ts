/**
 * The Builder Network Design Tokens
 * Converted from the web app's CSS custom properties (hsl values)
 * Font: Space Grotesk
 */

export const Colors = {
  /** Deep navy blue - hsl(217, 100%, 52%) */
  primary: '#0A68FF',
  primaryForeground: '#FFFFFF',

  /** Dark navy foreground - hsl(222, 47%, 11%) */
  foreground: '#0F1729',

  /** White background */
  background: '#FFFFFF',

  /** Light gray card - hsl(0, 0%, 100%) */
  card: '#FFFFFF',
  cardForeground: '#0F1729',

  /** Subtle muted backgrounds - hsl(220, 14%, 96%) */
  muted: '#F3F4F6',
  mutedForeground: '#6B7280',

  /** Accent (same as primary) */
  accent: '#0A68FF',
  accentForeground: '#FFFFFF',

  /** Border / input - hsl(220, 13%, 91%) */
  border: '#E4E7EB',
  input: '#E4E7EB',

  /** Red highlight accent */
  highlight: '#EF3E50',

  /** Success green - hsl(142, 71%, 45%) */
  success: '#22C55E',
  successForeground: '#FFFFFF',

  /** Warning amber */
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',

  /** Destructive red */
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  /** Info blue */
  info: '#0EA5E9',
  infoForeground: '#FFFFFF',

  /** Star yellow */
  star: '#EAB308',

  /** Ring */
  ring: '#0A68FF',

  /** Tab bar */
  tabBar: '#FFFFFF',
  tabBarBorder: '#E4E7EB',
  tabBarActive: '#0A68FF',
  tabBarInactive: '#9CA3AF',

  /** Grey scale */
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  /** Black / White */
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
};

export type ColorKey = keyof typeof Colors;
