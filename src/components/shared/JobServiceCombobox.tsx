import React, { useState } from 'react';
import { Text, TouchableOpacity, Modal, FlatList, TextInput, Pressable, View } from 'react-native';
import { ChevronsUpDown, Check } from 'lucide-react-native';
import { services } from '../../constants/services';

interface JobServiceComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const JobServiceCombobox = ({
  value,
  onChange,
  placeholder = 'Select a service...',
}: JobServiceComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedService = services.find((s) => s.slug === value);
  const filtered = services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (slug: string) => {
    onChange(value === slug ? '' : slug);
    setSearch('');
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        className="border-border h-16 flex-1 flex-row items-center justify-between border-b bg-white px-4"
        onPress={() => setOpen(true)}
        activeOpacity={0.85}>
        <Text
          className={`mr-2 flex-1 text-base ${selectedService ? 'text-foreground' : 'text-muted-foreground'}`}
          numberOfLines={1}>
          {selectedService ? selectedService.name : placeholder}
        </Text>
        <ChevronsUpDown size={20} color="#6B7280" />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setSearch('');
          setOpen(false);
        }}
        statusBarTranslucent>
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-6"
          onPress={() => {
            setSearch('');
            setOpen(false);
          }}>
          <Pressable
            className="w-full overflow-hidden rounded-xl bg-white shadow-xl"
            onPress={() => {}}>
            <TextInput
              className="border-border h-14 border-b px-4 font-sans text-base"
              placeholder="Search service..."
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.slug}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 400 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="border-muted flex-row items-center gap-3 border-b px-4 py-4"
                  onPress={() => handleSelect(item.slug)}
                  activeOpacity={0.7}>
                  <View style={{ opacity: value === item.slug ? 1 : 0 }}>
                    <Check size={16} color="#0A68FF" />
                  </View>
                  <Text className="text-foreground text-base">{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text className="text-muted-foreground p-4 text-center text-sm">
                  No service found.
                </Text>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default JobServiceCombobox;
