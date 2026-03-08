// components/TradespersonNav.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TradespersonNav() {
  const router = useRouter();

  return (
    <View className="flex-row justify-around bg-white py-4 border-t border-gray-200">
      {/* Home */}
      <TouchableOpacity onPress={() => router.push('/tradesperson/leads/Newleads')} className="items-center">
        <Ionicons name="home-outline" size={24} color="black" />
        <Text className="text-xs text-black">Home</Text>
      </TouchableOpacity>

      {/* Leads */}
      <TouchableOpacity onPress={() => router.push('/tradesperson/leads/Contact')} className="items-center">
        <Ionicons name="briefcase-outline" size={24} color="black" />
        <Text className="text-xs text-black">Leads</Text>
      </TouchableOpacity>

      {/* Contact */}
       <TouchableOpacity onPress={() => router.push('/tradesperson/leads/ActivityScreen')} className="items-center">
        <Ionicons name="newspaper-outline" size={24} color="black" />
        <Text className="text-xs text-black">Leads</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => router.push('/tradesperson/profile')} className="items-center">
        <Ionicons name="person-outline" size={24} color="black" />
        <Text className="text-xs text-black">Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
