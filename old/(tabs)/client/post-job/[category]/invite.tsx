import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppStore } from '@/store/useAppStore';
import AppHeader from '@/components/AppHeader';

const dummyTradespersons = [
  { id: '1', name: 'Alice Builder', rating: 4.5, location: 'New York' },
  { id: '2', name: 'Bob Construct', rating: 4.0, location: 'Los Angeles' },
  { id: '3', name: 'Charlie Works', rating: 3.8, location: 'Chicago' },
];

export default function InviteScreen() {
    const setClientJobPosted = useAppStore((state) => state.setClientJobPosted);

    
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  // ✅ Track invited IDs
  const [invitedIds, setInvitedIds] = useState<string[]>([]);

  const iconButtons = [
    {
      name: 'send-outline',
      type: 'Ionicons',
      label: 'Send invites',
      route: '',
    },
    {
      name: 'message1',
      type: 'AntDesign',
      label: 'Get responses',
      route: `/client/post-job/getResponses`,
    },
    {
      name: 'people-outline',
      type: 'Ionicons',
      label: 'Start chats',
      route: '/people',
    },
  ];

  const handleInvite = (id: string, name: string) => {
    if (invitedIds.includes(id)) {
      Alert.alert('Already Invited', `${name} has already been invited.`);
      return;
    }
    setInvitedIds((prev) => [...prev, id]);
    Alert.alert('Invite Sent', `You invited ${name}`);
  };

  const renderIcon = (icon: typeof iconButtons[0]) => {
    const IconComponent = icon.type === 'Ionicons' ? Ionicons : AntDesign;

    return (
      <TouchableOpacity
        key={icon.label}
        onPress={() => icon.route && router.push(icon.route)}
        className="items-center"
      >
        <IconComponent name={icon.name as any} size={24} color="black" />
        <Text className="text-xs text-black mt-1">{icon.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={16} color="#fbbf24" />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-full"
          size={16}
          color="#fbbf24"
        />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <FontAwesome
          key={`empty-${stars.length}`}
          name="star-o"
          size={16}
          color="#fbbf24"
        />
      );
    }

    return <View className="flex-row space-x-1">{stars}</View>;
  };


    const submitJob = () => {
    setClientJobPosted(true);
    router.push('/client/post-job');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <AppHeader onBackPress={() => router.replace('/(tabs)/client/post-job/[category]/client-details')} />

      {/* Content */}
      <View className="flex-1 p-4">
        {/* Icons Row */}
        <View className="flex-row justify-evenly items-center mb-4">
          {iconButtons.map(renderIcon)}
        </View>

        {/* Heading */}
        <Text className="text-2xl font-bold mb-4 text-black">
          Recommended Tradespersons{category ? ` for ${category}` : ''}
        </Text>

        {/* List */}
        <FlatList
          data={dummyTradespersons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const invited = invitedIds.includes(item.id);
            return (
              <View className="bg-white p-4 rounded-xl mb-3">
                <Text className="text-gray-800 text-lg font-semibold mb-1">
                  {item.name}
                </Text>
                <Text className="text-gray-500 text-sm mb-1">
                  📍 {item.location}
                </Text>
                <View className="mb-2">{renderStars(item.rating)}</View>
                <TouchableOpacity
                  onPress={() => handleInvite(item.id, item.name)}
                  disabled={invited}
                  className={`px-4 py-3 rounded-lg ${
                    invited ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                >
                  <Text className="text-white font-medium text-center">
                    {invited ? 'Invited' : 'Send Invite'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        {/* Back to Home Button */}
        <TouchableOpacity
          onPress={submitJob}
          className="bg-black py-4 rounded-xl mt-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
