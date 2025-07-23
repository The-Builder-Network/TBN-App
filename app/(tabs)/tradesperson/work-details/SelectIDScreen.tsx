import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

export default function SelectIDScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const idOptions = [
    { label: 'Passport', icon: 'passport' },
    { label: 'Identity card', icon: 'card-account-details' },
    { label: 'Residence permit', icon: 'home-account' },
    { label: 'Driver’s license', icon: 'card-bulleted' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/IDCheckScreen')} />
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1 bg-primary pt-5 px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">ID Check</Text>

      </View>

      {/* Progress Bar */}
      <View className="w-full h-1 bg-gray-200 rounded-full mb-4">
        <View className="h-1 bg-blue-400 w-2/5 rounded-full" />
      </View>

      {/* Step Info */}
      <Text className="text-sm font-medium text-black mb-4">Step 2/5</Text>

      {/* Title */}
      <Text className="text-2xl font-bold mb-2">Which ID do you have?</Text>
      <Text className="text-gray-600 mb-6">Choose one from the following options:</Text>

      {/* ID Options */}
      <View className="mt-2 space-y-3">
        {idOptions.map(({ label, icon }) => (
          <Pressable
            key={label}
            onPress={() => setSelected(label)}
            className={`flex-row justify-between items-center p-4 rounded-xl border mt-3 ${
              selected === label ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
            }`}
          >
            <View className="flex-row items-center space-x-5">
              <MaterialCommunityIcons name={icon as any} size={20} color="gray" />
              <Text className="text-base">{label}</Text>
            </View>
            <Ionicons
              name={selected === label ? 'radio-button-on' : 'radio-button-off'}
              size={22}
              color={selected === label ? '#2563EB' : '#A1A1AA'} // blue-600 or gray-400
            />
          </Pressable>
        ))}
      </View>

      {/* Why do we need this */}
      <View className="flex-row items-center mt-6">
        <Ionicons name="information-circle-outline" size={16} color="gray" />
        <Text className="ml-2 text-sm underline text-gray-700">Why do we need your identity?</Text>
      </View>

      {/* Action Buttons */}
      <View className="mt-auto mb-10 flex-row justify-between items-center px-2">
        <Text className="text-blue-400 text-base">Upload later</Text>
        <Pressable
          disabled={!selected}
            onPress={() => router.push('/(tabs)/tradesperson/work-details/ReviewIDCardScreen')}
          className={`px-6 py-3 rounded-xl ${
            selected ? 'bg-blue-600' : 'bg-blue-300'
          }`}
        >
          <Text className="text-white font-semibold">Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
