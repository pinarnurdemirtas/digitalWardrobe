// 📂 src/screens/Outfit/MyOutfitsScreen.js
import React, { useState, useEffect } from "react";
import { ScrollView, VStack, Center, Spinner, Text, Pressable } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import OutfitCard from "../../components/Outfit/OutfitCard";
import OutfitDetailModal from "../../components/Outfit/OutfitDetailModal";
import OutfitImageModal from "../../components/Outfit/ImagePreviewModal";

export default function MyOutfitsScreen() {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);
      const response = await axios.get(`http://wardrobe.pinarnur.com/api/Combine/user/${user.id}`);
      setOutfits(response.data);
    } catch (error) {
      console.error("Kombinler alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (combineId) => {
    try {
      await axios.put(`http://wardrobe.pinarnur.com/api/Combine/${combineId}/toggle-favorite`);
      fetchOutfits();
    } catch (error) {
      console.error("Favori işlemi başarısız:", error);
    }
  };

  const addToExplore = async (combineId) => {
    try {
      await axios.put(`http://wardrobe.pinarnur.com/api/Interaction/publish/${combineId}`);
      fetchOutfits();
    } catch (error) {
      console.error("Keşfete ekleme başarısız:", error);
    }
  };

  const removeFromExplore = async (combineId) => {
    try {
      await axios.put(`http://wardrobe.pinarnur.com/api/Interaction/toggle-visibility/${combineId}`);
      fetchOutfits();
    } catch (error) {
      console.error("Keşfetten kaldırma başarısız:", error);
    }
  };

  const openDetail = (outfit) => {
    setSelectedOutfit(outfit);
    setShowModal(true);
  };

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
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#f0f4f8" }}>
        <VStack space={4}>
          {outfits.length === 0 ? (
            <Text color="gray.600" textAlign="center">Hiç kombin eklenmemiş.</Text>
          ) : (
            outfits.map((outfit) => (
              <Pressable key={outfit.id} onPress={() => openDetail(outfit)}>
                <OutfitCard
                  outfit={outfit}
                  openDetail={openDetail}
                  toggleFavorite={toggleFavorite}
                  addToExplore={addToExplore}
                  removeFromExplore={removeFromExplore}
                />
              </Pressable>
            ))
          )}
        </VStack>
      </ScrollView>

      {/* Kombin detay modalı */}
      <OutfitDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        outfit={selectedOutfit}
        onImagePress={openImage}
      />

      {/* Fotoğraf büyütme modalı */}
      <OutfitImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={selectedImage}
      />
    </>
  );
}
