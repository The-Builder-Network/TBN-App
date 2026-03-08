import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../../constants/fonts';
import AppHeader from '../../components/shared/AppHeader';


type Lead = {
  id: string;
  title: string;
  service: string;
  location: string;
  postedDate: string;
  budget: string;
  description: string;
};

const MOCK_LEADS: Lead[] = [
  { id: '1', title: 'Bathroom full renovation', service: 'Bathroom Fitting', location: 'London, E1', postedDate: '12 Jan 2025', budget: '£2,000 – £5,000', description: 'Full bathroom renovation including new suite, tiles, and plumbing.' },
  { id: '2', title: 'Central heating installation', service: 'Boiler', location: 'Manchester, M14', postedDate: '10 Jan 2025', budget: 'Under £3,000', description: 'Install new central heating system in a 3-bed mid-terrace house.' },
  { id: '3', title: 'Kitchen extension electrics', service: 'Electrician', location: 'London, N7', postedDate: '8 Jan 2025', budget: '£500 – £1,000', description: 'Additional sockets, lighting and consumer unit upgrade for new kitchen extension.' },
  { id: '4', title: 'Roof repair after storm damage', service: 'Roofing', location: 'Birmingham, B15', postedDate: '6 Jan 2025', budget: 'Under £1,000', description: 'Several tiles displaced, possible felt damage. Need urgent inspection and repair.' },
];

export default function MyLeadsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="My Leads" showLogo />
      {MOCK_LEADS.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No leads yet</Text>
          <Text style={styles.emptyDesc}>New job leads matching your trade will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={MOCK_LEADS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.headerText}>{MOCK_LEADS.length} jobs matching your trade</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TradespersonLeadDetail', { leadId: item.id })}
              activeOpacity={0.75}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.cardService}>{item.service}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleSave(item.id)} hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}>
                  <Text style={styles.saveIcon}>{saved.includes(item.id) ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>📍 {item.location}</Text>
                <Text style={styles.metaText}>💰 {item.budget}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.dateText}>📅 {item.postedDate}</Text>
                <Text style={styles.viewText}>View details →</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.muted },
  list: { padding: Spacing[4], gap: Spacing[3], paddingBottom: 40 },
  headerText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginBottom: Spacing[1] },
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing[4],
    gap: Spacing[2.5],
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', gap: Spacing[2], alignItems: 'flex-start' },
  cardTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  cardService: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.primary, marginTop: 2 },
  saveIcon: { fontSize: 20 },
  cardDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
  cardMeta: { flexDirection: 'row', gap: Spacing[4], flexWrap: 'wrap' },
  metaText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  viewText: { fontFamily: Fonts.semiBold, fontSize: FontSizes.sm, color: Colors.primary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing[6], gap: Spacing[3] },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  emptyDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 22 },
});
