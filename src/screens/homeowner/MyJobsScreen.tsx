import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../../constants/fonts';
import AppHeader from '../../components/shared/AppHeader';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/ui/Button';

type JobStatus = 'active' | 'closed' | 'draft' | 'pending';

type Job = {
  id: string;
  title: string;
  service: string;
  location: string;
  postedDate: string;
  status: JobStatus;
  interestedCount: number;
  chatCount: number;
};

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Bathroom renovation', service: 'Bathroom Fitting', location: 'London, E1', postedDate: '12 Jan 2025', status: 'active', interestedCount: 7, chatCount: 3 },
  { id: '2', title: 'Leaking roof repair', service: 'Roofing', location: 'London, SE15', postedDate: '5 Jan 2025', status: 'closed', interestedCount: 4, chatCount: 1 },
  { id: '3', title: 'Kitchen electrical rewire', service: 'Electrician', location: 'London, N7', postedDate: '28 Dec 2024', status: 'active', interestedCount: 2, chatCount: 0 },
  { id: '4', title: 'Garden fence installation', service: 'Gardening', location: 'London, W4', postedDate: '1 Dec 2024', status: 'closed', interestedCount: 9, chatCount: 5 },
];

const FILTERS: { label: string; value: JobStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Closed', value: 'closed' },
];

export default function MyJobsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');

  const jobs = filter === 'all' ? MOCK_JOBS : MOCK_JOBS.filter((j) => j.status === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="My Jobs" showBack />

      {/* Filter pills */}
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            style={[styles.pill, filter === f.value && styles.pillActive]}
            onPress={() => setFilter(f.value)}
          >
            <Text style={[styles.pillText, filter === f.value && styles.pillTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <Button size="sm" onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob' })}>
          + Post job
        </Button>
      </View>

      {jobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No jobs yet</Text>
          <Text style={styles.emptyDesc}>Post your first job and start receiving quotes from local tradespeople.</Text>
          <Button onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob' })}>Post a job</Button>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('HomeownerJobDetail', { jobId: item.id })}
              activeOpacity={0.75}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.cardService}>{item.service}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>📍 {item.location}</Text>
                <Text style={styles.metaText}>📅 {item.postedDate}</Text>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.statChip}>
                  <Text style={styles.statChipText}>👁 {item.interestedCount} interested</Text>
                </View>
                <View style={styles.statChip}>
                  <Text style={styles.statChipText}>💬 {item.chatCount} chats</Text>
                </View>
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
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2.5],
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pill: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1.5],
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  pillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pillText: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  pillTextActive: { color: Colors.white },
  list: { padding: Spacing[4], gap: Spacing[3], paddingBottom: 40 },
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing[2.5],
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', gap: Spacing[2], alignItems: 'flex-start' },
  cardTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  cardService: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  cardMeta: { flexDirection: 'row', gap: Spacing[4] },
  metaText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  cardFooter: { flexDirection: 'row', gap: Spacing[2] },
  statChip: {
    backgroundColor: Colors.muted,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing[2.5],
    paddingVertical: Spacing[1],
  },
  statChipText: { fontFamily: Fonts.medium, fontSize: FontSizes.xs, color: Colors.foreground },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing[6], gap: Spacing[3] },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  emptyDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 22 },
});
