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
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import type { DashboardStackParamList } from '../../navigation/stacks/DashboardStack';

type RouteProps = RouteProp<DashboardStackParamList, 'TradespersonLeadDetail'>;

export default function LeadDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProps>();
  const { leadId } = route.params;

  const lead = {
    id: leadId,
    title: 'Bathroom full renovation',
    service: 'Bathroom Fitting',
    description: 'We need a full bathroom renovation including removal of old suite, new tiles (customer supplied), new toilet, basin and shower enclosure. Bathroom is approximately 3m × 2m on the first floor. There is currently no extractor fan and we may want one added.',
    location: 'London, E1 6HS',
    postcode: 'E1 6HS',
    postedDate: '12 Jan 2025',
    budget: '£2,000 – £5,000',
    timeline: 'Within a month',
    contactName: 'John S.',
  };

  const keyDetails = [
    { label: 'Service', value: lead.service },
    { label: 'Location', value: lead.location },
    { label: 'Budget', value: lead.budget },
    { label: 'Timeline', value: lead.timeline },
    { label: 'Posted', value: lead.postedDate },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Lead Details" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <Text style={styles.title}>{lead.title}</Text>
          <Text style={styles.service}>{lead.service}</Text>

          {/* Key details grid */}
          <Card style={styles.detailsCard}>
            {keyDetails.map((d, i) => (
              <View key={d.label} style={[styles.detailRow, i < keyDetails.length - 1 && styles.detailRowBorder]}>
                <Text style={styles.detailLabel}>{d.label}</Text>
                <Text style={styles.detailValue}>{d.value}</Text>
              </View>
            ))}
          </Card>

          {/* Description */}
          <Card style={styles.descCard}>
            <Text style={styles.descTitle}>Job Description</Text>
            <Text style={styles.descText}>{lead.description}</Text>
          </Card>

          {/* Homeowner info (limited) */}
          <Card style={styles.contactCard}>
            <Text style={styles.contactTitle}>Posted by</Text>
            <View style={styles.contactRow}>
              <View style={styles.contactAvatar}>
                <Text style={styles.contactAvatarText}>{lead.contactName[0]}</Text>
              </View>
              <View>
                <Text style={styles.contactName}>{lead.contactName}</Text>
                <Text style={styles.contactSub}>Contact details revealed after expressing interest</Text>
              </View>
            </View>
          </Card>

          {/* CTA */}
          <Button
            size="lg"
            fullWidth
            onPress={() =>
              Alert.alert(
                'Express Interest',
                'By expressing interest you agree to contact the homeowner professionally. Your details will be shared with them.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Express Interest', onPress: () => Alert.alert('Success', 'You have expressed interest. The homeowner will be notified.') },
                ]
              )
            }
          >
            Express interest
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onPress={() => Alert.alert('Saved', 'Lead saved for later.')}
          >
            Save for later
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  section: { padding: Spacing[4], gap: Spacing[3] },
  title: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  service: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.primary },
  detailsCard: { gap: 0, overflow: 'hidden' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing[2.5] },
  detailRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  detailLabel: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  detailValue: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground, textAlign: 'right', flex: 1, marginLeft: Spacing[2] },
  descCard: { gap: Spacing[1.5] },
  descTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground },
  descText: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 22 },
  contactCard: { gap: Spacing[2] },
  contactTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground },
  contactRow: { flexDirection: 'row', gap: Spacing[3], alignItems: 'center' },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactAvatarText: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  contactName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.foreground },
  contactSub: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, flex: 1 },
});
