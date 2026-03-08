import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View , Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function BalanceScreen() {
    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-primary pt-5 px-6">
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="flex-1 ">
                    <Text className="text-2xl font-bold text-black mb-4">
                        Balance
                    </Text>
                    <Text className="text-xl text-bolds text-black mt-5">
                        1000.00
                    </Text>
                    <Text className="text-base text-gray-500 mt-2">
                        Next invoice due : 15 October 2025
                    </Text>
                    <Text className="text-base text-gray-500 mt-1">
                        Prices include VAT
                    </Text>
                    <Text  className="text-lg text-black mt-3" >
                        Use coupon code
                    </Text>
                    <Text className="text-base mt-5 ">No transaction found</Text>

                </View>
            </View>
        </SafeAreaView>
    )
}