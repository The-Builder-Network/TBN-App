import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';
import { loadQuestionTree } from '../helpers/QuestionTreeHelper';
import { services } from '../constants/services';
import JobServiceCombobox from '../components/shared/JobServiceCombobox';
import JobFunnel from '../components/post-job/JobFunnel';
import type { QuestionNode } from '../types/post-job';

type RoutePropType = RouteProp<RootStackParamList, 'PostJob'>;

export default function PostJobScreen() {
  const route = useRoute<RoutePropType>();

  const initSlug = route.params?.service ?? null;
  const initTree = initSlug ? loadQuestionTree(initSlug) : null;
  const initName = initSlug
    ? (services.find((s) => s.slug === initSlug)?.name ?? initTree?.questionTree?.name ?? '')
    : '';

  const [selectedSlug, setSelectedSlug] = useState<string | null>(initTree ? initSlug : null);
  const [rootNode, setRootNode] = useState<QuestionNode | null>(
    initTree ? initTree.questionTree.schema : null
  );
  const [serviceName, setServiceName] = useState(initTree ? initName : '');
  const [comboValue, setComboValue] = useState(initSlug ?? '');

  const selectService = useCallback((slug: string) => {
    const tree = loadQuestionTree(slug);
    if (!tree) return;
    setSelectedSlug(slug);
    setRootNode(tree.questionTree.schema);
    setServiceName(services.find((s) => s.slug === slug)?.name ?? tree.questionTree.name);
  }, []);

  const handleBackToServices = useCallback(() => {
    setSelectedSlug(null);
    setRootNode(null);
    setServiceName('');
    setComboValue('');
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}

      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full max-h-screen flex flex-col bg-background px-6 py-12"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {rootNode && selectedSlug ? (
          <JobFunnel
            key={selectedSlug}
            rootNode={rootNode}
            serviceName={serviceName}
            onBackToServices={handleBackToServices}
          />
        ) : (
          <ServiceSelector
            comboValue={comboValue}
            setComboValue={setComboValue}
            onSelect={selectService}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ServiceSelector({
  comboValue,
  setComboValue,
  onSelect,
}: {
  comboValue: string;
  setComboValue: (v: string) => void;
  onSelect: (slug: string) => void;
}) {
  const handleChange = (slug: string) => {
    setComboValue(slug);
  };

  return (
    <View className="gap-4 h-fit">
      {/* Title section */}
        <Image
                  source={require('../../assets/favicons/logo-icon.png')}
                  resizeMode="contain"
                  className=" relative -left-1.5 mb-2"
                  style={{ width: 50, height: 50 }}
                />
      <View className="gap-1">
        <Text className="text-foreground text-3xl font-bold">Post a job</Text>
        <Text className="text-muted-foreground text-base mt-2">
          Tell us what you need done and we'll match you with trusted local tradespeople.
        </Text>
      </View>

      {/* Step indicator */}
      <View className="gap-1.5 mb-2">
        <Text className="text-muted-foreground text-right text-sm font-medium">0%</Text>
        <View className="bg-muted h-2 overflow-hidden rounded-full">
          <View className="bg-primary h-2 rounded-full" style={{ width: '2%' }} />
        </View>
      </View>

      {/* Label */}
      <View className="gap-3 mt-2">
        <Text className="text-foreground text-base font-medium">
          What would you like to have done? <Text className="text-destructive">*</Text>
        </Text>

        {/* Combobox + Next */}
        <View className="flex-row items-stretch">
          <JobServiceCombobox
            value={comboValue}
            onChange={handleChange}
            placeholder="Select a service..."
          />
          <TouchableOpacity
            className={`bg-primary h-full w-14 items-center justify-center rounded-r-md border-2 border-primary${!comboValue ? ' opacity-40' : ''}`}
            onPress={() => {
              if (comboValue) onSelect(comboValue);
            }}
            disabled={!comboValue}
            activeOpacity={0.85}>
            <Text className="text-xl font-medium text-white">→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
