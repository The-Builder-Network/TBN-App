// app/post-job/[category]/client-details.tsx
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function ClientDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Ensure fallback email for preview/testing
  const email = useMemo(() => {
    return typeof params.email === 'string' ? params.email : 'marvixmarvixediting@gmail.com';
  }, [params.email]);

  const category = useMemo(() => {
    return typeof params.category === 'string' ? params.category : 'general';
  }, [params.category]);

  // Navigate to appropriate verification method
  const handleOptionPress = (option: string) => {
    // router.push(`/post-job/${category}/verify-method?option=${option}`); //update it ater forbwhich verifictaiotn is needd 
    router.push(`/(tabs)/client/post-job/${category}/client-dashboard`);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <AppHeader onBackPress={() => router.back()} />

      <View className="p-6">
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-2">Login to The</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-4">Builder Network</Text>

        {/* Display Email */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-2">
            <Ionicons name="person-outline" size={20} color="black" />
            <Text className="text-base text-gray-800">{email}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/client/change-email')}>
            <Text className="text-blue-600 text-base font-medium">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Option 1: Email Verification */}
        <TouchableOpacity
          onPress={() => handleOptionPress('')}
          className="flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 bg-white"
        >
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="email-outline" size={22} color="black" />
            <Text className="text-base text-gray-800">Get a code via Email</Text>
          </View>
          <Feather name="chevron-right" size={20} color="gray" />
        </TouchableOpacity>

        {/* Option 2: SMS Verification */}
        <TouchableOpacity
          onPress={() => handleOptionPress('')}
          className="flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 bg-white"
        >
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="message-text-outline" size={22} color="black" />
            <Text className="text-base text-gray-800">Get a code via SMS</Text>
          </View>
          <Feather name="chevron-right" size={20} color="gray" />
        </TouchableOpacity>

        {/* Option 3: Password Login */}
        <TouchableOpacity
          onPress={() => handleOptionPress('')}
          className="flex-row items-center justify-between border border-gray-200 rounded-lg p-4 bg-white"
        >
          <View className="flex-row items-center gap-3">
            <Feather name="unlock" size={22} color="black" />
            <Text className="text-base text-gray-800">Enter your password</Text>
          </View>
          <Feather name="chevron-right" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
