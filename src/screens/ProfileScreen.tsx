import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { useAuth } from '../hooks/useAuth';
import AppHeader from '../components/shared/AppHeader';
import Separator from '../components/ui/Separator';
import Button from '../components/ui/Button';

type MenuRow = {
  icon: string;
  label: string;
  screen?: string;
  onPress?: () => void;
  danger?: boolean;
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const authMenuItems: MenuRow[] = user?.role === 'homeowner'
    ? [
        { icon: '🏡', label: 'My Profile', screen: 'HomeownerProfile' },
        { icon: '📋', label: 'My Jobs', screen: 'HomeownerMyJobs' },
        { icon: '❓', label: 'My Questions', screen: 'HomeownerMyQuestions' },
      ]
    : [
        { icon: '🔧', label: 'My Profile', screen: 'TradespersonProfile' },
        { icon: '🔔', label: 'My Leads', screen: 'TradespersonMyLeads' },
      ];

  const infoMenuItems: MenuRow[] = [
    { icon: 'ℹ️', label: 'How It Works', screen: 'HowItWorks' },
    { icon: '🏢', label: 'About Us', screen: 'About' },
    { icon: '📍', label: 'Cities We Serve', screen: 'Cities' },
    { icon: '🤝', label: 'Become a Partner', screen: 'BecomeAPartner' },
    { icon: '✅', label: 'Quality Checks', screen: 'QualityChecks' },
    { icon: '💬', label: 'Questions', screen: 'Questions' },
  ];

  const legalMenuItems: MenuRow[] = [
    { icon: '📄', label: 'Terms of Service', screen: 'Terms' },
    { icon: '🔒', label: 'Privacy Policy', screen: 'Privacy' },
    { icon: '⭐', label: 'Reviews Policy', screen: 'ReviewsPolicy' },
    { icon: '🛡️', label: 'Quality Requirements', screen: 'QualityRequirements' },
  ];

  const renderRow = (item: MenuRow) => (
    <TouchableOpacity
      key={item.label}
      style={styles.row}
      onPress={item.onPress || (() => item.screen && navigation.navigate(item.screen))}
      activeOpacity={0.7}
    >
      <Text style={styles.rowIcon}>{item.icon}</Text>
      <Text style={[styles.rowLabel, item.danger && styles.rowLabelDanger]}>{item.label}</Text>
      <Text style={styles.rowArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Profile & Settings" showLogo />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* User card */}
        {isAuthenticated && user ? (
          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{(user.firstName || user.email)[0].toUpperCase()}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.email}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.userRoleBadge}>
                <Text style={styles.userRoleText}>{user.role === 'homeowner' ? '🏡 Homeowner' : '🔧 Tradesperson'}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.guestCard}>
            <Text style={styles.guestTitle}>Join The Builder Network</Text>
            <Text style={styles.guestDesc}>Sign in or create an account to post jobs and connect with tradespeople.</Text>
            <View style={styles.guestButtons}>
              <Button size="md" onPress={() => navigation.navigate('Login')} style={{ flex: 1 }}>
                Sign in
              </Button>
              <Button variant="outline" size="md" onPress={() => navigation.navigate('Login')} style={{ flex: 1 }}>
                Register
              </Button>
            </View>
          </View>
        )}

        {/* Auth-specific routes */}
        {isAuthenticated && user && (
          <>
            <View style={styles.group}>
              <Text style={styles.groupTitle}>My Account</Text>
              {authMenuItems.map(renderRow)}
            </View>
            <Separator />
          </>
        )}

        {/* Info */}
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Information</Text>
          {infoMenuItems.map(renderRow)}
        </View>

        <Separator />

        {/* Legal */}
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Legal</Text>
          {legalMenuItems.map(renderRow)}
        </View>

        {/* Logout */}
        {isAuthenticated && (
          <>
            <Separator />
            <View style={styles.group}>
              {renderRow({ icon: '🚪', label: 'Sign Out', onPress: handleLogout, danger: true })}
            </View>
          </>
        )}

        <Text style={styles.version}>The Builder Network v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.muted },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    backgroundColor: Colors.background,
    padding: Spacing[4],
    marginBottom: Spacing[2],
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white },
  userInfo: { flex: 1, gap: 2 },
  userName: { fontFamily: Fonts.bold, fontSize: FontSizes.md, color: Colors.foreground },
  userEmail: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  userRoleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: Radius.full,
    marginTop: 2,
  },
  userRoleText: { fontFamily: Fonts.semiBold, fontSize: 11, color: '#1E40AF' },
  guestCard: {
    backgroundColor: Colors.background,
    padding: Spacing[4],
    marginBottom: Spacing[2],
    gap: Spacing[2.5],
  },
  guestTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  guestDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  guestButtons: { flexDirection: 'row', gap: Spacing[2] },
  group: { backgroundColor: Colors.background, paddingHorizontal: Spacing[4], paddingVertical: Spacing[1] },
  groupTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xs,
    color: Colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingVertical: Spacing[2.5],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[3],
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing[3],
  },
  rowIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  rowLabel: { flex: 1, fontFamily: Fonts.medium, fontSize: FontSizes.base, color: Colors.foreground },
  rowLabelDanger: { color: Colors.destructive },
  rowArrow: { fontSize: 20, color: Colors.mutedForeground },
  version: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.mutedForeground,
    textAlign: 'center',
    marginTop: Spacing[4],
    marginBottom: Spacing[2],
  },
});
