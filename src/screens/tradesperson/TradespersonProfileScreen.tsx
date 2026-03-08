import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../../constants/fonts';
import { useAuth } from '../../hooks/useAuth';
import AppHeader from '../../components/shared/AppHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Separator from '../../components/ui/Separator';

type Tab = 'details' | 'qualifications' | 'portfolio' | 'security';

const TABS: { id: Tab; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'qualifications', label: 'Quals' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'security', label: 'Security' },
];

export default function TradespersonProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('details');

  // Details state
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    Alert.alert('Saved', 'Your profile has been updated.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader title="My Profile" showBack />

      {/* Profile summary */}
      <View style={styles.summary}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(firstName || user?.email || 'T')[0].toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.summaryName}>{firstName} {lastName}</Text>
          <Text style={styles.summaryBiz}>{businessName || 'Your Business Name'}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, tab === t.id && styles.tabActive]}
            onPress={() => setTab(t.id)}
          >
            <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        {tab === 'details' && (
          <>
            <View style={styles.nameRow}>
              <View style={{ flex: 1 }}>
                <Input label="First name" value={firstName} onChangeText={setFirstName} placeholder="John" required />
              </View>
              <View style={{ flex: 1 }}>
                <Input label="Last name" value={lastName} onChangeText={setLastName} placeholder="Smith" />
              </View>
            </View>
            <Input label="Business name" value={businessName} onChangeText={setBusinessName} placeholder="Smith Plumbing Ltd" />
            <Input label="Email" value={email} onChangeText={setEmail} placeholder="john@example.com" keyboardType="email-address" autoCapitalize="none" required />
            <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="07700 900000" keyboardType="phone-pad" />
            <Input label="Service area postcode" value={postcode} onChangeText={setPostcode} placeholder="E1 6HS" autoCapitalize="characters" />
            <Input label="About you" value={bio} onChangeText={setBio} placeholder="Tell homeowners about your experience..." multiline numberOfLines={4} />
            <Button size="lg" fullWidth loading={loading} onPress={handleSave}>Save changes</Button>
          </>
        )}

        {tab === 'qualifications' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qualifications & Accreditations</Text>
            <Text style={styles.sectionDesc}>Add your professional qualifications to build trust with homeowners.</Text>
            {['Gas Safe', 'NICEIC', 'CSCS', 'City & Guilds', 'NVQ'].map((q) => (
              <View key={q} style={styles.qualRow}>
                <Text style={styles.qualName}>{q}</Text>
                <Button variant="outline" size="sm" onPress={() => Alert.alert('Upload', `Upload ${q} certificate`)}>Upload</Button>
              </View>
            ))}
          </View>
        )}

        {tab === 'portfolio' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Portfolio</Text>
            <Text style={styles.sectionDesc}>Showcase your past work to attract more homeowners.</Text>
            <Button variant="outline" size="lg" fullWidth onPress={() => Alert.alert('Upload', 'Photo upload coming soon.')}>
              + Add photos
            </Button>
            <View style={styles.portfolioEmpty}>
              <Text style={styles.portfolioEmptyText}>No photos yet. Add some to stand out!</Text>
            </View>
          </View>
        )}

        {tab === 'security' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <Button variant="outline" size="md" fullWidth onPress={() => Alert.alert('Password', 'A reset link has been sent to your email.')}>
              Change password
            </Button>
            <Separator />
            <Button variant="destructive" size="md" fullWidth onPress={() => Alert.alert('Delete', 'Contact support to delete your account.')}>
              Delete account
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    padding: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white },
  summaryName: { fontFamily: Fonts.bold, fontSize: FontSizes.md, color: Colors.foreground },
  summaryBiz: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, paddingVertical: Spacing[2.5], alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  tabTextActive: { color: Colors.primary, fontFamily: Fonts.semiBold },
  scroll: { padding: Spacing[4], gap: Spacing[3], paddingBottom: 40 },
  nameRow: { flexDirection: 'row', gap: Spacing[3] },
  section: { gap: Spacing[3] },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  sectionDesc: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  qualRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2.5],
  },
  qualName: { fontFamily: Fonts.medium, fontSize: FontSizes.base, color: Colors.foreground },
  portfolioEmpty: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    padding: Spacing[6],
    alignItems: 'center',
  },
  portfolioEmptyText: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
});
