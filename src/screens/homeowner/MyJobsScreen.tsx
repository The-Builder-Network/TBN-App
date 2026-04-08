import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function MyJobsScreen() {
  return (
    <ProtectedRoute>
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-foreground mb-2 text-3xl font-bold">My Jobs</Text>
        <Text className="text-muted-foreground text-center text-lg">
          View and manage your posted jobs — coming soon
        </Text>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
