// screens/JobResponsesScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function GetResponses() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="flex-1 bg-primary px-4 py-5">
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text className="text-2xl font-semibold text-black mb-2">Responses to your job:</Text>
      <Text className="text-2xl font-semibold text-black mb-4">series</Text>

      {/* Action Links */}
      <View className="flex-row space-x-4 mb-6">
        <Text className="text-base text-gray-600">View details</Text>
        <Text className="text-base text-gray-400">|</Text>
        <Text className="text-base text-gray-600">Edit</Text>
        <Text className="text-base text-gray-400">|</Text>
        <Text className="text-base text-gray-600">Close job</Text>
      </View>

      {/* My chats section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-black mb-1">My chats</Text>
        <Text className="text-base text-gray-700">
          You didn’t start a chat with any tradespeople yet. Start a chat to get your job done soon.
        </Text>
      </View>

      {/* Interested tradespeople */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-black mb-1">Interested tradespeople</Text>
        <Text className="text-base text-gray-700 mb-3">
          Tradespeople interested in your job will show here.
        </Text>
        <View className="bg-[#f3f4ff] border border-[#e0e1f5] p-4 rounded-lg flex-row items-start space-x-2">
          <Feather name="info" size={20} color="#4b6bfb" />
          <View>
            <Text className="text-base text-gray-800 mb-1">
              Download the app to get notified when a tradesperson is interested.
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}>
              <Text className="text-base text-blue-700 underline">Download app</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Get more responses */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-black mb-1">Get more responses</Text>
        <Text className="text-base text-gray-700 mb-3">
          Invite 10 more recommended tradespeople to get more responses.
        </Text>
        <TouchableOpacity className="bg-blue-600 py-3 rounded-md items-center" onPress={()=>router.push('/(tabs)/client/post-job/[category]/invite')}>
          <Text className="text-white font-medium">View recommended tradespeople</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
