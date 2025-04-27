import React, { useState, useEffect } from 'react';
import { ScrollView, Button, Center, VStack, Icon, Spinner, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MyClosetScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://wardrobe.pinarnur.com/api/Categories/maincategories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError('Ana kategoriler alınamadı');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIconName = (categoryName) => {
    const name = categoryName.toLowerCase();

    if (name.includes('üst giyim')) return 'tshirt-crew';
    if (name.includes('alt giyim')) return 'run';
    if (name.includes('takım')) return 'hanger';
    if (name.includes('ayakkabı')) return 'shoe-formal';
    if (name.includes('dış giyim')) return 'coat-rack';
    if (name.includes('aksesuar')) return 'bag-personal-outline';
  };

  if (loading) return <Center flex={1}><Spinner color="#054f5c" size="lg" /></Center>;
  if (error) return <Center flex={1}><Text>{error}</Text></Center>;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="#f0f4f8" px="6" py="12">
        <VStack space={6} w="100%">
          {categories.map((category) => (
            <Button
              key={category.id}
              bg="white"
              _pressed={{ bg: "white", opacity: 1 }}
              _text={{
                color: "#054f5c",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "left",
              }}
              leftIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name={getIconName(category.name)}
                  size={7}
                  color="#054f5c"
                />
              }
              onPress={() =>
                navigation.navigate('SubCategoryScreen', {
                  parentId: category.id,
                  parentName: category.name,
                })
              }
              borderRadius="xl"
              py="5"
              px="4"
              justifyContent="flex-start"
              shadow={2}
            >
              {category.name}
            </Button>
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
}
