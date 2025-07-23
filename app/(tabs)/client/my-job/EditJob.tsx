import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
  },
};

export default function EditJob() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const job = dummyJobs[id ?? ''];

  const [title, setTitle] = useState(job?.title || '');
  const [category, setCategory] = useState(job?.category || '');
  const [option, setOption] = useState(job?.option || '');
  const [description, setDescription] = useState(job?.description || '');
  const [state, setState] = useState(job?.location.state || '');
  const [district, setDistrict] = useState(job?.location.district || '');
  const [area, setArea] = useState(job?.location.area || '');

  const handleSave = () => {
    if (!title || !category || !option || !description || !state || !district || !area) {
      Alert.alert('All fields are required');
      return;
    }

    // Normally here you'd send a PATCH/PUT request to backend with job update

    Alert.alert('Job updated successfully!');
    router.push(`/client/my-job/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
                <View className='flex-row items-start'>
        <TouchableOpacity onPress={()=>{router.push('/(tabs)/client/my-job')}} className="mr-2 ml-2">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-bold mb-4 text-gray-800">Edit Job</Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="Work Option"
          value={option}
          onChangeText={setOption}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="District"
          value={district}
          onChangeText={setDistrict}
          className="border p-3 mb-4 rounded-lg"
        />

        <TextInput
          placeholder="Area"
          value={area}
          onChangeText={setArea}
          className="border p-3 mb-4 rounded-lg"
        />

        <TouchableOpacity onPress={handleSave} className="bg-blue-600 p-4 rounded-lg mt-6">
          <Text className="text-white font-bold text-center">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
