import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ReviewsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="flex-1 bg-[#f5fcf1] px-4 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} >
          <Ionicons name='arrow-back-outline' size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Reviews</Text>
      </View>

      {/* Rating Section */}
      <View className="items-center mb-6">
        <Ionicons name='star-outline' size={28} color="black" />
        <Text className="text-3xl font-bold mt-1">0</Text>
        <Text className="text-base text-gray-600 mt-1">Overall rating • 0 reviews</Text>
      </View>

      {/* Request Button */}
      <TouchableOpacity className="bg-blue-600 rounded-md py-3 px-6 items-center mb-10">
        <Text className="text-white text-base font-semibold">Request a review</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="border-t border-gray-200 mb-10" />

      {/* No Reviews Section */}
      <View className="items-center px-4">
        <Ionicons name='person-add-outline' size={36} color="gray" />
        <Text className="text-base font-bold mt-4">No reviews yet</Text>
        <Text className="text-center text-gray-600 mt-2">
          Reviews for jobs you've done in and outside The Builder Network appear here.
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
