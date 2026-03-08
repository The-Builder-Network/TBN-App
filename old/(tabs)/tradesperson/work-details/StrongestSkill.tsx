import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@/components/AppHeader';

const StrongestSkill = () => {
  const { skills } = useLocalSearchParams();
  const [options, setOptions] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  useEffect(() => {
    if (skills) {
      try {
        const parsed = JSON.parse(skills as string);
        setOptions(parsed);
      } catch (e) {
        console.error('Failed to parse skills:', e);
      }
    }
  }, [skills]);

  const handleContinue = () => {
    //if (!selectedSkill) return;
    // Save the strongest skill or move to the next screen
    //console.log('Selected strongest skill:', selectedSkill);
    router.push('/(tabs)/tradesperson/work-details/Qualified'); // Adjust accordingly
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/VerifySkillsScreen')} />
        <View className='flex-1 bg-primary px-6 pt-5 '>
       <View className="flex-row justify-between items-start">
        <Text className="text-2xl font-bold">Safety & Quality</Text>
        <View className="flex-row space-x-4 items-center">

        </View>
      </View>

      {/* Progress Bar */}
      <View className="h-1 bg-gray-200 rounded-full mt-4 mb-6 overflow-hidden">
        <View className="h-1 bg-blue-500 w-3/5" />
      </View>

      {/* Step Label */}
      <Text className="text-sm text-gray-600 font-medium mb-4">Step 3/5</Text>

            {/* Content */}
      <Text className="text-2xl font-bold mb-1">Select your Strongest Skillset</Text>
      <Text >Pass skills evaluations to unlock leads in your areas of expertise.</Text>

      <ScrollView className="space-y-3 mb-6 mt-6 ">
        {options.map((item) => (
          <Pressable
            key={item}
            onPress={() => setSelectedSkill(item)}
            className={`flex-row items-center justify-between border px-4 py-3 rounded-lg mt-3 ${
              selectedSkill === item ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <Text className="text-base text-gray-800">{item}</Text>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedSkill === item ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
              }`}
            />
          </Pressable>
        ))}
      </ScrollView>

      <TouchableOpacity
        //disabled={!selectedSkill}
        onPress={handleContinue}
        className={`py-3 rounded-lg ${
          selectedSkill ? 'bg-blue-700' : 'bg-blue-200'
        }`}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StrongestSkill;
