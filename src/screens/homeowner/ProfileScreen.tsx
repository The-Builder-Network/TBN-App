import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <ProtectedRoute>
      <SafeAreaView className="flex-1 bg-white">
        <View className="border-border flex-row items-center border-b px-4 py-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
            activeOpacity={0.7}>
            <ArrowLeft size={20} color="#0F1729" />
          </TouchableOpacity>
          <Text className="text-foreground text-xl font-semibold">My Profile</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-foreground mb-2 text-3xl font-bold">Your Profile</Text>
          <Text className="text-muted-foreground text-center text-base">
            Profile management coming soon.
          </Text>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
