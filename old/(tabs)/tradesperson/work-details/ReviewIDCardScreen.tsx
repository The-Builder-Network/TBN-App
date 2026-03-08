import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

export default function ReviewIDCardScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <AppHeader onBackPress={() => router.push(('/(tabs)/tradesperson/work-details/SelectIDScreen'))} />
        <View className="flex-1 bg-primary px-6 pt-5">
      {/* Title */}
      <Text className="text-3xl font-bold mt-5">Review your Identity card</Text>
      <Text className="text-gray-600 mt-3 mb-6">
        Make sure your entire ID is clear, well-lit and fits inside the frame.
      </Text>

      {/* Image Preview Box */}
      <View className="items-center">
        <View className="w-64 h-40 bg-gray-300 rounded-lg relative overflow-hidden">
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          {/* Upload/Edit Button */}
          <Pressable
            onPress={pickImage}
            className="absolute bottom-2 right-2 w-10 h-10 bg-blue-300 rounded-full items-center justify-center border border-white"
          >
            <Ionicons name="pencil" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Submit Button */}
      <View className="items-center  mt-6 mb-8">
        <Pressable
          disabled={!imageUri}
          onPress={()=> router.push('/(tabs)/tradesperson/work-details/VerifySkillsScreen')}
          className={`px-6 py-3 rounded-xl ${imageUri ? 'bg-blue-600' : 'bg-blue-300 '}`}
        >
          <Text className="text-white font-semibold">Submit</Text>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
}
