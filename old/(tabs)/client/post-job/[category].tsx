import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { jobCategories } from '@/constants/JobCategory';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';

export default function JobDetails() {
  const { category } = useLocalSearchParams();
  const job = Array.isArray(category) ? category[0] : category;
  const router = useRouter();

  const [steps, setSteps] = useState<any[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [customWork, setCustomWork] = useState(''); // New: specific work input

  // Reset steps and selections when category/job changes
  useEffect(() => {
    const followUp = jobCategories[job];
    if (followUp) {
      setSteps([followUp]);
      setSelections([]);
    } else {
      setSteps([]);
      setSelections([]);
    }
  }, [job]);

  const handleOptionSelect = (stepIndex: number, option: any) => {
    const label = typeof option === 'string' ? option : option.label;

    const newSelections = [...selections];
    newSelections[stepIndex] = label;
    setSelections(newSelections);

    setSteps(prev => prev.slice(0, stepIndex + 1));
    if (option.next) {
      setSteps(prev => [...prev.slice(0, stepIndex + 1), option.next]);
    }
  };

  const handleBack = () => {
    if (steps.length > 1) {
      setSteps(prev => prev.slice(0, -1));
      setSelections(prev => prev.slice(0, -1));
    } else {
      router.push('/client/post-job');
    }
  };

  const handleNext = () => {
    // You can pass customWork as needed, e.g., via router params or context
    router.push(`/client/post-job/${job}/work-area`);
  };

  const followUp = jobCategories[job];
  const allQuestionsAnswered =
    steps.length === selections.length &&
    !steps[steps.length - 1]?.options?.find((opt: any) => opt.next);

  if (!followUp) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-center text-gray-500">
          No follow-up questions available for "{job}"
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <View className="flex-1 bg-white ">
        {/* Header */}
        <AppHeader onBackPress={() => router.push('/(tabs)/client/post-job')} />

        {/* Content */}
        <ScrollView className="bg-primary" contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text className="text-2xl font-bold text-gray-800 mb-5 mt-5">Post an {job} job</Text>
          <Text className="text-lg text-gray-700 mb-6">
            Get responses from The Builder{'\n'}
            Network's screened {'\n'} and reviewed tradesperson near you
          </Text>

          {steps.map((step, index) => {
            const selected = selections[index];

            return (
              <View key={index} className="mb-6">
                <Text className="text-lg font-semibold mb-4">{step.question}</Text>
                {step.options.map((option: any, optIndex: number) => {
                  const label = typeof option === 'string' ? option : option.label;
                  const isSelected = selected === label;

                  return (
                    <TouchableOpacity
                      key={optIndex}
                      onPress={() => handleOptionSelect(index, option)}
                      className={`mb-3 p-4 rounded-lg border ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <Text className="text-gray-800">{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}

          {/* Specific Work Input */}
          {allQuestionsAnswered && (
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-3">Any specific work details?</Text>
              <TextInput
                placeholder="Describe the specific task, problem, or details"
                value={customWork}
                onChangeText={setCustomWork}
                multiline
                numberOfLines={4}
                className="bg-white border border-gray-300 rounded-xl p-4 text-gray-800"
                style={{ textAlignVertical: 'top' }}
              />
            </View>
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="flex-row justify-between items-center px-6 py-4 bg-white border-t border-gray-200">
          <TouchableOpacity onPress={handleBack} className="flex-1 mr-2 bg-gray-200 py-3 rounded-xl">
            <Text className="text-center text-gray-800 font-medium">Back</Text>
          </TouchableOpacity>

          {allQuestionsAnswered && (
            <TouchableOpacity onPress={handleNext} className="flex-1 ml-2 bg-blue-600 py-3 rounded-xl">
              <Text className="text-center text-white font-medium">Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
// This code is a React Native component that allows users to post a job by answering a series of questions.