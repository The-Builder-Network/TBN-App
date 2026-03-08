import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing } from '../../constants/fonts';
import { useAuth } from '../../hooks/useAuth';
import AppHeader from '../../components/shared/AppHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Separator from '../../components/ui/Separator';

export default function HomeownerProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(firstName || email || 'U')[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.avatarName}>{firstName} {lastName}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
        </View>

        <Separator />

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Input label="First name" value={firstName} onChangeText={setFirstName} placeholder="John" required />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Last name" value={lastName} onChangeText={setLastName} placeholder="Smith" />
            </View>
          </View>
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="john@example.com" keyboardType="email-address" autoCapitalize="none" required />
          <Input label="Phone number" value={phone} onChangeText={setPhone} placeholder="07700 900000" keyboardType="phone-pad" />
          <Input label="Postcode" value={postcode} onChangeText={setPostcode} placeholder="E1 6HS" autoCapitalize="characters" />

          <Button size="lg" fullWidth loading={loading} onPress={handleSave}>
            Save changes
          </Button>
        </View>

        <Separator />

        <View style={styles.dangerZone}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onPress={() => Alert.alert('Change Password', 'A password reset link has been sent to your email.')}
          >
            Change password
          </Button>
          <Button
            variant="destructive"
            size="md"
            fullWidth
            onPress={() =>
              Alert.alert('Delete Account', 'This action cannot be undone. All your data will be permanently deleted.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => {} },
              ])
            }
          >
            Delete account
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40, gap: Spacing[2] },
  avatarSection: { alignItems: 'center', paddingVertical: Spacing[6], gap: Spacing[1.5] },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.white },
  avatarName: { fontFamily: Fonts.bold, fontSize: FontSizes.lg, color: Colors.foreground },
  avatarEmail: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  form: { padding: Spacing[4], gap: Spacing[3] },
  nameRow: { flexDirection: 'row', gap: Spacing[3] },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: FontSizes.base, color: Colors.foreground },
  dangerZone: { padding: Spacing[4], gap: Spacing[2.5] },
});
