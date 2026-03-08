import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { services } from '../constants/services';
import { trades } from '../constants/trades';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import type { ServicesStackParamList } from '../navigation/stacks/ServicesStack';

type RouteProps = RouteProp<ServicesStackParamList, 'ServiceDetail'>;
const { width: W } = Dimensions.get('window');

export default function ServiceDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<any>();
  const { slug } = route.params;

  const service = services.find((s) => s.slug === slug);
  const relatedTrades = trades.filter((t) => t.serviceSlug === slug);

  if (!service) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppHeader title="Service" showBack />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Service not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title={service.name} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <Image source={{ uri: service.imageUrl }} style={styles.hero} />
        <View style={styles.body}>
          <Text style={styles.title}>{service.name}</Text>
          <Text style={styles.desc}>{service.description}</Text>

          <Button
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob', params: { serviceSlug: service.slug } })}
            style={styles.ctaBtn}
          >
            Post a job
          </Button>

          {relatedTrades.length > 0 && (
            <View style={styles.tradesSection}>
              <Text style={styles.sectionTitle}>Related trades</Text>
              {relatedTrades.map((trade) => (
                <TouchableOpacity
                  key={trade.slug}
                  style={styles.tradeRow}
                  onPress={() =>
                    navigation.navigate('TradeDetail', {
                      slug: trade.slug,
                      serviceSlug: trade.serviceSlug,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: trade.imageUrl }} style={styles.tradeThumb} />
                  <View style={styles.tradeInfo}>
                    <Text style={styles.tradeName}>{trade.name}</Text>
                    <Text style={styles.tradeDesc} numberOfLines={1}>{trade.description}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Card style={styles.whyCard}>
            <Text style={styles.whyTitle}>Why use The Builder Network?</Text>
            {[
              '✓ Free to post your job',
              '✓ Verified tradespeople',
              '✓ Genuine customer reviews',
              '✓ No obligation to hire',
            ].map((item) => (
              <Text key={item} style={styles.whyItem}>{item}</Text>
            ))}
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
  title: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground },
  desc: { fontFamily: Fonts.regular, fontSize: FontSizes.md, color: Colors.mutedForeground, lineHeight: 24 },
  ctaBtn: {},
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontFamily: Fonts.regular, fontSize: FontSizes.md, color: Colors.mutedForeground },
  tradesSection: { gap: Spacing[3] },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground, marginBottom: Spacing[2] },
  tradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    height: 72,
  },
  tradeThumb: { width: 72, height: 72 },
  tradeInfo: { flex: 1, paddingHorizontal: Spacing[3] },
  tradeName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  tradeDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, marginTop: 2 },
  arrow: { fontSize: 22, color: Colors.mutedForeground, paddingRight: Spacing[3] },
  whyCard: { gap: Spacing[2] },
  whyTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.md, color: Colors.foreground, marginBottom: Spacing[2] },
  whyItem: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.foreground },
});
