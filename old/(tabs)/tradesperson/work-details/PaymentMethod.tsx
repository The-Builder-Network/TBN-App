import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';
import React from 'react';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const isValid = cardNumber.trim().length >= 12 && expiry.trim().length >= 4 && cvv.trim().length >= 3;

  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/PrePayment')} />
    <ScrollView className="flex-1 bg-primary px-6 pt-5">
      <Text className="text-2xl font-bold mb-2">Add your payment method</Text>
      <Text className="text-base text-gray-700 mb-6">
        You won't be charged in this step. You only pay when a customer shares their contact details
      </Text>

      <Text className="text-lg font-semibold mb-3">Choose payment method</Text>
      <Text className="text-base font-semibold mb-2">Credit card</Text>

      {/* Card Number */}
      <Text className="mb-1 text-gray-800">Card number *</Text>
      <TextInput
        placeholder="•••• •••• •••• ••••"
        keyboardType="numeric"
        maxLength={19}
        value={cardNumber}
        onChangeText={setCardNumber}
        className="bg-white border border-gray-300 rounded-md p-3 mb-4"
      />

      {/* Expiry and CVV */}
      <View className="flex-row justify-between">
        <View className="flex-1 mr-2">
          <Text className="mb-1 text-gray-800">Expiry date *</Text>
          <TextInput
            placeholder="MM/YY"
            keyboardType="numeric"
            value={expiry}
            onChangeText={setExpiry}
            className="bg-white border border-gray-300 rounded-md p-3"
          />
        </View>
        <View className="flex-1 ml-2">
          <Text className="mb-1 text-gray-800">Card security code *</Text>
          <TextInput
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            value={cvv}
            onChangeText={setCvv}
            className="bg-white border border-gray-300 rounded-md p-3"
          />
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="px-5 py-2 border border-blue-400 rounded-md">
          <Text className="text-blue-500 font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isValid}
          onPress={() => router.push('/(tabs)/tradesperson/leads/Newleads')} // Or wherever you go after registration
          className={`px-5 py-2 rounded-md ${isValid ? 'bg-blue-600' : 'bg-blue-300 opacity-60'}`}
        >
          <Text className="text-white font-medium">Save and continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
