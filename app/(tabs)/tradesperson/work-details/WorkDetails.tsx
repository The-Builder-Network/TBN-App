import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const professionOptions = [
  'Builder', 'Electrician', 'Handyman', 'Painter & Decorator', 'Plasterer', 'Plumber',
  'Roofer', 'Carpenter & Joiner', 'Landscaper', 'Bathroom Fitter', 'Bricklayer', 'Gas Engineer',
  'Carpet Fitter', 'Kitchen Fitter', 'Cabinet Maker', 'Tiler', 'Door Fitter', 'Glazier',
  'Stove Fitter', 'Window Fitter', 'Tree Surgeon', 'Gardener', 'Locksmith', 'Architectural Designer',
].map((prof) => ({ label: prof, value: prof }));

const WorkDetails = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [items, setItems] = useState(professionOptions);

  const handleContinue = () => {
    if (selected.length !== 5) {
      Alert.alert('Incomplete', 'Please select exactly 5 professions to continue.');
      return;
    }
      router.push({
    pathname: '/(tabs)/tradesperson/work-details/WorkDetailsStep1',
  });
};

    // Save selections or send to backend here

    // Navigate to main app

    const handleBack = () => {
      router.push('/(tabs)');
    };

  return (
    <SafeAreaView className="flex-1 bg-primary p-6">
              <TouchableOpacity onPress={handleBack} className="mb-4">
                <Ionicons name="arrow-back" size={24} color="#1f2937" />
              </TouchableOpacity>
      <Text className="text-2xl font-bold text-gray-800 mb-4">Select 5 Professions</Text>

      <DropDownPicker
        open={open}
        value={selected}
        items={items}
        setOpen={setOpen}
        setValue={setSelected}
        setItems={setItems}
        multiple={true}
        min={0}
        max={5}
        placeholder="Select up to 5 professions"
        searchable={true}
        searchPlaceholder="Search profession..."
        mode="BADGE"
        badgeDotColors={['#007bff']}
        style={{ marginBottom: open ? 180 : 20 }}
      />

      <TouchableOpacity
        onPress={handleContinue}
        className="mt-6 bg-blue-700 py-3 rounded-lg"
      >
        <Text className="text-center text-white font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkDetails;
