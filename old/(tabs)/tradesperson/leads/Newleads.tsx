import { View, Text, TextInput, ScrollView, Pressable } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { useAppStore } from '@/store/useAppStore';
import ClientNav from '@/components/ClientNav';
import TradespersonNav from '@/components/TradespersonNav';

const leads = [
  {
    id: '1',
    title: 'Structural engineer',
    category: 'Architecture',
    location: 'Edinburgh (333 miles)',
    time: '1 hr ago',
  },
  {
    id: '2',
    title: 'ser\nver',
    category: 'Architecture',
    location: 'St James, London (0 miles)',
    time: '1 hr ago',
  },
  {
    id: '3',
    title: 'Planning service for Internal alterations and loft conversation.',
    category: 'Architecture',
    location: 'Rom ford (12 miles)',
    time: '4 hr ago',
  },
  {
    id: '4',
    title: 'Loft conversion',
    category: 'Architecture',
    location: 'Coat bridge (344 miles)',
    time: '9 hr ago',
  },
  {
    id: '5',
    title: 'Wall Alteration',
    category: 'Architecture',
    location: 'Eastbound (53 miles)',
    time: '10 hr ago',
  },
  {
    id: '6',
    title: 'Structural review before removing walls',
    category: 'Architecture',
    location: 'Cinder ford (104 miles)',
    time: '11 hr ago',
  },
  {
    id: '7',
    title: 'Small job, small wall removal calculation',
    category: 'Architecture',
    location: 'Birmingham (100 miles)',
    time: '3 days ago',
  },
  {
    id: '8',
    title: 'gar\nage',
    category: 'Architecture',
    location: 'Lipton (108 miles)',
    time: '12 hr ago',
  },
  {
    id: '9',
    title: 'Full plans for custom double garage required',
    category: 'CAD / Drawings',
    location: 'Airdrie (342 miles)',
    time: '1 day ago',
  },
]

export default function HomeScreen() {

  const { userType, clientJobPosted } = useAppStore();

  const [search, setSearch] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='flex-1'>
    <ScrollView className="flex-1 bg-primary px-4 pt-6">
      
      {/* Header */}
      <Text className="text-2xl font-bold text-black mb-4">New leads</Text>

      {/* CTA banner */}
      <View className="bg-blue-600 rounded-xl p-4 mb-5">
        <Text className="text-white font-semibold text-sm">
          Complete your free registration to express interest. Complete now
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center mb-4 gap-2">
        <TextInput
          placeholder="Search by keyword, location, or material"
          value={search}
          onChangeText={setSearch}
          className="flex-1 px-4 py-2 bg-white rounded-xl border border-gray-300"
        />
        <Pressable className="bg-blue-500 px-4 py-2 rounded-xl">
          <Text className="text-white">Search</Text>
        </Pressable>
        <Pressable className="bg-gray-100 p-2 rounded-xl">
          <MaterialIcons name="filter-list" size={20} />
        </Pressable>
      </View>

      {/* Filters */}
      <View className="flex-row gap-3 mb-4">
        <Pressable className="bg-black px-4 py-2 rounded-full">
          <Text className="text-white text-sm">All leads</Text>
        </Pressable>
        <Pressable className="bg-gray-200 px-4 py-2 rounded-full">
          <Text className="text-black text-sm">Low Competition</Text>
        </Pressable>
      </View>

      {/* Job Cards */}
      {leads.map((lead) => (
        <View
          key={lead.id}
          className="bg-white border-l-4 border-blue-300 rounded-r-xl p-4 mb-3"
        >
          <Text className="text-blue-700 font-semibold mb-1">{lead.title}</Text>
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="construct-outline" size={14} />
            <Text className="text-gray-600 text-sm">{lead.category}</Text>
            <Ionicons name="location-outline" size={14} />
            <Text className="text-gray-600 text-sm">{lead.location}</Text>
            <Ionicons name="time-outline" size={14} />
            <Text className="text-gray-600 text-sm">{lead.time}</Text>
          </View>
        </View>
      ))}




    </ScrollView>
                {userType === 'client' && clientJobPosted && <ClientNav />}
      {userType === 'tradesperson' && <TradespersonNav />}
    </View>
    </SafeAreaView>
  )
}
