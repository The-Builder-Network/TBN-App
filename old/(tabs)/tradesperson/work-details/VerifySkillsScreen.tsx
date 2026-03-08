import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { X, Info } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '@/components/AppHeader'

export default function VerifySkillsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <AppHeader onBackPress={() => router.push('/(tabs)/tradesperson/work-details/ReviewIDCardScreen')} />
    <View className="flex-1 bg-primary px-6 pt-5">
      {/* Header */}
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
      <Text className="text-2xl font-bold mb-1">Verify your skills</Text>
      <Text className="text-gray-600 mb-4">~ 5 mins</Text>

      <Text className="text-base text-gray-700 leading-relaxed mb-8">
        The Builder Network supports quality tradespeople.{"\n"}
        In this step, we check the skills of all tradespeople joining, so customers use The Builder Network with confidence.{"\n\n"}
        Our application process is thorough, and only those who meet our high standards are accepted.
      </Text>

      {/* Buttons */}
      <View className="flex-row space-x-4 justify-between">
        <Pressable className="bg-blue-100 px-6 py-3 rounded-lg">
          <Text className="text-blue-500 font-medium">Back</Text>
        </Pressable>
        <Pressable className="bg-blue-600 px-6 py-3 rounded-lg" onPress={() => router.push('/(tabs)/tradesperson/work-details/StrongestSkill')}>
          <Text className="text-white font-medium">Continue</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  )
}
