import React, { useCallback} from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import '@/global.css';

import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const RNText = Text as unknown as { defaultProps?: { style?: unknown } };
RNText.defaultProps = RNText.defaultProps || {};
RNText.defaultProps.style = [RNText.defaultProps.style, { fontFamily: 'SpaceGrotesk_400Regular' }];

const RNTextInput = TextInput as unknown as { defaultProps?: { style?: unknown } };
RNTextInput.defaultProps = RNTextInput.defaultProps || {};
RNTextInput.defaultProps.style = [
  RNTextInput.defaultProps.style,
  { fontFamily: 'SpaceGrotesk_400Regular' },
];

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

// Animated splash: 1s fade-out
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

export default function App() {
  const [appLoaded, appError] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });
  const onLayoutRootView = useCallback(async () => {
    if (appLoaded || appError) {
      await SplashScreen.hideAsync();
    }
  }, [appLoaded, appError]);

  if (!appLoaded && !appError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <StatusBar style="auto" />
              <AppNavigator />
            </View>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
