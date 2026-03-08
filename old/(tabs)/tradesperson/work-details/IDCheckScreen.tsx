import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

export default function IDCheckScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/WorkDetailsStep2')} />
    <View className="flex-1 bg-primary px-4 pt-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold">ID Check</Text>
        <Text className="text-sm underline text-gray-500">All steps</Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <View className="h-1 bg-blue-500 w-2/5 rounded-full" />
      </View>

      {/* Step Info */}
      <Text className="text-sm font-medium mb-6">Step 2/5</Text>

      {/* Content */}
      <View className="space-y-4">
        <Text className="text-2xl font-bold">Confirm your identity</Text>
        <Text className="text-gray-500">3 mins</Text>
        <Text className="text-base text-gray-800">
          This helps us check that you’re really you. Identity verification is one of the ways we keep The Builder Network secure.
        </Text>
        <Text className="text-base text-gray-800">
          Your ID will be handled securely and won’t be shared with anyone else.
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-auto mb-8 space-x-2 ">
        <Pressable
          onPress={() => router.push('/(tabs)/tradesperson/work-details/WorkDetailsStep2')}
          className="flex-1 border border-blue-600 py-3 rounded-xl items-center mr-2"
        >
          <Text className="text-blue-600 font-medium">Back</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/(tabs)/tradesperson/work-details/SelectIDScreen')}
          className="flex-1 bg-blue-600 py-3 rounded-xl items-center ml-2"
        >
          <Text className="text-white font-medium">Verify identity</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
}
