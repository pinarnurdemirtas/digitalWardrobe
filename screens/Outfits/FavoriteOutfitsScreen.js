import React, { useState, useEffect } from 'react';
import { ScrollView, VStack, Center, Spinner, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteOutfitCard from '../../components/Outfit/FavoriteOutfitCard';
import OutfitDetailModal from '../../components/Outfit/OutfitDetailModal';
import ImagePreviewModal from '../../components/Outfit/ImagePreviewModal';
import axios from 'axios'; 

export default function FavoriteOutfitsScreen() {
  const [favoriteOutfits, setFavoriteOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Favori kombinleri API'den çekiyoruz
  const fetchFavorites = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const user = JSON.parse(userStr);
      const response = await axios.get(`http://wardrobe.pinarnur.com/api/Combine/user/${user.id}`);
      const allOutfits = response.data;
      setFavoriteOutfits(allOutfits.filter(outfit => outfit.isFavorite));
    } catch (error) {
      console.error('Favori kombinler alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  // Kombini favorilerden çıkarıyoruz
  const handleUnfavorite = async (combineId) => {
    try {
      await axios.post(`http://wardrobe.pinarnur.com/api/Combine/${combineId}/toggle-favorite`);
      setFavoriteOutfits(prev => prev.filter(outfit => outfit.id !== combineId));
    } catch (error) {
      console.error('Favori kaldırma hatası:', error);
    }
  };

  // Kombin detay modalını açıyoruz
  const openDetail = (outfit) => {
    setSelectedOutfit(outfit);
    setShowDetailModal(true);
  };

  // Fotoğrafa tıklayınca büyütüyoruz
  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner color="#054f5c" size="lg" />
      </Center>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#f0f4f8' }}>
        <VStack space={4}>
          {favoriteOutfits.length === 0 ? (
            <Text color="gray.600" textAlign="center">
              Hiç favori kombin bulunamadı.
            </Text>
          ) : (
            favoriteOutfits.map((outfit) => (
              <FavoriteOutfitCard
                key={outfit.id}
                outfit={outfit}
                onPress={() => openDetail(outfit)}
                onUnfavorite={() => handleUnfavorite(outfit.id)}
              />
            ))
          )}
        </VStack>
      </ScrollView>

      {/* Kombin detay modalı */}
      <OutfitDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        outfit={selectedOutfit}
        onImagePress={openImage}
      />

      {/* Fotoğraf büyütme modalı */}
      <ImagePreviewModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={selectedImage}
      />
    </>
  );
}
