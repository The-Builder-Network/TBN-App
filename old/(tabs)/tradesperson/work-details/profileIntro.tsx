import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const ProfileIntroScreen = () => {
  const [text, setText] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/HowItWorks')} />
    <ScrollView className="flex-1 bg-primary px-6 pt-5">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-2xl font-bold text-black">Profile Setup</Text>
      </View>

      {/* Step progress */}
      <Text className="text-sm font-semibold mb-1">Step 4/5</Text>
      <View className="h-1 w-full bg-gray-200 rounded-full mb-2">
        <View className="h-1 bg-blue-400 rounded-full w-[80%]" />
      </View>

      {/* Title and Description */}
      <Text className="text-2xl font-bold text-black mb-2">Introduce yourself to future customers</Text>
      <Text className="text-base text-black mb-6">
        This is your chance to make a great first impression. You can always make edits later in your profile.
      </Text>

      {/* Tip Box */}
      <View className="bg-blue-600 p-4 rounded-md mb-6">
        <View className="flex-row space-x-2 items-center mb-2">
          <Ionicons name='information-outline' size={16} color="white" />
          <Text className="text-white text-sm font-medium">
            A quality description can increase your chances of getting hired.
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-white font-semibold underline">Get writing tips</Text>
        </TouchableOpacity>
      </View>

      {/* Textarea */}
      <TextInput
        className="bg-white h-40 text-base border border-gray-300 rounded-md p-4 text-black"
        placeholder="Tell us about yourself in a few sentences."
        placeholderTextColor="#888"
        multiline
        maxLength={1250}
        value={text}
        onChangeText={setText}
      />
      <Text className="text-sm text-black mt-1">{text.length} / 1250</Text>

      {/* Buttons */}
      <View className="flex-row space-x-4 mt-8 mb-10">
        <TouchableOpacity className="px-5 py-2 border border-blue-400 rounded-md">
          <Text className="text-blue-500 font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={` px-5 py-2 rounded-md ${text.trim().length === 0 ? 'bg-blue-300 opacity-60' : 'bg-blue-600 ml-2'  }`}
          disabled={text.trim().length === 0}
          onPress={() => router.push('/(tabs)/tradesperson/work-details/PrePayment')}
          
        >
          <Text className="text-white font-medium ">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileIntroScreen;
