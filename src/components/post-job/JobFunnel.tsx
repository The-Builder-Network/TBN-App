import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import type { QuestionNode, AnswerValue, Answers, HistoryEntry } from '../../types/post-job';
import QuestionRenderer from './QuestionRenderer';

interface JobFunnelProps {
  rootNode: QuestionNode;
  serviceName: string;
  onBackToServices: () => void;
  initialPostcode?: string;
}

const JobFunnel = ({
  rootNode,
  serviceName,
  onBackToServices,
  initialPostcode = '',
}: JobFunnelProps) => {
  const [currentNode, setCurrentNode] = useState<QuestionNode>(rootNode);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setCurrentNode(rootNode);
    setHistory([]);
    setAnswers({});
    setIsComplete(false);
  }, [rootNode]);

  const totalSteps = useMemo(() => {
    const maxDepth = countMaxDepth(rootNode);
    return 1 + maxDepth;
  }, [rootNode]);

  const currentStep = 2 + history.length;
  const progress = Math.min(((currentStep - 1) / Math.max(totalSteps - 1, 1)) * 100, 95);
  const progressPercent = Math.round(progress);

  const resolveNext = useCallback(
    (node: QuestionNode, answer: AnswerValue): QuestionNode | null => {
      if (node.type === 'SelectQuestion' && node.options && typeof answer === 'string') {
        const selectedOption = node.options.find((o) => o.id === answer);
        if (selectedOption?.next) return selectedOption.next;
      }
      if (node.next) return node.next;
      return null;
    },
    []
  );

  const handleNext = useCallback(
    (answer: AnswerValue) => {
      const finalAnswers = { ...answers, [currentNode.id]: answer };
      setAnswers(finalAnswers);

      const nextNode = resolveNext(currentNode, answer);
      if (nextNode) {
        setHistory((prev) => [...prev, { node: currentNode, answer }]);
        setCurrentNode(nextNode);
      } else {
        // End of funnel
        console.log('Job funnel complete!', finalAnswers);
        setIsComplete(true);
      }
    },
    [currentNode, answers, resolveNext]
  );

  const handleBack = useCallback(() => {
    if (history.length === 0) {
      onBackToServices();
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev.node);
    setIsComplete(false);
  }, [history, onBackToServices]);

  if (isComplete) {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="text-4xl">🎉</Text>
        <Text className="text-foreground text-center text-2xl font-bold">Job posted!</Text>
        <Text className="text-muted-foreground text-center text-base">
          Tradespeople in your area will get in touch shortly.
        </Text>
      </View>
    );
  }

  const isPostalCode = currentNode.type === 'PostalCodeQuestion';
  const heading = isPostalCode
    ? 'Get responses from tradespeople near you'
    : `Post a ${serviceName} job`;

  return (
    <View className="h-fit gap-4">
      {/* Header */}
      <Image
        source={require('../../../assets/favicons/logo-icon.png')}
        resizeMode="contain"
        className=" relative -left-1.5 mb-1"
        style={{ width: 40, height: 40 }}
      />
      <View className="gap-2">
        <Text className="text-foreground text-3xl font-bold">{heading}</Text>
      </View>
    
      <View className="mb-2 gap-1.5">
        <Text className="text-muted-foreground text-right text-sm font-medium">
          {progressPercent}%
        </Text>

        <View className="bg-muted h-2 overflow-hidden rounded-full">
          <View className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
        </View>
      </View>

      <QuestionRenderer
        key={currentNode.id}
        node={currentNode}
        initialAnswer={
          answers[currentNode.id] ??
          (currentNode.type === 'PostalCodeQuestion' && initialPostcode
            ? initialPostcode
            : undefined)
        }
        onNext={handleNext}
        onBack={handleBack}
      />
    </View>
  );
};

export default JobFunnel;

function countMaxDepth(node: QuestionNode | undefined, seen = new Set<string>()): number {
  if (!node || seen.has(node.id)) return 0;
  seen.add(node.id);
  let maxChild = 0;
  if (node.options) {
    for (const opt of node.options) {
      if (opt.next) {
        maxChild = Math.max(maxChild, countMaxDepth(opt.next, new Set(seen)));
      }
    }
  }
  if (node.next) {
    maxChild = Math.max(maxChild, countMaxDepth(node.next, new Set(seen)));
  }
  return 1 + maxChild;
}
