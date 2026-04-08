import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp as NavRouteProp } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import type { RootStackParamList } from '../../navigation/types';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

type RouteType = NavRouteProp<RootStackParamList, 'HomeownerJobDetail'>;

export default function JobDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteType>();
  const { jobId } = route.params;

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
          <Text className="text-foreground text-xl font-semibold">Job Details</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-foreground mb-2 text-3xl font-bold">Job #{jobId}</Text>
          <Text className="text-muted-foreground text-center text-base">
            Job detail view coming soon.
          </Text>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
