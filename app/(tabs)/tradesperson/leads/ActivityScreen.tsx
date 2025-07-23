import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';

const ActivityScreen = () => {

  const { userType, clientJobPosted } = useAppStore();
  return (
    <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 pt-5 bg-primary px-6">
      <Text className="text-2xl font-bold self-start mb-8">Activity</Text>

      <View className="items-center">
        <View className="w-24 h-24 rounded-full bg-[#F5F0FF] items-center justify-center mb-6">
          <Image
            //source={require('@/assets/folder-icon.png')} // Replace with your own folder icon
            className="w-12 h-12"
            resizeMode="contain"
          />
        </View>

        <Text className="text-lg font-semibold text-center mb-2">
          No leads&apos; activity{'\n'}yet
        </Text>

        <Text className="text-center text-sm text-gray-600 mb-6">
          Once you express interest, get shortlisted or{'\n'}hired, you’ll see leads here.
        </Text>

        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-md" onPress={()=> router.push('/(tabs)/tradesperson/leads/Newleads')}>
          <Text className="text-white font-semibold">Browse leads</Text>
        </TouchableOpacity>
      </View>
    </View>
                          {userType === 'client' && clientJobPosted && <ClientNav />}
                {userType === 'tradesperson' && <TradespersonNav />}
    </SafeAreaView>
  );
};

export default ActivityScreen;
