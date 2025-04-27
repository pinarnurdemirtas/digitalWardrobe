import React from 'react';
import { Box, Pressable, Input, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoryClothSelector({ category, selectedCloth, onSelect }) {
  
  // Kategori adına göre ikon belirliyoruz
  const getIconName = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('üst giyim')) return 'tshirt-crew';
    if (name.includes('alt giyim')) return 'run';
    if (name.includes('takım')) return 'hanger';
    if (name.includes('ayakkabı')) return 'shoe-formal';
    if (name.includes('dış giyim')) return 'coat-rack';
    if (name.includes('aksesuar')) return 'bag-personal-outline';
    return 'tshirt-crew';
  };

  return (
    <Box>
      <Text mb={1} color="#054f5c" fontWeight="bold">
        {category.name}
      </Text>
      <Pressable onPress={onSelect}>
        <Input
          isReadOnly
          placeholder={`${category.name} seçiniz`}
          value={selectedCloth?.name || ''}
          borderRadius="xl"
          bg="white"
          _focus={{ borderColor: '#054f5c' }}
          InputLeftElement={
            <Icon
              as={MaterialCommunityIcons}
              name={getIconName(category.name)}
              size={6}
              ml="2"
              color="#054f5c"
            />
          }
        />
      </Pressable>
    </Box>
  );
}
