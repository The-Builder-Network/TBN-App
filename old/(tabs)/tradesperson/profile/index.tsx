import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';

const Index = () => {
  const { userType, clientJobPosted } = useAppStore();

  const sectionRoutes: Record<string, string> = {
    'Contact details': '/tradesperson/profile/contact-details',
    'Manage account': '/tradesperson/profile/manage-account',
    'Saved leads': '/tradesperson/profile/saved-leads',

    'Work area': '/tradesperson/profile/work-area',
    'Services': '/tradesperson/profile/services',
    'My message templates': '/tradesperson/profile/message-templates',
    'Notifications': '/tradesperson/profile/notifications',

    'Balance': '/(tabs)/tradesperson/profile/Balance',
    'Payments': '/tradesperson/profile/payments',

    'Support center': '/tradesperson/profile/support-center',

    'Trade Perks': '/tradesperson/profile/trade-perks',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-4 bg-primary">
        {/* Profile Section */}
        <View className="items-start mt-4 mb-4">
          <View className="flex-row items-center gap-3 mb-1">
            <View className="w-10 h-10 bg-gray-300 rounded-full justify-center items-center">
              <Feather name="user" size={20} color="#000" />
            </View>
            <View>
              <Text className="font-semibold text-base">Ash</Text>
              <Text className="text-gray-600 text-sm">Bangalore</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/tradesperson/profile')}>
            <Text className="text-blue-600 text-sm">View profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View className="mb-2">
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-md mb-2"
            onPress={() => router.push('/tradesperson/profile/company-description')}
          >
            <Text className="text-white font-medium">Company description</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2" onPress={() => router.push('/tradesperson/profile/ReviewScreen')}>
            <Text className="text-gray-800">Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2" onPress={() => router.push('/tradesperson/profile/Portfolio')}>
            <Text className="text-gray-800">Portfolio</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-2" onPress={() => router.push('/tradesperson/profile/ask-tradesperson')}>
            <Text className="text-gray-800">Ask a tradesperson</Text>
          </TouchableOpacity>
        </View>

        {/* Sections with Routing */}
        {[
          {
            title: 'Account',
            items: ['Contact details', 'Manage account', 'Saved leads'],
          },
          {
            title: 'Job settings',
            items: ['Work area', 'Services', 'My message templates', 'Notifications'],
          },
          {
            title: 'Payments',
            items: ['Balance', 'Payments'],
          },
          {
            title: 'Support',
            items: ['Support center'],
          },
          {
            title: 'Discover',
            items: ['Trade Perks'],
          },
        ].map((section) => (
          <View key={section.title} className="border-t border-gray-300 mt-4 pt-4">
            <Text className="text-xs text-gray-500 uppercase mb-2">{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item}
                className="py-2"
                onPress={() => router.push(sectionRoutes[item] )}
              >
                <Text className="text-gray-800">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity className="flex-row items-center gap-2 mt-6" onPress={() => router.replace('/(tabs)')}>
          <Text className="text-red-600 font-medium">Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      {userType === 'client' && clientJobPosted && <ClientNav />}
      {userType === 'tradesperson' && <TradespersonNav />}
    </SafeAreaView>
  );
};

export default Index;
