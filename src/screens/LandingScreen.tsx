import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import JobServiceCombobox from '../components/shared/JobServiceCombobox';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const TYPING_WORDS = [
  'tradesperson.',
  'builder.',
  'plumber.',
  'roofer.',
  'carpenter.',
  'gardener.',
  'painter.',
  'bricklayer.',
];

export default function LandingScreen() {
  const navigation = useNavigation<NavProp>();
  const [selectedService, setSelectedService] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const handleSubmit = () => {
    if (selectedService) {
      navigation.navigate('PostJob', { service: selectedService });
    }
  };

  return (
    <SafeAreaView className="bg-foreground flex flex-1" edges={['top']}>
      {/* <View className="flex-row items-center justify-start bg-foreground py-4">
        
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="min-h-full max-h-screen flex flex-col justify-center bg-background px-6 py-12">
        <View className="mb-14">
          <Image
            source={require('../../assets/favicons/logo-icon.png')}
            resizeMode="contain"
            className="mb-6 relative -left-1.5"
            style={{ width: 50, height: 50 }}
          />
          <Text className="text-foreground text-5xl font-bold leading-[60px]">The reliable</Text>
          <Text className="text-foreground text-5xl font-bold leading-[60px]">way to hire a</Text>

          <View className="mt-0 flex-row items-center" >
            <Text className="text-primary text-5xl font-bold min-h-[60px] leading-[60px]">{displayText}</Text>
            <Text className="text-primary/70 text-5xl font-bold">|</Text>
          </View>
        </View>

        <View className="">
          <Text className="text-foreground mb-5 text-2xl font-bold">What is your job?</Text>

          <View className="mb-1 flex-row items-center">
            <JobServiceCombobox
              value={selectedService}
              onChange={setSelectedService}
              placeholder="Cleaning Services"
            />
            <TouchableOpacity
              className={`bg-primary border-background/70 h-full w-14 items-center justify-center rounded-r-md border ${
                !selectedService ? 'opacity-50' : ''
              }`}
              onPress={handleSubmit}
              disabled={!selectedService}
              activeOpacity={0.85}>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-8 mt-14 flex-row items-center">
          <View className="bg-foreground/40 h-px flex-1" />
          <Text className="text-foreground/80 mx-4 text-base">or</Text>
          <View className="bg-foreground/40 h-px flex-1" />
        </View>

        <TouchableOpacity
          className="bg-primary mb-4 h-14 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}>
          <Text className="text-background text-lg font-medium">Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-foreground h-14 items-center justify-center rounded-xl border"
          onPress={() => navigation.navigate('TradesNetwork')}
          activeOpacity={0.85}>
          <Text className="text-foreground text-lg font-medium">Sign up as a tradesperson</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
