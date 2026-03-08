import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../constants/fonts';
import AppHeader from '../components/shared/AppHeader';

const CITIES = [
  'London', 'Birmingham', 'Manchester', 'Leeds', 'Sheffield', 'Liverpool',
  'Bristol', 'Newcastle', 'Nottingham', 'Leicester', 'Coventry', 'Bradford',
  'Cardiff', 'Belfast', 'Edinburgh', 'Glasgow', 'Southampton', 'Portsmouth',
  'Derby', 'Reading', 'Luton', 'Wolverhampton', 'Northampton', 'Oxford',
  'Cambridge', 'Plymouth', 'Stoke-on-Trent', 'Sunderland', 'Brighton', 'Milton Keynes',
  'Exeter', 'Hull', 'Swansea', 'Peterborough', 'Bolton', 'Ipswich',
];

export default function CitiesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? CITIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : CITIES;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="Cities We Serve" showBack />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search cities..."
          placeholderTextColor={Colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cityCard}
            onPress={() => navigation.navigate('PostJobTab', { screen: 'PostJob' })}
            activeOpacity={0.7}
          >
            <Text style={styles.cityIcon}>📍</Text>
            <Text style={styles.cityName}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.muted },
  searchWrap: { backgroundColor: Colors.background, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderBottomWidth: 1, borderBottomColor: Colors.border },
  search: {
    backgroundColor: Colors.muted,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.foreground,
  },
  list: { padding: Spacing[3], paddingBottom: 40 },
  row: { gap: Spacing[3], marginBottom: Spacing[3] },
  cityCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing[3],
    alignItems: 'center',
    gap: Spacing[1.5],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cityIcon: { fontSize: 24 },
  cityName: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground, textAlign: 'center' },
});
