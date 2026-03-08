import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const PortfolioScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 bg-primary px-6 pt-5i">
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-bold text-black mb-10">Portfolio</Text>

      {/* Upload Box */}
      <TouchableOpacity className="flex-row items-center">
        {/* Icon box */}
        <View className="border border-dashed border-gray-400 rounded-md p-4 mr-4">
          <Ionicons name="cloud-upload-outline" size={40} color="black" />
        </View>

        {/* Label */}
        <Text className="text-black text-base">Drag or select your files (PNG, JPG)</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default PortfolioScreen;
