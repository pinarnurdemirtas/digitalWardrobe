import React from 'react';
import { Box, HStack, VStack, Pressable, Text, Icon, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

// 2'li grid şeklinde kıyafet fotoğraflarını render eder
const renderClothesGrid = (clothes) => {
  const rows = [];
  for (let i = 0; i < clothes.length; i += 2) {
    rows.push(clothes.slice(i, i + 2));
  }
  return (
    <VStack space={1}>
      {rows.map((row, rowIndex) => (
        <HStack key={rowIndex} space={1}>
          {row.map((cloth, index) => (
            <Image
              key={`${rowIndex}-${index}`}
              source={{ uri: cloth.image_url }}
              alt={cloth.name}
              width={60}
              height={60}
              borderRadius="md"
              resizeMode="cover"
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

// Tek bir favori kombin kartı
export default function FavoriteOutfitCard({ outfit, onPress, onUnfavorite }) {
  return (
    <Pressable onPress={onPress}>
      <Box bg="white" borderRadius="xl" shadow={2} p={4}>
        <HStack space={4} alignItems="center">
          {renderClothesGrid(outfit.clothes)}
          <VStack flex={1}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold" color="#054f5c">
                {outfit.name || `Kombin #${outfit.id}`}
              </Text>
              <Pressable onPress={onUnfavorite}>
                <Icon as={MaterialIcons} name="favorite" color="red.500" size="6" />
              </Pressable>
            </HStack>
            <Text color="gray.500" fontSize="xs">
              Tarihi: {new Date(outfit.createdAt).toLocaleDateString('tr-TR')}
            </Text>
            <Text color="gray.500" fontSize="xs">
              Saat: {new Date(outfit.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}
