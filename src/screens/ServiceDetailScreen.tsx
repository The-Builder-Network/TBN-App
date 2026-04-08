import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp as NavRouteProp } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import type { RootStackParamList } from '../navigation/types';
import { services } from '../constants/services';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = NavRouteProp<RootStackParamList, 'ServiceDetail'>;

export default function ServiceDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const { serviceSlug } = route.params;
  const service = services.find((s) => s.slug === serviceSlug);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-border flex-row items-center border-b px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3" activeOpacity={0.7}>
          <ArrowLeft size={20} color="#0F1729" />
        </TouchableOpacity>
        <Text className="text-foreground text-xl font-semibold" numberOfLines={1}>
          {service?.name ?? serviceSlug}
        </Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full max-h-screen flex flex-col justify-center bg-background px-6 py-12">
        <Text className="text-foreground mb-3 text-3xl font-bold">{service?.name}</Text>
        {service?.description ? (
          <Text className="text-muted-foreground text-lg leading-7">{service.description}</Text>
        ) : null}
        <TouchableOpacity
          className="bg-primary mt-8 h-14 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('PostJob', { service: serviceSlug })}
          activeOpacity={0.85}>
          <Text className="text-lg font-medium text-white">Post a Job</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
