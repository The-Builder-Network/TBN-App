import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';

export default function ContactsScreen() {

  const { userType, clientJobPosted } = useAppStore();

  const [tab, setTab] = useState<'messages' | 'archive'>('messages');

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Title */}
      <View className="flex-1 px-6 bg-primary ">
        {/* <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Text className="text-blue-600 text-lg">← Back</Text>
        </TouchableOpacity> */}
      <Text className="text-3xl font-bold text-black mb-6 pt-5">Contacts</Text>

      {/* Tabs */}
      <View className="flex-row space-x-6 mb-6 border-b border-gray-300 pb-2">
        <TouchableOpacity
          onPress={() => setTab('messages')}
          className="flex-row items-center space-x-1"
        >
          <Text className={`text-lg font-semibold ${tab === 'messages' ? 'text-blue-600' : 'text-gray-600'}`}>
            💬 Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab('archive')}
          className="flex-row items-center space-x-1"
        >
          <Text className={`text-lg font-semibold ${tab === 'archive' ? 'text-blue-600' : 'text-gray-600'}`}>
            🗂 Archive
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {tab === 'messages' ? (
        <View className="flex-1 justify-center items-center">
          {/* Folder Icon Placeholder */}
          <View className="w-24 h-24 mb-4 justify-center items-center">
            <Image
              source={{
                uri: 'https://img.icons8.com/color/96/folder-invoices--v1.png',
              }}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>

          {/* No Data Text */}
          <Text className="text-xl font-bold text-black text-center mb-2">
            No contact details shared yet
          </Text>
          <Text className="text-center text-gray-600 mb-6 px-4">
            When customers want to get in touch with you, their contact details are displayed here.
          </Text>

          {/* View Leads Button */}
          <TouchableOpacity className="bg-blue-600 px-6 py-4 rounded-md">
            <Text className="text-white font-semibold text-lg">
              View new leads
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No archived contacts.</Text>
        </View>
      )}

      </View>
                            {userType === 'client' && clientJobPosted && <ClientNav />}
            {userType === 'tradesperson' && <TradespersonNav />}
    </SafeAreaView>
  );
}
