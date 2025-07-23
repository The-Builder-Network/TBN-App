import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-primary'>
        <View className='flex-1 px-6 py-4'>
            <View className='flex-row items-start'>
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
            </View>
            <Text className='text-3xl font-bold text-gray-800 mb-8 mt-3 '>Contact Details</Text>
            <View className="p-4 rounded-lg border border-gray-400">
            <Text className="text-xl font-bold text-gray-800 text-start">
              Verify account to access
            </Text>

            <Text className="text-lg pr-4 text-start mt-2">
              To access your information, please authenticate your account
            </Text>

            <View className="items-center mt-4">
              <TouchableOpacity
                onPress={() => {}}
                className="bg-blue-500 px-24 py-3 rounded-lg"
              >
                <Text className="text-white font-medium">Verify account</Text>
              </TouchableOpacity>
  </View>
</View>

                </View>
    </SafeAreaView>
  )
}

export default index