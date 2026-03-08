import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { trades } from '../constants/trades';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import type { ServicesStackParamList } from '../navigation/stacks/ServicesStack';

type RouteProps = RouteProp<ServicesStackParamList, 'TradeDetail'>;
const { width: W } = Dimensions.get('window');

const MOCK_PROFESSIONALS = [
  { name: 'James Mitchell', rating: 4.9, reviews: 124, location: 'London', verified: true },
  { name: 'Sarah Clarke', rating: 4.8, reviews: 89, location: 'Manchester', verified: true },
  { name: 'David Thompson', rating: 4.7, reviews: 67, location: 'Birmingham', verified: false },
];

export default function TradeDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<any>();
  const { slug } = route.params;

  const trade = trades.find((t) => t.slug === slug);

  if (!trade) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppHeader title="Trade" showBack />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Trade not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title={trade.name} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={{ uri: trade.imageUrl }} style={styles.hero} />
        <View style={styles.body}>
          <Text style={styles.title}>{trade.title || trade.name}</Text>
          <Text style={styles.desc}>{trade.description}</Text>

          <Button
            size="lg"
            fullWidth
            onPress={() =>
              navigation.navigate('PostJobTab', {
                screen: 'PostJob',
                params: { serviceSlug: trade.serviceSlug },
              })
            }
          >
            Get free quotes
          </Button>

          {/* Top professionals */}
          <Text style={styles.sectionTitle}>Top professionals near you</Text>
          {MOCK_PROFESSIONALS.map((pro, i) => (
            <Card key={i} style={styles.proCard}>
              <View style={styles.proRow}>
                <View style={styles.proAvatar}>
                  <Text style={styles.proAvatarText}>{pro.name[0]}</Text>
                </View>
                <View style={styles.proInfo}>
                  <View style={styles.proNameRow}>
                    <Text style={styles.proName}>{pro.name}</Text>
                    {pro.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓ Verified</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.proMeta}>
                    <Text style={styles.proStar}>⭐ {pro.rating}</Text>
                    <Text style={styles.proReviews}>({pro.reviews} reviews)</Text>
                    <Text style={styles.proLocation}>• {pro.location}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob', params: { serviceSlug: trade.serviceSlug } })}
          >
            See all professionals →
          </Button>

          {/* FAQ-like section */}
          <Card style={styles.faqCard}>
            <Text style={styles.faqTitle}>About {trade.name}</Text>
            <Text style={styles.faqText}>
              Finding a reliable {trade.name.toLowerCase()} is easy with The Builder Network. Post your job for free and get matched with verified professionals in your area. Read real reviews and compare before you choose.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { width: W, height: 220 },
  body: { padding: Spacing[4], gap: Spacing[4] },
  title: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground, lineHeight: 32 },
  desc: { fontFamily: Fonts.regular, fontSize: FontSizes.md, color: Colors.mutedForeground, lineHeight: 24 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground, marginTop: Spacing[2] },
  proCard: { padding: Spacing[3] },
  proRow: { flexDirection: 'row', gap: Spacing[3], alignItems: 'center' },
  proAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proAvatarText: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.white },
  proInfo: { flex: 1 },
  proNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], flexWrap: 'wrap' },
  proName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  verifiedBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: Spacing[1.5],
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  verifiedText: { fontFamily: Fonts.semiBold, fontSize: 10, color: '#166534' },
  proMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing[1.5], marginTop: 2, flexWrap: 'wrap' },
  proStar: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  proReviews: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  proLocation: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontFamily: Fonts.regular, fontSize: FontSizes.md, color: Colors.mutedForeground },
  faqCard: { gap: Spacing[2] },
  faqTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.md, color: Colors.foreground },
  faqText: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
});
