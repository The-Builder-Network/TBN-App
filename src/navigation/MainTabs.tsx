import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import type { MainTabParamList } from './types';

// Tab Stacks
import HomeStackNavigator from './stacks/HomeStack';
import PostJobStackNavigator from './stacks/PostJobStack';
import ServicesStackNavigator from './stacks/ServicesStack';
import DashboardStackNavigator from './stacks/DashboardStack';
import ProfileStackNavigator from './stacks/ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

// SVG-free icons using text emoji or simple unicode
function TabIcon({ icon, focused, label }: { icon: string; focused: boolean; label: string }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIconText, { opacity: focused ? 1 : 0.5 }]}>{icon}</Text>
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? Colors.primary : Colors.tabBarInactive },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 8 },
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} label="Home" />,
        }}
      />
      <Tab.Screen
        name="PostJobTab"
        component={PostJobStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="＋" focused={focused} label="Post Job" />,
        }}
      />
      <Tab.Screen
        name="ServicesTab"
        component={ServicesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔧" focused={focused} label="Services" />,
        }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="💼" focused={focused} label="Dashboard" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} label="Profile" />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.tabBarBorder,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 80 : 64,
    paddingTop: 8,
    elevation: 8,
    shadowColor: Colors.foreground,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabIconText: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: Fonts.medium,
  },
});
