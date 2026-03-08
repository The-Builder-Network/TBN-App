import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing } from '../../constants/fonts';
import AppHeader from '../shared/AppHeader';

export type Section = {
  heading?: string;
  body: string;
};

type Props = {
  title: string;
  sections: Section[];
};

export default function StaticScreen({ title, sections }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title={title} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {sections.map((s, i) => (
          <View key={i} style={styles.section}>
            {s.heading && <Text style={styles.heading}>{s.heading}</Text>}
            <Text style={styles.body}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing[4], paddingBottom: 40, gap: Spacing[4] },
  section: { gap: Spacing[1.5] },
  heading: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  body: { fontFamily: Fonts.regular, fontSize: FontSizes.base, color: Colors.mutedForeground, lineHeight: 24 },
});
