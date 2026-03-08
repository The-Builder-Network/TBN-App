import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../../screens/ServicesScreen';
import TradesScreen from '../../screens/TradesScreen';
import ServiceDetailScreen from '../../screens/ServiceDetailScreen';
import TradeDetailScreen from '../../screens/TradeDetailScreen';
import TradespersonPublicProfileScreen from '../../screens/TradespersonPublicProfileScreen';

export type ServicesStackParamList = {
  ServicesHome: undefined;
  TradesAll: undefined;
  ServiceDetail: { slug: string };
  TradeDetail: { slug: string; serviceSlug: string };
  TradespersonPublicProfile: { username: string };
};

const Stack = createNativeStackNavigator<ServicesStackParamList>();

export default function ServicesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServicesHome" component={ServicesScreen} />
      <Stack.Screen name="TradesAll" component={TradesScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="TradeDetail" component={TradeDetailScreen} />
      <Stack.Screen name="TradespersonPublicProfile" component={TradespersonPublicProfileScreen} />
    </Stack.Navigator>
  );
}
