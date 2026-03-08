// 

// import { Tabs } from 'expo-router';
// import { useAppStore } from '@/store/useAppStore';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import { Flag } from 'lucide-react-native';

// export default function TabsLayout() {
//   const userType = useAppStore((state) => state.userType);

//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       {/* Common tabs */}
//       <Tabs.Screen
//         name="home"
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       {userType === 'client' && (
//         <>
//           <Tabs.Screen
//             name="client/post-job"
//             options={{
//               tabBarLabel: 'Post Job',
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="briefcase-outline" size={size} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="client/my-job"
//             options={{
//               tabBarLabel: 'My Jobs',
//               tabBarIcon: ({ color, size }) => (
//                 <FontAwesome name="tasks" size={size} color={color} />
//               ),
//             }}
//           />
//         </>
//       )}

//       {userType === 'tradesperson' && (
//         <>
//           <Tabs.Screen
//             name="tradesperson/leads/Contact"
//             options={{
//               tabBarLabel: 'Job Feed',
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="list" size={size} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="tradesperson/leads/Newleads"
//             options={{
//               tabBarLabel: 'Profile',
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="person-circle-outline" size={size} color={color} />
//               ),
//             }}
//           />
//         </>
//       )}
//     </Tabs>
//   );
// }


import React from 'react';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
