// components/ClientNav.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
export default function ClientNav() {
  return (
    <View className="flex-row justify-around bg-white py-4 border-t border-gray-200">
      {/* Home */}
      <TouchableOpacity onPress={() => router.push('/client/post-job')} className="items-center">
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text className="text-xs text-black">Post Job</Text>
      </TouchableOpacity>

      {/* Leads */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/client/my-job')} className="items-center">
        <Ionicons name="newspaper-outline" size={24} color="black" />
        <Text className="text-xs text-black">My jobs</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/client/profile')} className="items-center">
        <Ionicons name="person-outline" size={24} color="black" />
        <Text className="text-xs text-black">Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
