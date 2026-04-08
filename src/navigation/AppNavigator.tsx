import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

// Public auth screens
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';

// Public info screens
import TradesNetworkScreen from '../screens/TradesNetworkScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import TradesScreen from '../screens/TradesScreen';
import TradeDetailScreen from '../screens/TradeDetailScreen';

// Post job
import PostJobScreen from '../screens/PostJobScreen';

// Homeowner (protected)
import HomeownerProfileScreen from '../screens/homeowner/ProfileScreen';
import HomeownerMyJobsScreen from '../screens/homeowner/MyJobsScreen';
import HomeownerJobDetailScreen from '../screens/homeowner/JobDetailScreen';

// Tradesperson (protected)
import TradespersonMyLeadsScreen from '../screens/tradesperson/MyLeadsScreen';
import TradespersonLeadDetailScreen from '../screens/tradesperson/LeadDetailScreen';
import TradespersonPublicProfileScreen from '../screens/tradesperson/TradespersonPublicProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {/* Public */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TradesNetwork" component={TradesNetworkScreen} />
        <Stack.Screen name="PostJob" component={PostJobScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Trades" component={TradesScreen} />
        <Stack.Screen name="TradeDetail" component={TradeDetailScreen} />

        {/* Homeowner — protected via ProtectedRoute inside component */}
        <Stack.Screen name="HomeownerProfile" component={HomeownerProfileScreen} />
        <Stack.Screen name="HomeownerMyJobs" component={HomeownerMyJobsScreen} />
        <Stack.Screen name="HomeownerJobDetail" component={HomeownerJobDetailScreen} />

        {/* Tradesperson — protected via ProtectedRoute inside component */}
        <Stack.Screen name="TradespersonMyLeads" component={TradespersonMyLeadsScreen} />
        <Stack.Screen name="TradespersonLeadDetail" component={TradespersonLeadDetailScreen} />

        {/* Tradesperson public profile */}
        <Stack.Screen
          name="TradespersonPublicProfile"
          component={TradespersonPublicProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
