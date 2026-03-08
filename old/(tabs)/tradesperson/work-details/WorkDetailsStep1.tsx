// WorkDetailsStep1.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const businessTypes = [
  'Self employed / sole trader',
  'Limited company (LTD)',
  'Ordinary partnership',
  'Limited liability partnership (LLP)',
];

const WorkDetailsStep1 = () => {
  const [selectedType, setSelectedType] = useState<string | null>(businessTypes[0]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/WorkDetails')} />

      <ScrollView className="flex-1 bg-primary px-6 pt-5">
        {/* Header */}
        <Text className="text-lg font-semibold text-black mb-1">Work details</Text>

        {/* Step */}
        <Text className="text-xs text-gray-500 mb-6">Step 1/5</Text>

        {/* Question */}
        <Text className="text-base font-medium text-black mb-4">
          What type of business do you have?
        </Text>

        {/* Options */}
        {businessTypes.map((type) => (
          <Pressable
            key={type}
            onPress={() => setSelectedType(type)}
            className={`flex-row items-center border rounded-md px-4 py-3 mb-3 ${
              selectedType === type ? 'border-black bg-white' : 'border-gray-300 bg-gray-100'
            }`}
          >
            <Text className="flex-1 text-black">{type}</Text>
            <MaterialIcons
              name={selectedType === type ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={20}
              color={selectedType === type ? 'black' : 'gray'}
            />
          </Pressable>
        ))}

        {/* Continue Button */}
        <View className="mt-10 items-center">
          <TouchableOpacity
            className={`w-full py-4 rounded-xl ${
              selectedType ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            disabled={!selectedType}
            onPress={() => router.push('/(tabs)/tradesperson/work-details/WorkDetailsStep2')
              // Handle continue logic
            }
          >
            <Text className="text-center text-white font-semibold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkDetailsStep1;
