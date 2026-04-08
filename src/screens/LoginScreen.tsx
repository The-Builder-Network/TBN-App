import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../hooks/useAuth';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Role will be determined by backend; defaulting to homeowner for stub
      await login(email.trim(), password, 'homeowner');
      navigation.navigate('HomeownerMyJobs');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full max-h-screen flex flex-col justify-center bg-background px-6 py-12"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require('../../assets/logo-black.png')}
          style={{ height: 38, width: 152 }}
          resizeMode="contain"
          className="mb-6 self-center"
        />

        {/* Title */}
        <Text className="text-foreground mb-1 text-center text-5xl font-bold">Login</Text>
        <Text className="text-muted-foreground mb-7 text-center text-lg">
          Enter your credentials to continue
        </Text>

        {/* Form */}
        <View className="mb-6 gap-4">
          {/* Email */}
          <View className="gap-1.5">
            <Text className="text-foreground text-base font-medium">
              Email <Text className="text-destructive">*</Text>
            </Text>
            <TextInput
              className="border-border text-foreground h-14 rounded-xl border bg-white px-4 font-sans text-lg"
              placeholder="Email"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Password */}
          <View className="gap-1.5">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground text-base font-medium">
                Password <Text className="text-destructive">*</Text>
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-primary text-sm">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TextInput
                className="border-border text-foreground h-14 rounded-xl border bg-white px-4 pr-12 font-sans text-lg"
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-3 top-0 items-center justify-center"
                style={{ width: 36 }}
                onPress={() => setShowPassword((v) => !v)}
                activeOpacity={0.7}>
                {showPassword ? (
                  <EyeOff size={18} color="#6B7280" />
                ) : (
                  <Eye size={18} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {error ? <Text className="text-destructive text-sm">{error}</Text> : null}

          {/* CTA */}
          <TouchableOpacity
            className={`bg-primary h-14 items-center justify-center rounded-xl mt-1${loading ? ' opacity-60' : ''}`}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}>
            <Text className="text-lg font-medium text-white">
              {loading ? 'Logging in...' : 'Log in'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* New here */}
        <View className="border-border gap-3 border-t pt-6">
          <Text className="text-foreground text-xl font-semibold">New to The Builder Network?</Text>
          <View className="gap-2">
            <Text className="text-base">
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate('PostJob', {})}>
                Post your job
              </Text>
              <Text className="text-muted-foreground text-lg"> to find a tradesperson</Text>
            </Text>
            <Text className="text-base">
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate('TradesNetwork')}>
                Sign up
              </Text>
              <Text className="text-muted-foreground text-lg"> to join as a tradesperson</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
