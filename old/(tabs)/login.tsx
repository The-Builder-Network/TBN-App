import AppHeader from '@/components/AppHeader';
import { useAppStore } from '@/store/useAppStore'; // Zustand store
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');

  // Zustand setter
  const setUserType = useAppStore((state) => state.setUserType);

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // 💡 Dummy logic to simulate login type
    if (email.includes('client')) {
      setUserType('client');
      Alert.alert('Login', `Logged in as Client: ${email}`);
      router.push('/(tabs)/client/post-job'); // or any client-specific screen
    } else if (email.includes('trade')) {
      setUserType('tradesperson');
      Alert.alert('Login', `Logged in as Tradesperson: ${email}`);
      router.push('/(tabs)/tradesperson/leads/Newleads'); // or any tradesperson-specific screen
    } else {
      Alert.alert(
        'Unknown user',
        'Email must include "client" or "trade" to simulate role'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <AppHeader onBackPress={() => router.push('/(tabs)')} />

      <View className="px-6 pt-4">

        {/* Login Title */}
        <Text className="text-3xl font-bold text-black mb-2">
          Login to The Builder Network
        </Text>
        <Text className="text-base text-gray-600 mb-6">
          Enter your email to continue
        </Text>

        {/* Email Input */}
        <Text className="text-black font-semibold mb-1">Email *</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          className="border border-gray-300 rounded-md px-4 py-3 mb-6 text-black"
          value={email}
          onChangeText={setEmail}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 py-4 rounded-md mb-10"
        >
          <Text className="text-white font-semibold text-center text-lg">
            Log in
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="border-t border-gray-300 mb-6" />

        {/* New User Section */}
        <Text className="text-lg font-semibold text-black mb-2">
          New to The Builder Network?
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/client/post-job')}
        >
          <Text className="text-black mb-1">
            <Text className="underline text-blue-600">Post your job</Text> to find a tradesperson
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/tradesperson/sign-up')}
        >
          <Text className="text-black">
            <Text className="underline text-blue-600">Sign up</Text> to join as a tradesperson
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
