import React from 'react';
import { Box, Button, Center, VStack, Icon, ScrollView } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="white" px="6">
        <VStack space={5} w="100%">
          <Button
            bg="#054f5c"
            _text={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
            leftIcon={<Icon as={MaterialIcons} name="search" size={8} color="white" />}
            onPress={() => navigation.navigate('FindOutfit')}
            borderRadius="md"
            py="5"
          >
            Find Outfit
          </Button>

          {[
            { name: 'My Closet', iconLib: MaterialCommunityIcons, icon: 'wardrobe', route: 'MyCloset' },
            { name: 'Weather', iconLib: MaterialIcons, icon: 'wb-sunny', route: 'Weather' },
            { name: 'My Outfits', iconLib: MaterialIcons, icon: 'style', route: 'MyOutfits' },
            { name: 'Favorite Outfits', iconLib: MaterialIcons, icon: 'favorite', route: 'FavoriteOutfits' },
            { name: 'Profile', iconLib: MaterialIcons, icon: 'person', route: 'Profile' },
          ].map((item, index) => (
            <Button
              key={index}
              bg="coolGray.300"
              _text={{ color: 'black', fontSize: 18, fontWeight: 'medium', textAlign: 'center' }}
              leftIcon={<Icon as={item.iconLib} name={item.icon} size={8} color="black" />}
              onPress={() => navigation.navigate(item.route)}
              borderRadius="md"
              py="5"
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
}
