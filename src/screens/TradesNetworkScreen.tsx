import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import JobServiceCombobox from '../components/shared/JobServiceCombobox';
import PostcodeInput from '../components/shared/PostcodeInput';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TradesNetworkScreen() {
  const navigation = useNavigation<NavProp>();
  const [selectedTrade, setSelectedTrade] = useState('');
  const [postcode, setPostcode] = useState('');
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = EMAIL_REGEX.test(email.trim());
  const emailError = emailTouched && !emailValid && email.length > 0;
  const canSubmit = !!selectedTrade && postcodeValid && emailValid;

  const handleSubmit = () => {
    if (!canSubmit) return;
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="min-h-full max-h-screen flex flex-col justify-center bg-background px-6 py-12">
        <Image
          source={require('../../assets/logo-black.png')}
          style={{ height: 38, width: 152 }}
          resizeMode="contain"
          className="mb-6"
        />

        <View className="mb-8 gap-2">
          <Text className="text-foreground text-5xl font-bold leading-[56px]">
            The reliable way to get
          </Text>
          <Text className="text-foreground text-5xl font-bold leading-[56px]">
            the work you want
          </Text>
          <Text className="text-muted-foreground mt-2 text-lg">
            View local trade work and start receiving quality leads.
          </Text>
        </View>

        <View className="border-border shadow-card gap-4 rounded-2xl border bg-white p-5">
          <Text className="text-foreground text-3xl font-bold">View local trade work</Text>

          <View className="gap-2">
            <Text className="text-foreground text-base font-medium">
              Your main trade <Text className="text-destructive">*</Text>
            </Text>
            <JobServiceCombobox
              value={selectedTrade}
              onChange={setSelectedTrade}
              placeholder="Select your trade"
            />
          </View>

          <View className="gap-2">
            <Text className="text-foreground text-base font-medium">
              Postcode <Text className="text-destructive">*</Text>
            </Text>
            <PostcodeInput
              value={postcode}
              onChange={setPostcode}
              onValidationChange={setPostcodeValid}
              placeholder="e.g. EX37 9HW"
            />
          </View>

          <View className="gap-2">
            <Text className="text-foreground text-base font-medium">
              Email to receive leads <Text className="text-destructive">*</Text>
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setEmailTouched(true)}
              placeholder="Your email to receive leads"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              className={`text-foreground h-16 rounded-xl border bg-white px-4 font-sans text-lg ${
                emailError ? 'border-destructive' : 'border-border'
              }`}
              placeholderTextColor="#6B7280"
            />
            {emailError ? (
              <Text className="text-destructive text-sm">Please enter a valid email address</Text>
            ) : null}
          </View>

          <TouchableOpacity
            className={`bg-primary h-14 items-center justify-center rounded-xl ${!canSubmit ? 'opacity-50' : ''}`}
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.85}>
            <Text className="text-xl font-medium text-white">Sign up for free</Text>
          </TouchableOpacity>

          <Text className="text-muted-foreground text-sm leading-5">
            By clicking Sign up for free, you agree to The Builder Network Terms and Conditions and
            Privacy Policy.
          </Text>
        </View>

        <View className="mb-8 mt-12 flex-row items-center">
          <View className="bg-foreground/30 h-px flex-1" />
          <Text className="text-foreground/70 mx-4 text-lg">or</Text>
          <View className="bg-foreground/30 h-px flex-1" />
        </View>

        <TouchableOpacity
          className="bg-primary mb-4 h-14 items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}>
          <Text className="text-xl font-medium text-white">Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-foreground h-14 items-center justify-center rounded-xl border"
          onPress={() => navigation.navigate('PostJob', {})}
          activeOpacity={0.85}>
          <Text className="text-foreground text-xl font-medium">Post a job</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
