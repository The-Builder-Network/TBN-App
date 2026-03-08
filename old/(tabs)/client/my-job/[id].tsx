import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

const dummyJobs = {
  '1': {
    title: 'Leaking Pipe Repair',
    category: 'Plumbing',
    option: 'Fix leaking pipe',
    description: 'Need to fix a leaking pipe under the kitchen sink.',
    location: {
      state: 'Karnataka',
      district: 'Dakshina Kannada',
      area: 'Mangalore',
    },
    datePosted: 'April 20, 2025',
    invitesSent: ['Alice Builder', 'Bob Construct'],
  },
  '2': {
    title: 'Ceiling Fan Installation',
    category: 'Electrical',
    option: 'Install ceiling fan',
    description: 'Looking to install a new ceiling fan in the living room.',
    location: {
      state: 'Kerala',
      district: 'Ernakulam',
      area: 'Kochi',
    },
    datePosted: 'April 25, 2025',
    invitesSent: ['Charlie Works'],
  },
};

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const job = dummyJobs[id ?? ''];

  if (!job) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Job not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b bg-primary">
      <View className="flex-1 bg-primary p-6">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/client/my-job')} className="mb-4 flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 mb-4">Job Details</Text>

        {/* Edit and Close Buttons */}
        <View className="flex-row justify-start gap-3 mb-4">
          <TouchableOpacity className="bg-gray-500 p-3 rounded-lg"
          onPress={() => router.push(`/client/my-job/EditJob?id=${id}`)}>
            <Text className="text-white text-center font-semibold">Edit Job</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border p-3 rounded-lg"
            onPress={() => router.push('/(tabs)/client/my-job/CloseJob')}
          >
            <Text className="text-black text-center font-semibold">Close Job</Text>
          </TouchableOpacity>
        </View>

        {/* Job Info */}
        <View className="bg-blue-100 mb-4 p-5 rounded-lg">
          <TouchableOpacity onPress={() => router.push(`/(tabs)/client/post-job/getResponses`)}>
          <View className="flex-row items-center m-2">
            <FontAwesome name="commenting-o" size={16} color="#1f2937" />
            <Text className="text-sm text-gray-800 ml-2 underline">0 responses</Text>
          </View>
          </TouchableOpacity>

          <View className="flex-row items-center m-2">
            <MaterialIcons name="date-range" size={16} color="#1f2937" />
            <Text className="text-sm text-gray-800 ml-2">{job.datePosted}</Text>
          </View>

          <View className="flex-row items-center m-2">
            <Entypo name="location-pin" size={16} color="#1f2937" />
            <Text className="text-sm text-gray-800 ml-2">
              {job.location.area}, {job.location.district}, {job.location.state}
            </Text>
          </View>
        </View>

        {/* Job Description */}
        <Text className="text-lg font-semibold mb-3">Job description</Text>
        <View className="bg-gray-100 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-gray-800">{job.title}</Text>
          <Text className="text-gray-700 mt-1">{job.description}</Text>
          <Text className="text-gray-700 mt-1">Category: {job.category}</Text>
          <Text className="text-gray-700 mt-1">Work: {job.option}</Text>
          <Text className="text-gray-700 mt-1">Invites Sent: {job.invitesSent.join(', ')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
