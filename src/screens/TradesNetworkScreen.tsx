import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import Button from '../components/ui/Button';
import AppHeader from '../components/shared/AppHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

const FEATURES = [
  { icon: '🎯', title: 'Pay only for leads you want', desc: 'You choose which job leads to accept — no wasted spend.' },
  { icon: '⭐', title: 'Build your reputation', desc: 'Collect verified reviews that help win more work.' },
  { icon: '🛡️', title: 'Verified profile badge', desc: 'Get a verified badge after completing our quality checks.' },
  { icon: '📍', title: 'Local job leads', desc: 'Receive job leads from homeowners in your area.' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'Create a free profile', desc: 'Sign up, add your trade, and set your service area.' },
  { step: 2, title: 'Receive relevant leads', desc: "We'll alert you to jobs that match your trade and location." },
  { step: 3, title: 'Connect with homeowners', desc: 'Accept the leads you want and chat directly with homeowners.' },
  { step: 4, title: 'Win the work', desc: 'Quote, agree terms, and get the job done.' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TradesNetworkScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [trade, setTrade] = useState('');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = EMAIL_REGEX.test(email);
  const emailError = emailTouched && !emailValid && email.length > 0;
  const canSubmit = !!trade && postcode.length >= 5 && emailValid;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, '#1A56DB']}
        style={[styles.headerGrad, { paddingTop: insets.top + 8 }]}
      >
        <AppHeader title="For Tradespeople" showBack light />
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Hero */}
        <LinearGradient colors={[Colors.primary, '#1A56DB']} style={styles.hero}>
          <Text style={styles.heroTitle}>The reliable way to get{'\n'}the work you want</Text>
          <Text style={styles.heroSubtitle}>
            Join 268,000+ tradespeople getting new leads every day.
          </Text>
        </LinearGradient>

        {/* Sign Up Form */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>View local trade work</Text>
          <View style={styles.formField}>
            <Text style={styles.label}>Your main trade <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Plumber, Electrician..."
              placeholderTextColor={Colors.mutedForeground}
              value={trade}
              onChangeText={setTrade}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Postcode <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. SW1A 1AA"
              placeholderTextColor={Colors.mutedForeground}
              value={postcode}
              onChangeText={(t) => setPostcode(t.toUpperCase())}
              autoCapitalize="characters"
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Email to receive leads <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Your email address"
              placeholderTextColor={Colors.mutedForeground}
              value={email}
              onChangeText={setEmail}
              onBlur={() => setEmailTouched(true)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>Please enter a valid email address</Text> : null}
          </View>
          <Text style={styles.terms}>
            By signing up, you agree to{' '}
            <Text style={styles.termsLink} onPress={() => navigation.navigate('ProfileTab', { screen: 'Terms' })}>
              Terms and Conditions
            </Text>
            .{' '}
            <Text style={styles.termsLink} onPress={() => navigation.navigate('ProfileTab', { screen: 'Privacy' })}>
              Privacy policy
            </Text>
            .
          </Text>
          <Button
            disabled={!canSubmit}
            fullWidth
            size="lg"
            style={{ marginTop: Spacing[2] }}
          >
            Sign up for free
          </Button>
        </Card>

        {/* How it works */}
        <View style={styles.section}>
          <SectionHeader title="How it works" titleSize="2xl" center style={styles.sectionHeader} />
          {HOW_IT_WORKS.map((item) => (
            <View key={item.step} style={styles.howStep}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{item.step}</Text>
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={[styles.section, { backgroundColor: Colors.muted }]}>
          <SectionHeader title="Why choose The Builder Network?" titleSize="2xl" center style={styles.sectionHeader} />
          <View style={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <Card key={f.title} style={styles.featureCard} padded>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* CTA Banner */}
        <LinearGradient colors={[Colors.primary, '#1A56DB']} style={styles.ctaBanner}>
          <Text style={styles.ctaTitle}>Say yes to the work you want</Text>
          <Text style={styles.ctaText}>Join for free. No subscription needed.</Text>
          <Button
            variant="outline"
            size="lg"
            style={styles.ctaBtn}
            textStyle={{ color: Colors.white }}
          >
            Get started — it's free
          </Button>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerGrad: { paddingBottom: 0 },
  hero: { padding: Spacing[5], paddingBottom: Spacing[8], gap: Spacing[3] },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.white,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
  },
  formCard: {
    margin: Spacing[4],
    gap: Spacing[3],
    padding: Spacing[5],
  },
  formTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    color: Colors.foreground,
    marginBottom: Spacing[2],
  },
  formField: { gap: Spacing[1.5] },
  label: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  req: { color: Colors.destructive },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  inputError: { borderColor: Colors.destructive },
  errorText: { fontSize: FontSizes.xs, color: Colors.destructive, fontFamily: Fonts.regular },
  terms: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.mutedForeground,
    lineHeight: 18,
  },
  termsLink: { color: Colors.primary, textDecorationLine: 'underline' },
  section: { padding: Spacing[5] },
  sectionHeader: { marginBottom: Spacing[5] },
  howStep: { flexDirection: 'row', gap: Spacing[4], marginBottom: Spacing[5] },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: { fontFamily: Fonts.bold, fontSize: FontSizes.base, color: Colors.white },
  stepBody: { flex: 1, gap: Spacing[1] },
  stepTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.md, color: Colors.foreground },
  stepDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  featuresGrid: { gap: Spacing[3] },
  featureCard: { gap: Spacing[2] },
  featureIcon: { fontSize: 28 },
  featureTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.md, color: Colors.foreground },
  featureDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  ctaBanner: { padding: Spacing[6], gap: Spacing[3] },
  ctaTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white },
  ctaText: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: 'rgba(255,255,255,0.85)' },
  ctaBtn: { alignSelf: 'flex-start', borderColor: 'rgba(255,255,255,0.5)', marginTop: Spacing[2] },
});
