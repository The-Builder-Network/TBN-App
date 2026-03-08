import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import TradesNetworkScreen from '../../screens/TradesNetworkScreen';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export type HomeStackParamList = {
  Home: undefined;
  TradesNetwork: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TradesNetwork" component={TradesNetworkScreen} />
    </Stack.Navigator>
  );
}
