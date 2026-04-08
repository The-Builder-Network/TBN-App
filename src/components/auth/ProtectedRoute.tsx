import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps a screen's content. If the user is not authenticated,
 * immediately redirects to the Landing screen.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Landing');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
