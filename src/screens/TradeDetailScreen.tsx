import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp as NavRouteProp } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import type { RootStackParamList } from '../navigation/types';
import { trades } from '../constants/trades';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = NavRouteProp<RootStackParamList, 'TradeDetail'>;

export default function TradeDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const { serviceSlug, tradeSlug } = route.params;
  const trade = trades.find((t) => t.slug === tradeSlug && t.serviceSlug === serviceSlug);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-border flex-row items-center border-b px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3" activeOpacity={0.7}>
          <ArrowLeft size={20} color="#0F1729" />
        </TouchableOpacity>
        <Text className="text-foreground text-xl font-semibold" numberOfLines={1}>
          {trade?.name ?? tradeSlug}
        </Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full max-h-screen flex flex-col justify-center bg-background px-6 py-12">
        <Text className="text-foreground mb-2 text-3xl font-bold">
          {trade?.title ?? trade?.name}
        </Text>
        {trade?.description ? (
          <Text className="text-muted-foreground mb-6 text-lg leading-7">{trade.description}</Text>
        ) : null}
        <TouchableOpacity
          className="bg-primary h-14 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('PostJob', { service: serviceSlug })}
          activeOpacity={0.85}>
          <Text className="text-lg font-medium text-white">Post a Job</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
