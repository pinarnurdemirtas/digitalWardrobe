import React, { useEffect, useState } from 'react';
import { ScrollView, Button, Center, VStack, Icon, Spinner, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';


export default function SubCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { parentId, parentName } = route.params;

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const user = JSON.parse(userStr);

        const response = await fetch(
          `http://wardrobe.pinarnur.com/api/Categories/subcategories/${parentId}/gender/${user.gender.toLowerCase()}`
        );
        const data = await response.json();
        setSubCategories(data);
      } catch (err) {
        console.error('Alt kategoriler alınamadı', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parentId]);

  const getIconName = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('üst giyim')) return 'tshirt-crew';
    if (lower.includes('alt giyim')) return 'run';
    if (lower.includes('takım')) return 'hanger';
    if (lower.includes('ayakkabı')) return 'shoe-formal';
    if (lower.includes('dış giyim')) return 'coat-rack';
    if (lower.includes('aksesuar')) return 'bag-personal-outline';
    return 'tshirt-crew';
  };

  if (loading) return <Center flex={1}><Spinner color="#054f5c" size="lg" /></Center>;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="#f0f4f8" px="6" py="12">
        <VStack space={4} w="100%">
          {subCategories.map((sub) => (
            <Button
              key={sub.id}
              bg="white"
              _pressed={{ bg: "white", opacity: 1 }}
              _text={{
                color: "#054f5c",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "left",
              }}
              
              onPress={() => navigation.navigate('Clothes', { categoryId: sub.id })}
              borderRadius="xl"
              py="5"
              px="4"
              justifyContent="flex-start"
              shadow={2}
            >
              {sub.name}
            </Button>
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
}
