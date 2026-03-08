import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing } from '../constants/fonts';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';

const BENEFITS = [
  { icon: '🔔', title: 'Quality leads', desc: 'Receive job alerts matched to your trade and location so you only see relevant opportunities.' },
  { icon: '🌍', title: 'Grow your reach', desc: 'Get your business in front of thousands of homeowners actively looking for tradespeople.' },
  { icon: '⭐', title: 'Build your reputation', desc: 'Collect genuine reviews that help future homeowners choose you with confidence.' },
  { icon: '🛡️', title: 'Verified badge', desc: 'Show homeowners you are trustworthy with our verification badge on your profile.' },
  { icon: '💰', title: 'Pay per lead', desc: 'No subscriptions. Only pay for the leads you want to respond to.' },
  { icon: '📱', title: 'Manage on the go', desc: 'Use the app to manage your profile, leads and messages from anywhere.' },
];

const STEPS = [
  { step: '1', title: 'Create a free account', desc: 'Register as a tradesperson and fill in your business details.' },
  { step: '2', title: 'Complete verification', desc: 'Submit your ID, insurance and any relevant qualifications for review.' },
  { step: '3', title: 'Get approved', desc: 'Our team will review your application within 48 hours.' },
  { step: '4', title: 'Start receiving leads', desc: 'Once approved, you will start receiving job alerts in your area.' },
];

export default function BecomeAPartnerScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Become a Partner" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <LinearGradient colors={[Colors.foreground, '#1A2A4A']} style={styles.hero}>
          <Text style={styles.heroTitle}>Grow your business with The Builder Network</Text>
          <Text style={styles.heroDesc}>Join thousands of tradespeople already winning more jobs through our platform.</Text>
          <Button
            size="lg"
            onPress={() => navigation.navigate('Login')}
            style={styles.heroCta}
          >
            Register as a tradesperson
          </Button>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why join us?</Text>
          {BENEFITS.map((b) => (
            <View key={b.title} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: Colors.muted }]}>
          <Text style={styles.sectionTitle}>How to get started</Text>
          {STEPS.map((s) => (
            <View key={s.step} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{s.step}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Button size="lg" fullWidth onPress={() => navigation.navigate('Login')}>
            Get started for free
          </Button>
          <Text style={styles.note}>No subscription required. Pay only for the leads you choose.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing[6], gap: Spacing[3] },
  heroTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white, lineHeight: 32 },
  heroDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: 'rgba(255,255,255,0.8)', lineHeight: 22 },
  heroCta: { marginTop: Spacing[1] },
  section: { padding: Spacing[4], gap: Spacing[3] },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  benefitRow: { flexDirection: 'row', gap: Spacing[3], alignItems: 'flex-start' },
  benefitIcon: { fontSize: 22, width: 28, textAlign: 'center', marginTop: 2 },
  benefitTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  benefitDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginTop: 2, lineHeight: 20 },
  stepRow: { flexDirection: 'row', gap: Spacing[3], alignItems: 'flex-start' },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBadgeText: { fontFamily: Fonts.bold, fontSize: FontSizes.sm, color: Colors.white },
  stepTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  stepDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginTop: 2, lineHeight: 20 },
  note: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, textAlign: 'center' },
});
