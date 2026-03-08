import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import AppHeader from '@/components/AppHeader';


import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';


// ✅ Correct import – adjust if using default export
import { jobCategories } from '@/constants/JobCategory'; 


export default function PostJobScreen() {

  const { userType, clientJobPosted } = useAppStore();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Safe fallback to prevent map crash
  const items = Object.keys(jobCategories).map((job) => ({
    label: job,
    value: job,
  }));

  return (
    <SafeAreaView className="flex-1 bg-primary mb-2">
      {/* Header */}
      <AppHeader onBackPress={()=>router.push('/(tabs)')} />

      {/* Body Content */}
      <View className="flex-1 px-6 pt-10">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold mb-3 text-gray-800">Post a Job</Text>
          <Text className="text-lg text-gray-700 mb-6">
            Get responses from The Builder{"\n"}
            Network's screened and reviewed{"\n"}
            Tradespeople near you
          </Text>

          <Text className="text-base font-bold text-gray-600 mb-2">
            What would you like to have done?
          </Text>

          <DropDownPicker
  open={open}
  value={value}
  items={Object.keys(jobCategories).map((job) => ({
    label: job,
    value: job,
  }))}
  setOpen={setOpen}
  setValue={setValue}
  placeholder="Choose a job category"
  style={{ borderColor: '#ccc', zIndex: 1000 }}
  dropDownContainerStyle={{ borderColor: '#ccc', zIndex: 999 }}
  textStyle={{ fontSize: 16 }}
/>

        </View>
      </View>

      {/* Bottom Button */}
      {value && (
        <View className="absolute bottom-6 left-0 right-0 px-6">
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/client/post-job/${encodeURIComponent(value)}`)}
            className="bg-blue-600 py-3 rounded-xl"
          >
            <Text className="text-white text-base font-medium text-center">Next</Text>
          </TouchableOpacity>
                            {userType === 'client' &&  <ClientNav />}
          {userType === 'tradesperson' && <TradespersonNav />}
        </View>)}

      
    </SafeAreaView>
  );
}
