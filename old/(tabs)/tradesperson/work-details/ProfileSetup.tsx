import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { X, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const ProfileSetupScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/Qualified')} />
    <View className="flex-1 bg-primary px-6 pt-5">
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
      </View>
      <Text className="text-2xl font-bold text-black mb-2">Profile Setup</Text>
      {/* Progress bar */}
      <View className="mb-6">
        <Text className="font-semibold text-sm text-black mb-1">Step 4/5</Text>
        <View className="h-1 w-full bg-gray-200 rounded-full">
          <View className="h-1 bg-blue-400 rounded-full w-[80%]" />
        </View>
      </View>

      {/* Content */}
      <Text className="text-2xl font-bold text-black mb-1">Get set up for success</Text>
      <Text className="text-sm text-gray-600 mb-4">~ 5 mins</Text>

      <Text className="text-base text-black mb-2">You're almost there!</Text>
      <Text className="text-base text-black mb-2">
        We want to help you meet your goals and get the leads you want.
      </Text>
      <Text className="text-base text-black mb-6">
        In this step, we’ll set up your public profile and guide you through the important steps when using The Builder Network.
      </Text>

      {/* Buttons */}
      <View className="flex-row space-x-4 justify-between">
        <Pressable className="bg-blue-100 px-6 py-3 rounded-lg">
          <Text className="text-blue-500 font-medium">Back</Text>
        </Pressable>
        <Pressable className="bg-blue-600 px-6 py-3 rounded-lg" onPress={() => router.push('/(tabs)/tradesperson/work-details/HowItWorks')}>
          <Text className="text-white font-medium">Continue</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
    );
};

export default ProfileSetupScreen;
