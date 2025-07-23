// app/post-job/[category]/work-area.tsx
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { Ionicons } from '@expo/vector-icons';

export default function WorkArea() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const [headline, setHeadline] = useState('');
  const [addPhotos, setAddPhotos] = useState<'yes' | 'no'>('no');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    router.push({
      pathname: `/client/post-job/${category}/client-details`,
      params: { headline, addPhotos, postcode, email },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader onBackPress={() => router.push('/(tabs)/client/post-job/[category].tsx')} />
      <View className="flex-1 bg-primary p-6 justify-start">
        {/* Job Headline */}
        <Text className="text-lg font-semibold mb-2 text-gray-800">Give your job a headline</Text>
        <Text className="text-sm text-gray-500 mb-1">More tradespeople express interest in jobs that have a descriptive name.</Text>
        <TextInput
          placeholder="e.g., Kitchen renovation"
          value={headline}
          onChangeText={setHeadline}
          className="border rounded-lg p-4 mb-6"
        />

        {/* Photo Upload Option */}
        <Text className="text-lg font-semibold mb-2 text-gray-800">Would you like to add any photos or blueprints? <Text className="text-gray-500">(Optional)</Text></Text>
        <View className="flex-row gap-4 mb-6">
          <Pressable
            onPress={() => setAddPhotos('yes')}
            className={`flex-1 p-4 rounded-lg border ${addPhotos === 'yes' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
          >
            <Text className="text-center text-gray-800">Yes</Text>
          </Pressable>
          <Pressable
            onPress={() => setAddPhotos('no')}
            className={`flex-1 p-4 rounded-lg border ${addPhotos === 'no' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
          >
            <Text className="text-center text-gray-800">No, maybe later</Text>
          </Pressable>
        </View>

        {/* Postcode */}
        <Text className="text-lg font-semibold mb-2 text-gray-800">Postcode for the job</Text>
        <Text className="text-sm text-gray-500 mb-1">To find architectural designers near you, we need to know where the job is.</Text>
        <TextInput
          placeholder="12345"
          value={postcode}
          onChangeText={setPostcode}
          className="border rounded-lg p-4 mb-1"
        />
        <Text className="text-gray-600 mb-6">Bangalore</Text>

        {/* Email */}
        <Text className="text-lg font-semibold mb-2 text-gray-800">Get responses from tradespeople near you</Text>
        <Text className="text-sm text-gray-500 mb-1">We will only share your contact details with tradespeople you choose to talk to.</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border rounded-lg p-4 mb-6"
        />

        {/* Next Button */}
        <TouchableOpacity onPress={handleNext} className="bg-blue-600 p-4 rounded-lg">
          <Text className="text-white text-center font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
