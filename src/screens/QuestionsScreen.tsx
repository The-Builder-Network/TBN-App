import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import AppHeader from '../components/shared/AppHeader';
import Button from '../components/ui/Button';

const POPULAR_QUESTIONS = [
  {
    q: 'How do I know a tradesperson is qualified?',
    a: 'All tradespeople on The Builder Network are vetted. We check ID, insurance, and relevant qualifications. Look for the verified badge on their profile.',
  },
  {
    q: 'What happens if a tradesperson cancels?',
    a: 'If a tradesperson cancels, we encourage you to contact our support team. We can help you re-post your job and find a replacement quickly.',
  },
  {
    q: 'Can I get a quote before booking?',
    a: 'Absolutely. When you post a job, interested tradespeople will send you quotes. You can compare them and choose before committing to anything.',
  },
  {
    q: 'Is there a dispute resolution process?',
    a: 'Yes. If you have a dispute with a tradesperson, our team can mediate. We take all complaints seriously and investigate each case individually.',
  },
  {
    q: 'How do reviews work?',
    a: 'After a job is marked complete, both parties can leave reviews. All reviews are verified to come from genuine jobs completed through the platform.',
  },
  {
    q: 'What trades does the platform cover?',
    a: 'We cover a wide range of trades including plumbing, electrical, roofing, building, carpentry, painting, tiling, gardening, HVAC and many more.',
  },
];

export default function QuestionsScreen() {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [question, setQuestion] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Questions" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Common questions</Text>
        <Text style={styles.pageDesc}>Find answers to the most frequently asked questions below.</Text>

        {POPULAR_QUESTIONS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={() => setExpanded(expanded === i ? null : i)}
            activeOpacity={0.75}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemQ}>{item.q}</Text>
              <Text style={styles.chevron}>{expanded === i ? '▲' : '▼'}</Text>
            </View>
            {expanded === i && <Text style={styles.itemA}>{item.a}</Text>}
          </TouchableOpacity>
        ))}

        <View style={styles.askSection}>
          <Text style={styles.askTitle}>Still have a question?</Text>
          <Text style={styles.askDesc}>Submit your question and our team will get back to you.</Text>
          <TextInput
            style={styles.askInput}
            placeholder="Type your question here..."
            placeholderTextColor={Colors.mutedForeground}
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={3}
          />
          <Button
            size="md"
            fullWidth
            onPress={() => {
              if (!question.trim()) return;
              Alert.alert('Submitted', 'Thank you! We will get back to you soon.');
              setQuestion('');
            }}
          >
            Submit question
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing[4], gap: Spacing[2.5], paddingBottom: 40 },
  pageTitle: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.foreground },
  pageDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground },
  item: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing[3],
    gap: Spacing[2],
  },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing[2] },
  itemQ: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground, flex: 1, lineHeight: 22 },
  chevron: { fontSize: 10, color: Colors.mutedForeground, marginTop: 4 },
  itemA: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, lineHeight: 20 },
  askSection: {
    backgroundColor: Colors.muted,
    borderRadius: Radius.lg,
    padding: Spacing[4],
    gap: Spacing[2.5],
    marginTop: Spacing[2],
  },
  askTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  askDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  askInput: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing[3],
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.foreground,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
