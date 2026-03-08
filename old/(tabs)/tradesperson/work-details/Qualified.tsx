import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

const Qualified = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/StrongestSkill')} />
    <View className="flex-1 bg-primary px-6 pt-5">
      {/* Back Arrow */}


      {/* Heading */}
      <Text className="text-3xl font-bold text-black mb-8">Architecture</Text>

      {/* Question */}
      <Text className="text-base text-black mb-2">Question 1 of 1</Text>
      <Text className="text-base text-black font-medium mb-3">
        Please write down the name of the legal entity you are registered with, along with your registration number (if ARB). We currently accept the following:
      </Text>

      {/* Accepted Entities */}
      <View className="mb-4">
        <Text className="font-bold text-black">Architects Registration Board</Text>
        <Text className="font-bold text-black">Chartered Institute of Architectural Technologists</Text>
        <Text className="font-bold text-black">Royal Institute of British Architects</Text>
      </View>

      {/* Textarea */}
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Type here..."
        className="border border-gray-300 bg-white rounded-md p-4 mb-6 text-black"
        placeholderTextColor="#A3A3A3"
      />

      {/* Submit Button */}
      <TouchableOpacity className="bg-blue-400 py-3 px-6 rounded-md self-start" onPress={()=> router.push('/(tabs)/tradesperson/work-details/ProfileSetup')}>
        <Text className="text-white font-medium text-base">Submit</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Qualified;
