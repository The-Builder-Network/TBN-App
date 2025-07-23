import React from 'react';
import { View, Text, Image } from 'react-native';

interface ProfileAvatarProps {
  name: string;
  imageUrl: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, imageUrl }) => {
  return (
    <View className="flex-row items-center space-x-3">
      <Image
        source={{ uri: imageUrl }}
        className="w-12 h-12 rounded-full"
        resizeMode="cover"
      />
      <Text className="text-base font-semibold text-black dark:text-white">
        {name}
      </Text>
    </View>
  );
};

export default ProfileAvatar;
