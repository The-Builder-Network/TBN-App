import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostJobScreen from '../../screens/PostJobScreen';

export type PostJobStackParamList = {
  PostJob: { serviceSlug?: string } | undefined;
};

const Stack = createNativeStackNavigator<PostJobStackParamList>();

export default function PostJobStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostJob" component={PostJobScreen} />
    </Stack.Navigator>
  );
}
