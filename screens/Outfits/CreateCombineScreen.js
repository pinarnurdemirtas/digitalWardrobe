import React, { useState, useEffect } from 'react';
import { ScrollView, Center, VStack, Spinner, Text, Button, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CombineNameInput from '../../components/Outfit/CombineNameInput';
import CategoryClothSelector from '../../components/Outfit/CategoryClothSelector';
import ClothChooseModal from '../../components/Outfit/ClothChooseModal';

export default function CreateCombineScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [clothesList, setClothesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [combineName, setCombineName] = useState('');
  const [selectedClothes, setSelectedClothes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [userId, setUserId] = useState(null);
  const toast = useToast();

  // Kategori ve kıyafet verilerini çekiyoruz
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const user = JSON.parse(userStr);
        setUserId(user.id);

        const [categoriesRes, clothesRes] = await Promise.all([
          axios.get('http://wardrobe.pinarnur.com/api/Categories/maincategories'),
          axios.get(`http://wardrobe.pinarnur.com/api/Clothing/clothes/grouped-by-parent/${user.id}`)
        ]);

        setCategories(categoriesRes.data);
        setClothesList(clothesRes.data);
      } catch (err) {
        console.error(err);
        setError('Veriler alınamadı');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Kategoriye tıklayınca modal açıyoruz
  const handleSelectCloth = (mainCategoryId) => {
    setCurrentCategoryId(mainCategoryId);
    setModalVisible(true);
  };

  // Modal içinden kıyafet seçimi
  const handleClothChoose = (cloth) => {
    setSelectedClothes((prev) => ({ ...prev, [currentCategoryId]: cloth }));
    setModalVisible(false);
  };

  // Kombin oluşturma
  const handleCreateCombine = async () => {
    if (!combineName.trim()) {
      toast.show({ description: 'Kombin ismini giriniz.' });
      return;
    }

    const clothIds = Object.values(selectedClothes).map((cloth) => cloth.id);

    if (clothIds.length < 2) {
      toast.show({ description: 'En az 2 kıyafet seçmelisiniz.' });
      return;
    }

    try {
      await axios.post('http://wardrobe.pinarnur.com/api/Combine/create', {
        userId,
        name: combineName,
        clothIds,
      });
      toast.show({ description: 'Kombin başarıyla oluşturuldu.' });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      toast.show({ description: 'Kombin oluşturulamadı.' });
    }
  };

  const getClothesByCategory = (categoryId) => {
    const category = clothesList.find(item => item.parentCategoryId === categoryId);
    return category ? category.clothes : [];
  };

  if (loading) return <Center flex={1}><Spinner color="#054f5c" size="lg" /></Center>;
  if (error) return <Center flex={1}><Text>{error}</Text></Center>;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="#f0f4f8" px="6" py="12">
        <VStack space={6} w="100%">
          <CombineNameInput
            combineName={combineName}
            setCombineName={setCombineName}
          />

          <VStack space={4} mt={6}>
            {categories.map((category) => (
              <CategoryClothSelector
                key={category.id}
                category={category}
                selectedCloth={selectedClothes[category.id]}
                onSelect={() => handleSelectCloth(category.id)}
              />
            ))}
          </VStack>

          <Button
            mt={8}
            bg="#054f5c"
            _pressed={{ bg: '#043c44' }}
            borderRadius="xl"
            py="4"
            onPress={handleCreateCombine}
          >
            Kombini Oluştur
          </Button>
        </VStack>

        <ClothChooseModal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          clothes={getClothesByCategory(currentCategoryId)}
          onClothChoose={handleClothChoose}
        />
      </Center>
    </ScrollView>
  );
}