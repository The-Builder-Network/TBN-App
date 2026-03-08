import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { trades } from '../constants/trades';
import AppHeader from '../components/shared/AppHeader';

export default function TradesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filtered = trades.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Browse Trades" showBack />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search trades..."
          placeholderTextColor={Colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.count}>{filtered.length} trades found</Text>
        {filtered.map((trade) => (
          <TouchableOpacity
            key={trade.slug}
            style={styles.tradeCard}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('TradeDetail', {
                slug: trade.slug,
                serviceSlug: trade.serviceSlug,
              })
            }
          >
            <Image source={{ uri: trade.imageUrl }} style={styles.tradeImage} />
            <View style={styles.tradeInfo}>
              <Text style={styles.tradeName}>{trade.name}</Text>
              <Text style={styles.tradeDesc} numberOfLines={2}>{trade.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchBar: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[3] },
  searchInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  list: { paddingHorizontal: Spacing[4], paddingBottom: Spacing[8] },
  count: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginBottom: Spacing[3] },
  tradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing[3],
    backgroundColor: Colors.card,
    height: 80,
  },
  tradeImage: { width: 80, height: 80 },
  tradeInfo: { flex: 1, paddingHorizontal: Spacing[3], gap: Spacing[1] },
  tradeName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  tradeDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, lineHeight: 16 },
  arrow: { fontSize: 24, color: Colors.mutedForeground, paddingRight: Spacing[3] },
});
