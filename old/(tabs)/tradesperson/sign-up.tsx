import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [marketing, setMarketing] = useState(false);

  const handleContinue = async () => {
    if (!firstName || !lastName || !phone || password.length < 6) {
      Alert.alert('Validation Error', 'Please fill all fields correctly.');
      return;
    }

    try {
      await AsyncStorage.setItem('userRole', 'tradesperson');
      await AsyncStorage.setItem('userFirstName', firstName);
      await AsyncStorage.setItem('userLastName', lastName);
      await AsyncStorage.setItem('userPhone', phone);
      await AsyncStorage.setItem('userMarketingOptIn', JSON.stringify(marketing));

      router.push('/tradesperson/work-details/WorkDetails');
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-700">
      <AppHeader onBackPress={() => router.back()} />
      <View className="flex-1 px-6 pt-10">
        <Text className="font-semibold text-3xl text-white text-center mb-6">
          The Reliable way to get {'\n'} work you want
        </Text>

        <View className="bg-blue-300 p-6 rounded-lg">
          <Text className="text-xl font-semibold text-gray-800 mb-3">
            Sign Up as Tradesperson
          </Text>

          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            className="bg-white p-3 rounded-lg mb-3"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            className="bg-white p-3 rounded-lg mb-3"
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="bg-white p-3 rounded-lg mb-3"
          />
          <TextInput
            placeholder="Password (min. 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-white p-3 rounded-lg mb-3"
          />

          <View className="flex-row items-center mb-4">
            <Checkbox
              value={marketing}
              onValueChange={setMarketing}
              color={marketing ? '#1e40af' : undefined}
            />
            <Text className="ml-2 text-gray-700">
              I would like to receive marketing communication
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            className="bg-blue-800 py-3 rounded-lg"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
