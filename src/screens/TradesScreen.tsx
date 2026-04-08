import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import type { RootStackParamList } from '../navigation/types';
import { trades } from '../constants/trades';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function TradesScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-border flex-row items-center border-b px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3" activeOpacity={0.7}>
          <ArrowLeft size={20} color="#0F1729" />
        </TouchableOpacity>
        <Text className="text-foreground text-xl font-semibold">All Trades</Text>
      </View>
      <FlatList
        data={trades}
        keyExtractor={(item) => item.slug}
        contentContainerClassName="px-4 py-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border-border flex-row items-center justify-between border-b py-4"
            onPress={() =>
              navigation.navigate('TradeDetail', {
                serviceSlug: item.serviceSlug,
                tradeSlug: item.slug,
              })
            }
            activeOpacity={0.7}>
            <View className="flex-1">
              <Text className="text-foreground text-lg">{item.name}</Text>
              <Text className="text-muted-foreground mt-0.5 text-sm">{item.serviceSlug}</Text>
            </View>
            <ChevronRight size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
