import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeownerProfileScreen from '../../screens/homeowner/ProfileScreen';
import TradespersonProfileScreen from '../../screens/tradesperson/ProfileScreen';
import HowItWorksScreen from '../../screens/HowItWorksScreen';
import AboutScreen from '../../screens/AboutScreen';
import CitiesScreen from '../../screens/CitiesScreen';
import BecomeAPartnerScreen from '../../screens/BecomeAPartnerScreen';
import QualityChecksScreen from '../../screens/QualityChecksScreen';
import QuestionsScreen from '../../screens/QuestionsScreen';
import TermsScreen from '../../screens/legal/TermsScreen';
import PrivacyScreen from '../../screens/legal/PrivacyScreen';
import ReviewsPolicyScreen from '../../screens/legal/ReviewsPolicyScreen';
import QualityRequirementsScreen from '../../screens/legal/QualityRequirementsScreen';
import LoginScreen from '../../screens/auth/LoginScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  HomeownerProfile: undefined;
  TradespersonProfile: undefined;
  HowItWorks: undefined;
  About: undefined;
  Cities: undefined;
  BecomeAPartner: undefined;
  QualityChecks: undefined;
  Questions: undefined;
  Terms: undefined;
  Privacy: undefined;
  ReviewsPolicy: undefined;
  QualityRequirements: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="HomeownerProfile" component={HomeownerProfileScreen} />
      <Stack.Screen name="TradespersonProfile" component={TradespersonProfileScreen} />
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Cities" component={CitiesScreen} />
      <Stack.Screen name="BecomeAPartner" component={BecomeAPartnerScreen} />
      <Stack.Screen name="QualityChecks" component={QualityChecksScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="ReviewsPolicy" component={ReviewsPolicyScreen} />
      <Stack.Screen name="QualityRequirements" component={QualityRequirementsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
