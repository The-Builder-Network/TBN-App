import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';

const HOW_STEPS = [
  {
    step: '01',
    title: 'Post your job',
    desc: 'Tell us what you need done. It takes less than 2 minutes and it\'s completely free.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Receive quotes',
    desc: 'Up to 3 qualified tradespeople will contact you, usually within hours.',
    icon: '💬',
  },
  {
    step: '03',
    title: 'Compare & choose',
    desc: 'Read reviews, compare quotes, and pick the best professional for your job.',
    icon: '✅',
  },
];

const WHY_ITEMS = [
  { icon: '🛡️', title: 'Vetted professionals', desc: 'Every tradesperson is ID verified, insured and background checked before joining.' },
  { icon: '⭐', title: 'Genuine reviews', desc: 'All reviews are from real homeowners who have used the service.' },
  { icon: '🆓', title: 'Free to post', desc: 'Posting a job is always free. No hidden charges or subscriptions.' },
  { icon: '🔒', title: 'Safe & secure', desc: 'Your personal data is protected and never shared without consent.' },
];

const FAQS = [
  { q: 'How much does it cost to post a job?', a: 'Posting a job on The Builder Network is completely free. Tradespeople pay to access leads, not homeowners.' },
  { q: 'How quickly will I receive quotes?', a: 'Most jobs receive their first response within a few hours. For urgent jobs, you can mark them accordingly.' },
  { q: 'How do I know the tradespeople are reliable?', a: 'All tradespeople on our platform are vetted. We check ID, insurance and run background checks.' },
  { q: 'What if I am not happy with the work?', a: 'Our quality guarantee means we will work with you to resolve any issues. Contact our support team.' },
  { q: 'Can I post multiple jobs?', a: 'Yes, you can post as many jobs as you need entirely for free.' },
];

export default function HowItWorksScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="How It Works" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <LinearGradient colors={[Colors.primary, '#0050D1']} style={styles.hero}>
          <Text style={styles.heroTitle}>Get your jobs done with confidence</Text>
          <Text style={styles.heroDesc}>The Builder Network connects you with trusted local tradespeople — completely free.</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          {HOW_STEPS.map((step) => (
            <View key={step.step} style={styles.stepCard}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{step.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.section, styles.whySection]}>
          <Text style={styles.sectionTitle}>Why use The Builder Network?</Text>
          {WHY_ITEMS.map((item) => (
            <View key={item.title} style={styles.whyCard}>
              <Text style={styles.whyIcon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.whyTitle}>{item.title}</Text>
                <Text style={styles.whyDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently asked questions</Text>
          {FAQS.map((faq, i) => (
            <TouchableOpacity
              key={i}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
              activeOpacity={0.75}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQ}>{faq.q}</Text>
                <Text style={styles.faqChevron}>{expandedFaq === i ? '▲' : '▼'}</Text>
              </View>
              {expandedFaq === i && <Text style={styles.faqA}>{faq.a}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Button size="lg" fullWidth onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob' })}>
            Post a job for free
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing[6], gap: Spacing[2] },
  heroTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white, lineHeight: 32 },
  heroDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: 'rgba(255,255,255,0.85)', lineHeight: 22 },
  section: { padding: Spacing[4], gap: Spacing[3] },
  whySection: { backgroundColor: Colors.muted },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  stepCard: {
    flexDirection: 'row',
    gap: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing[3],
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: { fontFamily: Fonts.bold, fontSize: FontSizes.sm, color: Colors.white },
  stepContent: { flex: 1, gap: Spacing[0.5] },
  stepIcon: { fontSize: 20 },
  stepTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  stepDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
  whyCard: { flexDirection: 'row', gap: Spacing[3], alignItems: 'flex-start' },
  whyIcon: { fontSize: 24, width: 32, textAlign: 'center' },
  whyTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  whyDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginTop: 2, lineHeight: 20 },
  faqItem: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing[3],
    gap: Spacing[2],
  },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing[2] },
  faqQ: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground, flex: 1 },
  faqChevron: { fontSize: 10, color: Colors.mutedForeground, marginTop: 2 },
  faqA: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
  ctaSection: { padding: Spacing[4], gap: Spacing[2] },
  ctaTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground, textAlign: 'center' },
});
