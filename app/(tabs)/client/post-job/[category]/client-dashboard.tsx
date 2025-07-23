// app/client/client-dashboard.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ClientDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f9fff3] px-6">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4">
        <Text className="text-2xl font-bold text-gray-900">Welcome </Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/client/my-job')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Success Message */}
      <View className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <Text className="text-xl font-semibold text-green-600 mb-2">Password Verified!</Text>
        <Text className="text-base text-gray-800 mb-4">
          You're now logged in to The Builder Network. Let’s help you get your job posted.
        </Text>

        {/* Continue CTA */}
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/client/post-job/[category]/invite`)}
          className="bg-blue-600 py-3 px-4 rounded-lg items-center"
        >
          <Text className="text-white text-base font-medium">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
