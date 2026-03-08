import { View, Text , TouchableOpacity,Pressable, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

const reasons = [
  "I couldn’t find a trades' person on The Builder Network",
  "I found a trades' person elsewhere",
  "I’m going to do the job myself",
  "Job not going ahead",
  "Another reason (please specify)"
];

const closejob = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSelect = (reason: string) => {
    setSelectedReason(reason);
    if (reason !== "Another reason (please specify)") {
      setCustomReason('');
    }
  };
  return (
    <SafeAreaView className="flex-1  bg-primary">
      <View className='flex-1 bg-primary px-2 py-4'>
        {/* Header */}
        <View className='flex-row items-start'>
        <TouchableOpacity onPress={()=>{router.push('/(tabs)/client/my-job')}} className="mr-2 ml-2">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
        </View>
        {/* Title */}
        <Text className='text-2xl font-bold text-gray-800  m-4'>Why are you closing this job?</Text>
        <Text className='text-lg ml-4'> Your feedback helps us make The Builder {'\n'} Network even better</Text>


        {/* Reason Selection */}


        <ScrollView className="flex-1 bg-primary p-4">
      {reasons.map((reason, index) => (
        <Pressable
          key={index}
          onPress={() => handleSelect(reason)}
          className={`border rounded-lg p-4 mb-3 ${
            selectedReason === reason ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'
          }`}
        >
          <Text className="text-gray-800 text-base">{reason}</Text>

          {reason === "Another reason (please specify)" && selectedReason === reason && (
            <TextInput
              placeholder="Type your reason..."
              value={customReason}
              onChangeText={setCustomReason}
              className="mt-2 border border-gray-300 p-2 rounded text-gray-800"
              multiline
            />
          )}
        </Pressable>
      ))}


      {/* Continue Button */}

      <Pressable
        disabled={!selectedReason}
        className={`w-full py-3 rounded-lg mt-2 ${
          selectedReason ? 'bg-blue-500' : 'bg-blue-200'
        }`}
      >
        <Text className="text-center text-white font-semibold">Continue</Text>
      </Pressable>

      {/* Keep Job Open Button */}

      <Pressable className="mt-6">
        <Text className="text-blue-500 text-center font-semibold">Keep job open</Text>
      </Pressable>
    </ScrollView>

      </View>
      </SafeAreaView>

  )
}

export default closejob