import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../../constants/fonts';
import AppHeader from '../../components/shared/AppHeader';

type Question = {
  id: string;
  question: string;
  answer: string | null;
  trade: string;
  askedDate: string;
};

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'How long does a bathroom renovation typically take?',
    answer: 'A standard bathroom renovation usually takes 5–10 working days, depending on the scope of work and any unforeseen issues.',
    trade: 'Bathroom Fitting',
    askedDate: '10 Jan 2025',
  },
  {
    id: '2',
    question: 'Do I need planning permission for an extension?',
    answer: 'Most single-storey rear extensions under 4m (detached) or 3m (other) fall under Permitted Development. We recommend checking with your local council.',
    trade: 'Extensions',
    askedDate: '5 Jan 2025',
  },
  {
    id: '3',
    question: 'How do I know if my boiler needs replacing?',
    answer: null,
    trade: 'Boiler',
    askedDate: '2 Jan 2025',
  },
];

export default function MyQuestionsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="My Questions" showBack />
      {MOCK_QUESTIONS.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>No questions yet</Text>
          <Text style={styles.emptyDesc}>Ask a question about a trade or service and our experts will answer.</Text>
        </View>
      ) : (
        <FlatList
          data={MOCK_QUESTIONS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.tradeRow}>
                <View style={styles.tradeBadge}>
                  <Text style={styles.tradeBadgeText}>{item.trade}</Text>
                </View>
                <Text style={styles.date}>{item.askedDate}</Text>
              </View>
              <Text style={styles.question}>{item.question}</Text>
              {item.answer ? (
                <View style={styles.answerBox}>
                  <Text style={styles.answerLabel}>Answer</Text>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              ) : (
                <View style={styles.pendingBox}>
                  <Text style={styles.pendingText}>⏳ Awaiting answer</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.muted },
  list: { padding: Spacing[4], gap: Spacing[3], paddingBottom: 40 },
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
  tradeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tradeBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: Spacing[2.5],
    paddingVertical: Spacing[0.5],
    borderRadius: Radius.full,
  },
  tradeBadgeText: { fontFamily: Fonts.semiBold, fontSize: FontSizes.xs, color: '#1E40AF' },
  date: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground },
  question: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground, lineHeight: 22 },
  answerBox: {
    backgroundColor: Colors.muted,
    borderRadius: Radius.md,
    padding: Spacing[3],
    gap: Spacing[1],
  },
  answerLabel: { fontFamily: Fonts.semiBold, fontSize: FontSizes.xs, color: Colors.mutedForeground, textTransform: 'uppercase' },
  answerText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.foreground, lineHeight: 20 },
  pendingBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing[2.5],
    alignItems: 'center',
  },
  pendingText: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing[6], gap: Spacing[3] },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.xl, color: Colors.foreground },
  emptyDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 22 },
});
