import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../screens/DashboardScreen';
import HomeownerMyJobsScreen from '../../screens/homeowner/MyJobsScreen';
import HomeownerJobDetailScreen from '../../screens/homeowner/JobDetailScreen';
import HomeownerMyQuestionsScreen from '../../screens/homeowner/MyQuestionsScreen';
import TradespersonMyLeadsScreen from '../../screens/tradesperson/MyLeadsScreen';
import TradespersonLeadDetailScreen from '../../screens/tradesperson/LeadDetailScreen';

export type DashboardStackParamList = {
  DashboardHome: undefined;
  HomeownerMyJobs: undefined;
  HomeownerJobDetail: { jobId: string };
  HomeownerMyQuestions: undefined;
  TradespersonMyLeads: undefined;
  TradespersonLeadDetail: { leadId: string };
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />
      <Stack.Screen name="HomeownerMyJobs" component={HomeownerMyJobsScreen} />
      <Stack.Screen name="HomeownerJobDetail" component={HomeownerJobDetailScreen} />
      <Stack.Screen name="HomeownerMyQuestions" component={HomeownerMyQuestionsScreen} />
      <Stack.Screen name="TradespersonMyLeads" component={TradespersonMyLeadsScreen} />
      <Stack.Screen name="TradespersonLeadDetail" component={TradespersonLeadDetailScreen} />
    </Stack.Navigator>
  );
}
