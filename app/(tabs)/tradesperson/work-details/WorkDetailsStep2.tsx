import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react-native'; // cancel icon
import { ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const WorkDetailsStep2 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white ">
        <AppHeader onBackPress={()=> router.push('/(tabs)/tradesperson/work-details/WorkDetailsStep1')} />
    <View className="flex-1 bg-primary px-6 pt-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-lg font-bold text-gray-800">Work details</Text>
      </View>

      {/* Progress bar */}
      <View className="w-full h-1 bg-gray-200 mb-6">
        <View className="h-full bg-blue-600 w-1/5" />
      </View>

      {/* Step Info */}
      <Text className="text-xs text-gray-600 mb-4">Step 1/5</Text>
      <Text className="text-xl font-semibold text-gray-900 mb-6">Enter your business details</Text>

      {/* Trading name */}
      <Text className="text-sm font-medium text-gray-700 mb-1">Trading name <Text className="text-red-500">*</Text></Text>
      <TextInput
        placeholder="Enter your trading name"
        className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-sm bg-white"
      />

      {/* Work address */}
      <Text className="text-sm font-medium text-gray-700 mb-1">Work address <Text className="text-red-500">*</Text></Text>
      <TextInput
        placeholder="Enter your company address"
        className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-sm bg-white"
      />

      {/* Postcode */}
      <Text className="text-sm font-medium text-gray-700 mb-1">Postcode <Text className="text-red-500">*</Text></Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-4 py-3 bg-white mb-6">
        <Text className="text-sm text-gray-800">530068</Text>
        <Text className="text-sm text-gray-500 ml-2">| Bangalore,Karnataka</Text>
      </View>

      {/* Navigation buttons */}
      <View className="flex-row justify-center">
        <TouchableOpacity className="bg-blue-500 w-full py-3 rounded-md" onPress={() => router.push('/(tabs)/tradesperson/work-details/TravelDistance')}>
          <Text className="text-sm text-white text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default WorkDetailsStep2;
