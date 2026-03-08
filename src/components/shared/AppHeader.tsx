import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing } from '../../constants/fonts';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
  light?: boolean;
}

export default function AppHeader({
  title,
  showBack = false,
  showLogo = false,
  rightElement,
  transparent = false,
  light = false,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        transparent ? styles.transparent : styles.opaque,
        light && styles.light,
      ]}
    >
      <View style={styles.inner}>
        {/* Left */}
        <View style={styles.side}>
          {showBack && navigation.canGoBack() ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.backIcon, light && styles.lightText]}>←</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Center */}
        <View style={styles.center}>
          {showLogo ? (
            <Text style={[styles.logoText, light && styles.lightText]}>
              The Builder Network
            </Text>
          ) : title ? (
            <Text
              style={[styles.title, light && styles.lightText]}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
        </View>

        {/* Right */}
        <View style={styles.side}>{rightElement ?? <View />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    paddingBottom: Spacing[2],
    paddingHorizontal: Spacing[4],
  },
  opaque: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transparent: {
    backgroundColor: Colors.transparent,
  },
  light: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 0,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  side: {
    minWidth: 44,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  backBtn: {
    padding: Spacing[1],
  },
  backIcon: {
    fontSize: 22,
    color: Colors.foreground,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.foreground,
  },
  logoText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.foreground,
    letterSpacing: -0.3,
  },
  lightText: {
    color: Colors.white,
  },
});
