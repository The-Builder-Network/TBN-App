import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import ProfileAvatar from '@/components/ProfileAvatar';
import SettingsRow from '@/components/SettingsRow';
import { router } from 'expo-router';


import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';
import { Router } from 'lucide-react-native';

const Section = ({ title, items }: { title: string; items: { iconName: string; label: string; onPress: () => void }[] }) => (
  <>
    <Text className="text-xl font-semibold text-gray-800 mt-10 mb-4">{title}</Text>
    {items.map((item, index) => (
      <SettingsRow key={index} {...item} />
    ))}
  </>
);

const Index = () => {

    const { userType, clientJobPosted } = useAppStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.push('/(tabs)')
    // TODO: Add actual logout logic
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-3xl font-bold text-gray-800 mb-8">Profile</Text>

        <ProfileAvatar
          name="Ashburn"
          imageUrl="https://randomuser.me/api/portraits/men/10.jpg"
        />

        <Section
          title="Account"
          items={[
            { iconName: 'person-outline', label: 'Contact Information', onPress: () => router.push('/(tabs)/client/profile/contact') },
            { iconName: 'person-circle-outline', label: 'Manage account', onPress: () => {} },
            { iconName: 'help-outline', label: 'My questions', onPress: () => {} },
          ]}
        />

        <Section
          title="Settings"
          items={[
            { iconName: 'notifications-outline', label: 'Notifications', onPress: () => {} },
          ]}
        />

        <Section
          title="Support"
          items={[
            { iconName: 'information-circle-outline', label: 'Support center', onPress: () => {} },
            { iconName: 'chatbubble-ellipses-outline', label: 'Contact us', onPress: () => {} },
            { iconName: 'grid-outline', label: 'Download our app', onPress: () => {} },
          ]}
        />

        <Section
          title="About"
          items={[
            { iconName: 'book-outline', label: 'Terms and conditions', onPress: () => {} },
          ]}
        />

        <Section
          title="Others"
          items={[
            { iconName: 'log-out-outline', label: 'Logout', onPress: () => setShowLogoutModal(true) },
          ]}
        />
      </ScrollView>

      {/* Logout Modal */}
      <Modal
  visible={showLogoutModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowLogoutModal(false)}
>
  <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
    <View className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
      <Text className="text-xl font-bold text-gray-900 mb-3 text-center">Log out?</Text>
      <Text className="text-base text-gray-600 mb-6 text-center">
        Are you sure you want to log out from your account?
      </Text>

      <View className="flex-row justify-between">
        <Pressable
          onPress={() => setShowLogoutModal(false)}
          className="flex-1 py-3 mr-2 bg-gray-200 rounded-xl items-center"
        >
          <Text className="text-gray-700 font-semibold">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="flex-1 py-3 ml-2 bg-red-500 rounded-xl items-center"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>
                {userType === 'client' && clientJobPosted && <ClientNav />}
      {userType === 'tradesperson' && <TradespersonNav />}

    </SafeAreaView>
  );
};

export default Index;
