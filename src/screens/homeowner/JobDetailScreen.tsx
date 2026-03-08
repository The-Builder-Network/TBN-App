import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing } from '../../constants/fonts';
import AppHeader from '../../components/shared/AppHeader';
import StatusBadge from '../../components/shared/StatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Separator from '../../components/ui/Separator';
import type { DashboardStackParamList } from '../../navigation/stacks/DashboardStack';

type RouteProps = RouteProp<DashboardStackParamList, 'HomeownerJobDetail'>;

const MOCK_RESPONSES = [
  { id: '1', name: 'Mike Johnson', trade: 'Plumber', rating: 4.9, reviews: 124, message: 'Happy to help with this. I have done many similar projects in your area. Can visit this week for a free quote.' },
  { id: '2', name: 'Sarah Clarke', trade: 'Bathroom Fitter', rating: 4.8, reviews: 89, message: 'I specialise in bathroom renovations. My schedule has openings in the next two weeks. Let me know if you want to chat.' },
  { id: '3', name: 'David Thompson', trade: 'Tiler', rating: 4.6, reviews: 52, message: 'I can take this on. I work with a partner so we can complete most bathrooms in 5-7 days.' },
];

export default function JobDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProps>();
  const { jobId } = route.params;

  // Mock data lookup
  const job = {
    id: jobId,
    title: 'Bathroom renovation',
    service: 'Bathroom Fitting',
    description: 'We need a full bathroom renovation including: removal of old suite, new tiles, new toilet, basin and shower. The bathroom is approximately 3m x 2m.',
    location: 'London, E1 6HS',
    postedDate: '12 Jan 2025',
    status: 'active' as const,
    budget: 'Under £5,000',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Job Details" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Job summary */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{job.title}</Text>
            <StatusBadge status={job.status} />
          </View>
          <Text style={styles.service}>{job.service}</Text>

          <View style={styles.metaGrid}>
            {[
              { icon: '📍', label: 'Location', value: job.location },
              { icon: '📅', label: 'Posted', value: job.postedDate },
              { icon: '💰', label: 'Budget', value: job.budget },
            ].map((m) => (
              <View key={m.label} style={styles.metaItem}>
                <Text style={styles.metaIcon}>{m.icon}</Text>
                <View>
                  <Text style={styles.metaLabel}>{m.label}</Text>
                  <Text style={styles.metaValue}>{m.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <Card style={styles.descCard}>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descText}>{job.description}</Text>
          </Card>
        </View>

        <Separator />

        {/* Responses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responses ({MOCK_RESPONSES.length})</Text>
          {MOCK_RESPONSES.map((r) => (
            <Card key={r.id} style={styles.responseCard}>
              <View style={styles.responseHeader}>
                <View style={styles.responseAvatar}>
                  <Text style={styles.responseAvatarText}>{r.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.responseName}>{r.name}</Text>
                  <View style={styles.responseMeta}>
                    <Text style={styles.responseTrade}>{r.trade}</Text>
                    <Text style={styles.responseDot}>•</Text>
                    <Text style={styles.responseRating}>⭐ {r.rating} ({r.reviews})</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.responseMsg}>{r.message}</Text>
              <Button
                variant="outline"
                size="sm"
                onPress={() => Alert.alert('Message', `Opening chat with ${r.name}...`)}
              >
                Send message
              </Button>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <Button
            variant="destructive"
            size="md"
            fullWidth
            onPress={() =>
              Alert.alert('Close Job', 'Are you sure you want to close this job?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Close Job', style: 'destructive', onPress: () => {} },
              ])
            }
          >
            Close job
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  section: { padding: Spacing[4], gap: Spacing[3] },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground, flex: 1, marginRight: Spacing[2] },
  service: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  metaGrid: { gap: Spacing[2.5] },
  metaItem: { flexDirection: 'row', gap: Spacing[2.5], alignItems: 'center' },
  metaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  metaLabel: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  metaValue: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  descCard: { gap: Spacing[1.5] },
  descTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground },
  descText: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  responseCard: { gap: Spacing[2.5] },
  responseHeader: { flexDirection: 'row', gap: Spacing[2.5], alignItems: 'center' },
  responseAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseAvatarText: { fontFamily: Fonts.bold, fontSize: FontSizes.base, color: Colors.white },
  responseName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  responseMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing[1] },
  responseTrade: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  responseDot: { color: Colors.mutedForeground },
  responseRating: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  responseMsg: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
});
