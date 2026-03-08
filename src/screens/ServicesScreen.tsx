import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import { services } from '../constants/services';
import AppHeader from '../components/shared/AppHeader';

const { width: W } = Dimensions.get('window');

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Services" showLogo={false} />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          placeholderTextColor={Colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.listHeading}>
          {filtered.length} {search ? 'results' : 'services'}
        </Text>
        <View style={styles.grid}>
          {filtered.map((svc) => (
            <TouchableOpacity
              key={svc.slug}
              style={styles.card}
              activeOpacity={0.75}
              onPress={() =>
                navigation.navigate('ServiceDetail', { slug: svc.slug })
              }
            >
              <Image source={{ uri: svc.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{svc.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{svc.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_W = (W - Spacing[4] * 2 - Spacing[3]) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing[4],
    marginVertical: Spacing[3],
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    paddingRight: Spacing[8],
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  clearBtn: { position: 'absolute', right: Spacing[3] },
  clearText: { fontSize: FontSizes.md, color: Colors.mutedForeground },
  list: { paddingHorizontal: Spacing[4], paddingBottom: Spacing[8] },
  listHeading: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginBottom: Spacing[3] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3] },
  card: {
    width: CARD_W,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImage: { width: CARD_W, height: 100 },
  cardBody: { padding: Spacing[3], gap: Spacing[1] },
  cardName: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  cardDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, lineHeight: 16 },
});
