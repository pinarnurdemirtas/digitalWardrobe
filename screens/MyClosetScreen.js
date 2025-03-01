import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, Text, VStack, Box, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function MyClosetScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSubCategories, setShowSubCategories] = useState(null); 

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.92.150:5000/api/Categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <Center flex={1}><Text>Loading...</Text></Center>;
  if (error) return <Center flex={1}><Text>Error: {error}</Text></Center>;

  const parentCategories = categories.filter(category => category.parentId === null);

  const handleCategoryPress = (categoryId) => {
    setShowSubCategories(categoryId);
  };

  const subCategories = categories.filter(category => category.parentId === showSubCategories);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="#f0f4f8" px={2} py={9}>
        <VStack space={4} w="100%" maxW="90%">
          {showSubCategories === null ? (
            <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
              {parentCategories.map(category => (
                <Pressable
                  key={category.id}
                  onPress={() => handleCategoryPress(category.id)} 
                  w="48%"
                  h={160}
                  bg="#054f5c"  
                  borderRadius="xl"  
                  justifyContent="center"
                  alignItems="center"
                  shadow={9}
                  mb={6}
                  _hover={{ bg: "#00838F" }}  
                >
                  <Text color="white" fontSize={20} fontWeight="bold" textAlign="center" lineHeight={28}>
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </Box>
          ) : (
            <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
              {subCategories.map(subCategory => (
                <Pressable
                  key={subCategory.id}
                  onPress={() => navigation.navigate('CategoryDetails', { categoryId: subCategory.id })}
                  w="48%"
                  h={160}
                  bg="#054f5c" 
                  borderRadius="xl"
                  justifyContent="center"
                  alignItems="center"
                  shadow={9}
                  mb={6}
                  _hover={{ bg: "#008C9E" }} 
                >
                  <Text color="white" fontSize={20} fontWeight="bold" textAlign="center" lineHeight={28}>
                    {subCategory.name}
                  </Text>
                </Pressable>
              ))}
            </Box>
          )}
          {showSubCategories !== null && (
            <Pressable
              onPress={() => setShowSubCategories(null)} 
              bg="coolGray.300"  
              borderRadius="xl"
              justifyContent="center"
              alignItems="center"
              py={3}
              mb={4}
              _hover={{ bg: "#F50057" }}  
            >
              <Text color="#054f5c" fontSize={18} fontWeight="bold">
                Geri Dön
              </Text>
            </Pressable>
          )}
        </VStack>
      </Center>
    </ScrollView>
  );
}
