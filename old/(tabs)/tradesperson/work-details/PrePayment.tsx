import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { X, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const PrePaymentMethod = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/profileIntro')} />
    <ScrollView className="flex-1 bg-primary px-6 pt-5">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-2xl font-bold text-black">Payment method</Text>
      </View>

      {/* Step progress */}
      <Text className="text-sm font-semibold mb-1">Step 5/5</Text>
      <View className="h-1 w-full bg-gray-200 rounded-full mb-2">
        <View className="h-1 bg-blue-400 rounded-full w-full" />
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-black mb-1">Add a payment method</Text>
      <Text className="text-sm text-gray-500 mb-4">~ 2 mins</Text>

      {/* Description */}
      <Text className="text-base text-black mb-1">
        Finally, add a payment method, so you can complete your registration.
      </Text>
      <Text className="text-base text-black mb-1">
        Remember, searching for leads and expressing interest on The Builder Network is free.
      </Text>
      <Text className="text-base text-black mb-6">
        You only pay a fee when a customer shares their contact details.
      </Text>

      {/* Buttons */}
      <View className="flex-row space-x-4 mt-6 mb-10">
        <TouchableOpacity className="px-5 py-2 border border-blue-400 rounded-md">
          <Text className="text-blue-500 font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-5 py-2 rounded-md bg-blue-600 ml-2 " onPress={()=>router.push('/(tabs)/tradesperson/work-details/PaymentMethod')} >
          <Text className="text-white font-medium">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default PrePaymentMethod;
