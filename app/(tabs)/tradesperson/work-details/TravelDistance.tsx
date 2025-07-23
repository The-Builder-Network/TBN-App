import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { WebView } from 'react-native-webview';

import AppHeader from '@/components/AppHeader';

const { width, height } = Dimensions.get('window');

const TravelDistance = () => {
  const [distance, setDistance] = useState(15); // in miles
  const [workEverywhere, setWorkEverywhere] = useState(false);
  const [location, setLocation] = useState('');

  const googleMapsUrl = `https://www.google.com/maps/@12.9716,77.5946,12z`;
  const handleContinue = () => {
    router.push({
  pathname: '/(tabs)/tradesperson/work-details/IDCheckScreen',
  // params: { skills }, // just pass the same param if needed
});
    // TODO: Pass required params if needed
  };

  const handleBack = () => {
    router.push('/(tabs)/tradesperson/work-details/WorkDetails');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader onBackPress={()=>router.push('/(tabs)/tradesperson/work-details/WorkDetails')} />
      <ScrollView contentContainerStyle={{ padding: 16 }} className='bg-primary'>


        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          How far can you travel for work?
        </Text>
        <Text className="text-base text-gray-600 mb-4">
          Set the maximum distance you are willing to travel from your location.
        </Text>

        {/* Location Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-1">Your Location</Text>
          <TextInput
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white"
            placeholder="Enter your current location"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Distance Slider */}
        <View className="mb-4">
          <Text className="text-blue-600 font-semibold mb-1">
            438 leads in your work area
          </Text>
          <Slider
            style={{ width: width - 60, height: 60 }}
            minimumValue={5}
            maximumValue={50}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#1e40af"
            maximumTrackTintColor="#d1d5db"
          />
          <Text className="text-sm text-gray-700 mt-1">{distance} miles</Text>
        </View>

        {/* Map */}
        <View className="mb-4" style={{ height: 200, borderRadius: 8, overflow: 'hidden' }}>
          <WebView source={{ uri: googleMapsUrl }} style={{ flex: 1 }} />
        </View>

        {/* Work Everywhere Switch */}
        <View className="flex-row items-center mb-6">
          <Switch
            value={workEverywhere}
            onValueChange={setWorkEverywhere}
            thumbColor={workEverywhere ? '#2563eb' : '#ccc'}
          />
          <Text className="ml-2 text-gray-800">I work throughout the area</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          className="bg-blue-700 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TravelDistance;
