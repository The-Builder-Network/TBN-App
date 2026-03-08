import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LightLogo from './LightLogo'; // adjust path if needed

type AppHeaderProps = {
  onBackPress: () => void;
};

export default function AppHeader({ onBackPress }: AppHeaderProps) {
  return (
    <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-200">
      {/* Back Arrow */}
      <TouchableOpacity onPress={onBackPress} className="mr-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo and Title container with flex */}
      <View className="flex-row items-center flex-1 gap-1">
        <LightLogo />

        {/* Wrapping text in a View to prevent overflow */}
        <View className="flex-shrink ">
          <Text className="text-blue-500 text-xl font-extrabold px-6" numberOfLines={1}>
            THE <Text className="text-blue-500 text-2xl">B</Text>UILDER NETWORK
          </Text>
        </View>
      </View>
    </View>
  );
}
