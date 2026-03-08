import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { trades } from '../constants/trades';
import { services } from '../constants/services';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TYPING_WORDS = ['tradesperson.', 'builder.', 'plumber.', 'roofer.', 'carpenter.', 'painter.'];
const HOW_IT_WORKS_STEPS = [
  { icon: '📋', title: 'Post your job', description: 'Tell us what you need done in a few minutes.', step: 1 },
  { icon: '👥', title: 'Get matched', description: "We'll match you with up to 3 interested tradespeople.", step: 2 },
  { icon: '💬', title: 'Compare quotes', description: 'Chat with tradespeople, compare quotes and profiles.', step: 3 },
  { icon: '✅', title: 'Hire with confidence', description: 'Choose a tradesperson and get your job done.', step: 4 },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const featuredTrades = trades.slice(0, 8);
  const featuredServices = services.slice(0, 6);

  // Typewriter effect
  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Hero Section ── */}
        <LinearGradient
          colors={[Colors.primary, '#1A56DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 20 }]}
        >
          {/* Header Row */}
          <View style={styles.heroHeader}>
            <Text style={styles.logoText}>The Builder Network</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileTab')}
              style={styles.headerBtn}
            >
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Typing Headline */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>The reliable way{'\n'}to hire a</Text>
            <Text style={styles.heroTyping}>
              {displayText}
              <Text style={styles.cursor}>|</Text>
            </Text>

            {/* Trust */}
            <View style={styles.trustRow}>
              <Text style={styles.trustText}>Excellent</Text>
              <View style={styles.stars}>
                {[0,1,2,3,4].map(i => (
                  <View key={i} style={styles.star}>
                    <Text style={styles.starText}>★</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.trustMuted}>Trustpilot</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Post Job CTA ── */}
        <View style={styles.postJobCTA}>
          <Text style={styles.postJobLabel}>What do you need done?</Text>
          <TouchableOpacity
            style={styles.postJobInput}
            onPress={() => navigation.navigate('PostJobTab')}
            activeOpacity={0.8}
          >
            <Text style={styles.postJobPlaceholder}>Select a service...</Text>
            <View style={styles.postJobArrow}>
              <Text style={styles.postJobArrowText}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsSection}>
          <StatItem value="268,528" label="tradespeople" />
          <View style={styles.statsDivider} />
          <StatItem value="40+" label="trade categories" />
          <View style={styles.statsDivider} />
          <StatItem value="2.7M" label="reviews" />
        </View>

        {/* ── How It Works ── */}
        <View style={styles.section}>
          <SectionHeader
            title="How to find the right tradesperson"
            center
            titleSize="2xl"
            style={styles.sectionHeader}
          />
          <View style={styles.stepsGrid}>
            {HOW_IT_WORKS_STEPS.map((step) => (
              <View key={step.step} style={styles.stepCard}>
                <View style={styles.stepIconCircle}>
                  <Text style={styles.stepIcon}>{step.icon}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            ))}
          </View>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('ProfileTab', { screen: 'HowItWorks' })}
            style={styles.seeMoreBtn}
          >
            See how it works
          </Button>
        </View>

        {/* ── Why Section ── */}
        <View style={[styles.section, styles.whySection]}>
          <SectionHeader
            title="Why The Builder Network is the reliable way"
            center
            titleSize="2xl"
            style={styles.sectionHeader}
          />
          <View style={styles.whyList}>
            <WhyItem
              title="Get matched with available tradespeople"
              text="Post your job for free and receive responses from tradespeople eager to take it on."
            />
            <WhyItem
              title="Choose who you want to connect with"
              text="Read reviews, view profiles, and browse pictures from previous jobs before deciding."
            />
            <WhyItem
              title="Hire with confidence"
              text="All tradespeople undergo checks at registration — ID, certifications, and skill assessments."
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileTab', { screen: 'QualityChecks' })}>
            <Text style={styles.linkText}>→ More info about our checks</Text>
          </TouchableOpacity>
        </View>

        {/* ── Browse by Trade ── */}
        <View style={styles.section}>
          <SectionHeader title="Browse by trade" titleSize="2xl" style={styles.sectionHeader} />
          {featuredTrades.map((trade) => (
            <TouchableOpacity
              key={trade.slug}
              style={styles.tradeCard}
              activeOpacity={0.75}
              onPress={() =>
                navigation.navigate('ServicesTab', {
                  screen: 'TradeDetail',
                  params: { slug: trade.slug, serviceSlug: trade.serviceSlug },
                })
              }
            >
              <Image source={{ uri: trade.imageUrl }} style={styles.tradeImage} />
              <View style={styles.tradeInfo}>
                <Text style={styles.tradeName}>{trade.name}</Text>
                <Text style={styles.tradeDesc} numberOfLines={2}>{trade.description}</Text>
              </View>
              <Text style={styles.tradeArrow}>›</Text>
            </TouchableOpacity>
          ))}
          <Button
            variant="outline"
            onPress={() => navigation.navigate('ServicesTab', { screen: 'TradesAll' })}
            style={styles.seeMoreBtn}
            fullWidth
          >
            View all trades
          </Button>
        </View>

        {/* ── Services ── */}
        <View style={[styles.section, { backgroundColor: Colors.muted }]}>
          <SectionHeader title="Browse by service" titleSize="2xl" style={styles.sectionHeader} />
          <View style={styles.servicesGrid}>
            {featuredServices.map((svc) => (
              <TouchableOpacity
                key={svc.slug}
                style={styles.serviceCard}
                activeOpacity={0.75}
                onPress={() =>
                  navigation.navigate('ServicesTab', {
                    screen: 'ServiceDetail',
                    params: { slug: svc.slug },
                  })
                }
              >
                <Image source={{ uri: svc.imageUrl }} style={styles.serviceImage} />
                <Text style={styles.serviceName} numberOfLines={2}>{svc.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('ServicesTab')}
            style={styles.seeMoreBtn}
            fullWidth
          >
            View all services
          </Button>
        </View>

        {/* ── Are You a Tradesperson? ── */}
        <View style={styles.tradespersonBanner}>
          <LinearGradient
            colors={[Colors.primary, '#1A56DB']}
            style={styles.tradespersonGradient}
          >
            <Text style={styles.tradespersonTitle}>Are you a tradesperson?</Text>
            <Text style={styles.tradespersonText}>
              Join thousands of tradespeople getting new leads every day.
            </Text>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('HomeTab', { screen: 'TradesNetwork' })}
              style={styles.tradespersonBtn}
              textStyle={{ color: Colors.white }}
            >
              Join for free →
            </Button>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function WhyItem({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.whyItem}>
      <View style={styles.whyDot} />
      <View style={styles.whyContent}>
        <Text style={styles.whyTitle}>{title}</Text>
        <Text style={styles.whyText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Hero
  hero: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[8],
  },
  logoText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },
  headerBtn: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1.5],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: Radius.md,
  },
  loginText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.white,
  },
  heroContent: {
    gap: Spacing[4],
  },
  heroTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['3xl'],
    color: Colors.white,
    lineHeight: 42,
  },
  heroTyping: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes['2xl'],
    color: Colors.white,
    minHeight: 36,
  },
  cursor: {
    color: 'rgba(255,255,255,0.7)',
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginTop: Spacing[2],
  },
  trustText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.9)',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    backgroundColor: '#22C55E',
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 10,
    color: Colors.white,
  },
  trustMuted: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.6)',
  },
  // Post job CTA
  postJobCTA: {
    backgroundColor: Colors.background,
    padding: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing[2],
  },
  postJobLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.foreground,
  },
  postJobInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingLeft: Spacing[4],
    paddingRight: Spacing[2],
    height: 52,
    backgroundColor: Colors.background,
  },
  postJobPlaceholder: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mutedForeground,
  },
  postJobArrow: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postJobArrowText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  // Stats
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing[5],
    paddingHorizontal: Spacing[4],
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    alignItems: 'flex-start',
    paddingLeft: Spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: Colors.highlight,
  },
  statsDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    color: Colors.foreground,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.mutedForeground,
  },
  // Section
  section: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[8],
    backgroundColor: Colors.background,
  },
  sectionHeader: {
    marginBottom: Spacing[6],
  },
  whySection: {
    backgroundColor: Colors.muted,
  },
  // How it works
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[4],
    justifyContent: 'space-between',
    marginBottom: Spacing[4],
  },
  stepCard: {
    width: (SCREEN_WIDTH - Spacing[4] * 2 - Spacing[4]) / 2,
    alignItems: 'center',
    padding: Spacing[3],
  },
  stepIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[3],
  },
  stepIcon: {
    fontSize: 26,
  },
  stepTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing[1],
  },
  stepDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  seeMoreBtn: {
    marginTop: Spacing[4],
  },
  // Why
  whyList: {
    gap: Spacing[5],
    marginBottom: Spacing[4],
  },
  whyItem: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  whyDot: {
    width: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    minHeight: '100%',
    flexShrink: 0,
  },
  whyContent: {
    flex: 1,
    gap: Spacing[1],
  },
  whyTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.foreground,
  },
  whyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mutedForeground,
    lineHeight: 22,
  },
  linkText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.highlight,
  },
  // Trade cards
  tradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing[3],
    backgroundColor: Colors.card,
    height: 80,
  },
  tradeImage: {
    width: 80,
    height: 80,
  },
  tradeInfo: {
    flex: 1,
    paddingHorizontal: Spacing[3],
    gap: Spacing[1],
  },
  tradeName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.foreground,
  },
  tradeDesc: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    color: Colors.mutedForeground,
    lineHeight: 16,
  },
  tradeArrow: {
    fontSize: 24,
    color: Colors.mutedForeground,
    paddingRight: Spacing[3],
  },
  // Services grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
    marginBottom: Spacing[4],
  },
  serviceCard: {
    width: (SCREEN_WIDTH - Spacing[4] * 2 - Spacing[3]) / 2,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceImage: {
    width: '100%',
    height: 90,
  },
  serviceName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    padding: Spacing[2],
    lineHeight: 18,
  },
  // Tradesperson banner
  tradespersonBanner: {
    margin: Spacing[4],
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
  },
  tradespersonGradient: {
    padding: Spacing[6],
    gap: Spacing[3],
  },
  tradespersonTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    color: Colors.white,
  },
  tradespersonText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
  },
  tradespersonBtn: {
    borderColor: 'rgba(255,255,255,0.5)',
    alignSelf: 'flex-start',
    marginTop: Spacing[2],
  },
});
