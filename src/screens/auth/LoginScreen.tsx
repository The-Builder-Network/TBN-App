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
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Fonts, FontSizes, Spacing, Radius } from '../../constants/fonts';
import { useAuth } from '../../hooks/useAuth';
import AppHeader from '../../components/shared/AppHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Separator from '../../components/ui/Separator';

type Role = 'homeowner' | 'tradesperson';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { login } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [role, setRole] = useState<Role>('homeowner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.includes('@')) e.email = 'Please enter a valid email address';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (mode === 'register' && !firstName.trim()) e.firstName = 'First name is required';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await login(email, password, role);
      navigation.navigate('DashboardTab', { screen: 'DashboardHome' });
    } catch {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login helper
  const handleDemoLogin = async (demoRole: Role) => {
    setLoading(true);
    try {
      await login('demo@example.com', 'password', demoRole);
      navigation.navigate('DashboardTab', { screen: 'DashboardHome' });
    } catch {
      Alert.alert('Error', 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader showBack title={mode === 'signin' ? 'Sign In' : 'Create Account'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.logoWrap}>
          <Text style={styles.logoText}>The Builder Network</Text>
          <Text style={styles.tagline}>
            {mode === 'signin' ? 'Welcome back' : 'Join thousands of homeowners and tradespeople'}
          </Text>
        </View>

        {/* Mode toggle */}
        <View style={styles.modeRow}>
          {(['signin', 'register'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.modeBtnText, mode === m && styles.modeBtnTextActive]}>
                {m === 'signin' ? 'Sign In' : 'Register'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Role selector (register only) */}
        {mode === 'register' && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>I am a...</Text>
            <View style={styles.roleRow}>
              {(['homeowner', 'tradesperson'] as Role[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleBtn, role === r && styles.roleBtnActive]}
                  onPress={() => setRole(r)}
                >
                  <Text style={styles.roleIcon}>{r === 'homeowner' ? '🏠' : '🔧'}</Text>
                  <Text style={[styles.roleLabel, role === r && styles.roleLabelActive]}>
                    {r === 'homeowner' ? 'Homeowner' : 'Tradesperson'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Form */}
        <View style={styles.form}>
          {mode === 'register' && (
            <View style={styles.nameRow}>
              <View style={{ flex: 1 }}>
                <Input
                  label="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="John"
                  error={errors.firstName}
                  required
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Smith"
                />
              </View>
            </View>
          )}
          <Input
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            required
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
            required
          />

          <Button size="lg" fullWidth loading={loading} onPress={handleSubmit}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </View>

        <Separator label="or try a demo" />

        {/* Demo logins */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Demo accounts</Text>
          <View style={styles.demoRow}>
            <Button
              variant="outline"
              size="md"
              onPress={() => handleDemoLogin('homeowner')}
              style={{ flex: 1 }}
            >
              🏠 Homeowner
            </Button>
            <Button
              variant="outline"
              size="md"
              onPress={() => handleDemoLogin('tradesperson')}
              style={{ flex: 1 }}
            >
              🔧 Tradesperson
            </Button>
          </View>
        </View>

        <Text style={styles.legal}>
          By continuing you agree to our{' '}
          <Text style={styles.legalLink} onPress={() => navigation.navigate('Terms')}>Terms</Text>
          {' '}and{' '}
          <Text style={styles.legalLink} onPress={() => navigation.navigate('Privacy')}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing[4], gap: Spacing[4], paddingBottom: 40 },
  logoWrap: { alignItems: 'center', paddingVertical: Spacing[2] },
  logoText: { fontFamily: Fonts.bold, fontSize: FontSizes['2xl'], color: Colors.primary },
  tagline: { fontFamily: Fonts.regular, fontSize: FontSizes.sm, color: Colors.mutedForeground, marginTop: 4, textAlign: 'center' },
  modeRow: { flexDirection: 'row', borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.lg, overflow: 'hidden' },
  modeBtn: { flex: 1, paddingVertical: Spacing[2.5], alignItems: 'center', backgroundColor: Colors.muted },
  modeBtnActive: { backgroundColor: Colors.primary },
  modeBtnText: { fontFamily: Fonts.medium, fontSize: FontSizes.base, color: Colors.mutedForeground },
  modeBtnTextActive: { color: Colors.white, fontFamily: Fonts.semiBold },
  section: { gap: Spacing[2] },
  sectionLabel: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.foreground },
  roleRow: { flexDirection: 'row', gap: Spacing[2] },
  roleBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing[3],
    alignItems: 'center',
    gap: Spacing[1],
  },
  roleBtnActive: { borderColor: Colors.primary, backgroundColor: '#EFF6FF' },
  roleIcon: { fontSize: 28 },
  roleLabel: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground },
  roleLabelActive: { color: Colors.primary, fontFamily: Fonts.semiBold },
  form: { gap: Spacing[3] },
  nameRow: { flexDirection: 'row', gap: Spacing[3] },
  demoSection: { gap: Spacing[2] },
  demoTitle: { fontFamily: Fonts.medium, fontSize: FontSizes.sm, color: Colors.mutedForeground, textAlign: 'center' },
  demoRow: { flexDirection: 'row', gap: Spacing[2] },
  legal: { fontFamily: Fonts.regular, fontSize: FontSizes.xs, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 18 },
  legalLink: { color: Colors.primary, fontFamily: Fonts.medium },
});
