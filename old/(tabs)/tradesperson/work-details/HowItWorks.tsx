import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const HowItWorksScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/ProfileSetup')} />
    <View className="flex-1 bg-primary px-6 pt-5">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-2xl font-bold text-black">Profile Setup</Text>
      </View>

      {/* Step progress */}
      <Text className="text-sm font-semibold mb-1">Step 4/5</Text>
      <View className="h-1 w-full bg-gray-200 rounded-full mb-2">
        <View className="h-1 bg-blue-400 rounded-full w-[80%]" />
      </View>
      <TouchableOpacity className="flex-row items-center justify-end mb-6 space-x-1">
        <Ionicons name='information-outline' size={12} color="black" />
        <Text className="text-xs underline text-black">All steps</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-bold text-black mb-6">How it works</Text>

      {/* Steps */}
      <View className="space-y-6 mt-3">
        {[
          {
            num: '1',
            title: 'Pick the leads you want',
            desc: 'Choose the leads you’re interested in and send each customer an introductory message. Expressing interest in leads is totally free of charge.',
          },
          {
            num: '2',
            title: 'Get shortlisted',
            desc: 'If the customer likes your message and profile, they’ll shortlist you. We’ll send you the customer’s verified phone number, and you’ll be charged a shortlist fee.',
          },
          {
            num: '3',
            title: 'Respond and get hired',
            desc: 'When you’re shortlisted, the customer is expecting your call. Follow up quickly for the best chance of getting hired for the job.',
          },
        ].map(({ num, title, desc }) => (
          <View key={num} className="flex-row space-x-3 mt-3">
            <Text className="text-blue-500 font-bold text-2xl mr-2">{num}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-base text-black">{title}</Text>
              <Text className="text-sm text-black mt-1">{desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View className="flex-row space-x-4 mt-10">
        <TouchableOpacity className="px-5 py-2 border border-blue-400 rounded-md">
          <Text className="text-blue-500 font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-2 bg-blue-500 rounded-md mx-3  "onPress={() => router.push('/(tabs)/tradesperson/work-details/profileIntro')}>
          <Text className="text-white font-medium">Continue</Text>
        </TouchableOpacity>
      </View> 
    </View>
    </SafeAreaView>
  );
};

export default HowItWorksScreen;
