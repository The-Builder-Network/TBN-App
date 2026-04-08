import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface AppNavBarProps {
  isTradespersonPage?: boolean;
}

const AppNavBar = ({ isTradespersonPage = false }: AppNavBarProps) => {
  const navigation = useNavigation<NavProp>();

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <TouchableOpacity
        onPress={() => navigation.canGoBack() ? navigation.popToTop() : null}
        activeOpacity={0.8}
      >
        <Image
          source={require('../../../assets/logo-white.png')}
          style={{ height: 36, width: 140 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="px-3 py-2"
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text className="text-sm font-medium text-white">Log in</Text>
        </TouchableOpacity>

        {isTradespersonPage ? (
          <TouchableOpacity
            className="border border-white rounded-md px-3 py-2"
            onPress={() => navigation.navigate('Landing')}
            activeOpacity={0.8}
          >
            <Text className="text-sm font-medium text-white">I'm a customer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="border border-white rounded-md px-3 py-2"
            onPress={() => navigation.navigate('TradesNetwork')}
            activeOpacity={0.8}
          >
            <Text className="text-sm font-medium text-white">Sign up as a tradesperson</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppNavBar;
