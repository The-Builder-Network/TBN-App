import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import AppHeader from '../components/shared/AppHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Separator from '../components/ui/Separator';
import type { ServicesStackParamList } from '../navigation/stacks/ServicesStack';

type RouteProps = RouteProp<ServicesStackParamList, 'TradespersonPublicProfile'>;

const { width: W } = Dimensions.get('window');

const MOCK_REVIEWS = [
  { author: 'Mark H.', rating: 5, date: 'March 2025', text: 'Excellent work, very professional and on time.' },
  { author: 'Lisa T.', rating: 5, date: 'February 2025', text: 'Would highly recommend. Quality finish and fair pricing.' },
  { author: 'Paul S.', rating: 4, date: 'January 2025', text: 'Good work overall, minor delay but kept us updated.' },
];

const MOCK_PORTFOLIO = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
];

export default function TradespersonPublicProfileScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProps>();
  const { username } = route.params;

  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'portfolio'>('about');

  // Mock profile data based on username
  const profile = {
    name: username === 'mike-plumbing' ? 'Mike Johnson' : 'Sarah Clarke',
    businessName: username === 'mike-plumbing' ? "Mike's Plumbing Services" : 'Clarke Electrical',
    trade: username === 'mike-plumbing' ? 'Plumber' : 'Electrician',
    location: 'London, UK',
    rating: 4.9,
    reviewCount: 124,
    jobsCompleted: 280,
    yearsExperience: 12,
    verified: true,
    avatar: null,
    about:
      'I am a fully qualified and insured professional with over 12 years of experience. I pride myself on delivering high-quality work on time and on budget. All work is guaranteed and I am happy to provide references.',
    badges: ['ID Verified', 'Insurance Checked', 'Background Checked'],
    trades: ['Plumbing', 'Bathroom Fitting', 'Central Heating'],
  };

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'reviews', label: `Reviews (${profile.reviewCount})` },
    { id: 'portfolio', label: 'Portfolio' },
  ] as const;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Professional Profile" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero / cover */}
        <View style={styles.coverBg}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.name[0]}</Text>
            </View>
            {profile.verified && (
              <View style={styles.verifiedDot}>
                <Text style={styles.verifiedDotText}>✓</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.businessName}>{profile.businessName}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⭐ {profile.rating}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{profile.reviewCount} reviews</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>📍 {profile.location}</Text>
          </View>

          {/* Verification badges */}
          <View style={styles.badgeRow}>
            {profile.badges.map((b) => (
              <Badge key={b} variant="success" label={b} />
            ))}
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: 'Jobs done', value: profile.jobsCompleted },
              { label: 'Years exp', value: profile.yearsExperience },
              { label: 'Rating', value: profile.rating },
            ].map((s, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <Button size="lg" fullWidth onPress={() => Alert.alert('Contact', 'Post a job to contact this professional.')}>
            Post a job to get in touch
          </Button>

          <Separator />

          {/* Tabs */}
          <View style={styles.tabs}>
            {tabs.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.tab, activeTab === t.id && styles.tabActive]}
                onPress={() => setActiveTab(t.id)}
              >
                <Text style={[styles.tabText, activeTab === t.id && styles.tabTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content */}
          {activeTab === 'about' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>{profile.about}</Text>
              <Text style={styles.sectionTitle}>Trades</Text>
              <View style={styles.badgeRow}>
                {profile.trades.map((tr) => (
                  <Badge key={tr} variant="secondary" label={tr} />
                ))}
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.section}>
              {MOCK_REVIEWS.map((r, i) => (
                <Card key={i} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{r.author}</Text>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                  <Text style={styles.reviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</Text>
                  <Text style={styles.reviewText}>{r.text}</Text>
                </Card>
              ))}
            </View>
          )}

          {activeTab === 'portfolio' && (
            <View style={styles.portfolioGrid}>
              {MOCK_PORTFOLIO.map((uri, i) => (
                <Image key={i} source={{ uri }} style={styles.portfolioImg} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const IMG_SIZE = (W - Spacing[4] * 2 - Spacing[2]) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  coverBg: { height: 100, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'flex-end' },
  avatarWrap: { position: 'absolute', bottom: -40, alignSelf: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.foreground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  avatarText: { fontFamily: Fonts.bold, fontSize: 32, color: Colors.white },
  verifiedDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  verifiedDotText: { fontSize: 10, color: Colors.white, fontFamily: Fonts.bold },
  body: { padding: Spacing[4], paddingTop: Spacing[12], gap: Spacing[4] },
  name: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground, textAlign: 'center' },
  businessName: { fontFamily: Fonts.medium, fontSize: FontSizes.md, color: Colors.mutedForeground, textAlign: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[1.5], flexWrap: 'wrap' },
  metaText: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  metaDot: { color: Colors.mutedForeground },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.muted,
    borderRadius: Radius.lg,
    padding: Spacing[2],
  },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  statLabel: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, paddingVertical: Spacing[2.5], alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  tabTextActive: { color: Colors.primary, fontFamily: Fonts.semiBold },
  section: { gap: Spacing[3] },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.md, color: Colors.foreground },
  aboutText: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  reviewCard: { gap: Spacing[1.5] },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewAuthor: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground },
  reviewDate: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  reviewStars: { color: '#F59E0B', fontSize: FontSizes.sm },
  reviewText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  portfolioImg: { width: IMG_SIZE, height: IMG_SIZE, borderRadius: Radius.md, backgroundColor: Colors.muted },
});
