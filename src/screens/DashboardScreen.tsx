import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { useAuth } from '../hooks/useAuth';
import AppHeader from '../components/shared/AppHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HOMEOWNER_QUICK_LINKS = [
  { label: 'My Jobs', description: 'View and manage your posted jobs', icon: '📋', tabScreen: null, screen: 'HomeownerMyJobs' },
  { label: 'My Questions', description: 'Answers to your home questions', icon: '❓', tabScreen: null, screen: 'HomeownerMyQuestions' },
  { label: 'My Profile', description: 'Update your account details', icon: '👤', tabScreen: 'ProfileTab', screen: 'HomeownerProfile' },
];

const TRADESPERSON_QUICK_LINKS = [
  { label: 'My Leads', description: 'Browse and respond to new leads', icon: '🔔', tabScreen: null, screen: 'TradespersonMyLeads' },
  { label: 'My Profile', description: 'Update your business profile', icon: '🔧', tabScreen: 'ProfileTab', screen: 'TradespersonProfile' },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppHeader title="Dashboard" showLogo />
        <View style={styles.unauthContent}>
          <Text style={styles.unauthTitle}>Sign in to continue</Text>
          <Text style={styles.unauthDesc}>
            Create an account or sign in to access your personal dashboard.
          </Text>
          <Button
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('ProfileTab', { screen: 'Login' })}
          >
            Sign in
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('ProfileTab', { screen: 'Login' })}
          >
            Create account
          </Button>
          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why create an account?</Text>
            {['Post jobs and track responses', 'Message tradespeople directly', 'Save your favourite professionals', 'Access your job history'].map((item) => (
              <View key={item} style={styles.infoRow}>
                <Text style={styles.infoCheck}>✓</Text>
                <Text style={styles.infoText}>{item}</Text>
              </View>
            ))}
          </Card>
        </View>
      </View>
    );
  }

  const isHomeowner = user.role === 'homeowner';
  const links = isHomeowner ? HOMEOWNER_QUICK_LINKS : TRADESPERSON_QUICK_LINKS;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Dashboard" showLogo />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Welcome banner */}
        <View style={styles.welcome}>
          <View style={styles.welcomeLeft}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.welcomeName}>{user.firstName || user.email}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{(user.firstName || user.email)[0].toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Role badge */}
          <View style={[styles.roleBadge, isHomeowner ? styles.roleBadgeHomeowner : styles.roleBadgeTrade]}>
            <Text style={[styles.roleText, isHomeowner ? styles.roleTextHomeowner : styles.roleTextTrade]}>
              {isHomeowner ? '🏡 Homeowner' : '🔧 Tradesperson'}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Quick actions</Text>

          {links.map((link) => (
            <TouchableOpacity
              key={link.screen}
              style={styles.linkCard}
              onPress={() =>
                link.tabScreen
                  ? navigation.navigate(link.tabScreen, { screen: link.screen })
                  : navigation.navigate(link.screen)
              }
              activeOpacity={0.7}
            >
              <Text style={styles.linkIcon}>{link.icon}</Text>
              <View style={styles.linkText}>
                <Text style={styles.linkLabel}>{link.label}</Text>
                <Text style={styles.linkDesc}>{link.description}</Text>
              </View>
              <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>
          ))}

          {isHomeowner && (
            <Button
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob' })}
            >
              Post a new job
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  unauthContent: { flex: 1, padding: Spacing[5], gap: Spacing[3] },
  unauthTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground, textAlign: 'center' },
  unauthDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 22 },
  infoCard: { gap: Spacing[2] },
  infoTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground, marginBottom: Spacing[1] },
  infoRow: { flexDirection: 'row', gap: Spacing[2.5], alignItems: 'flex-start' },
  infoCheck: { color: Colors.primary, fontFamily: Fonts.bold, fontSize: FontSizes.base },
  infoText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, flex: 1 },
  welcome: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing[5],
  },
  welcomeLeft: { gap: 2 },
  welcomeText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: 'rgba(255,255,255,0.75)' },
  welcomeName: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.white },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.white },
  body: { padding: Spacing[4], gap: Spacing[3] },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1.5],
    borderRadius: Radius.full,
  },
  roleBadgeHomeowner: { backgroundColor: '#DBEAFE' },
  roleBadgeTrade: { backgroundColor: '#FEF3C7' },
  roleText: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm },
  roleTextHomeowner: { color: '#1E40AF' },
  roleTextTrade: { color: '#92400E' },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing[4],
  },
  linkIcon: { fontSize: 24 },
  linkText: { flex: 1, gap: 2 },
  linkLabel: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  linkDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  linkArrow: { fontSize: 22, color: Colors.mutedForeground },
});
