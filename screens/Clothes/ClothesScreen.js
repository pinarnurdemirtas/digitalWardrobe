import React, { useEffect, useState } from "react";
import { ScrollView, VStack, Center, Spinner, Button, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AddClothingForm from "../../components/Clothing/AddClothingForm";
import ClothingListItem from "../../components/Clothing/ClothingListItem";

export default function CategoryDetails() {
  const route = useRoute();
  const { categoryId } = route.params;

  const [clothes, setClothes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [colorId, setColorId] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Kullanıcının kıyafet ve renk verilerini çekiyoruz
  const fetchData = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      const [clothesRes, colorsRes] = await Promise.all([
        fetch(`http://wardrobe.pinarnur.com/api/Clothing/clothes/${user.id}`),
        fetch(`http://wardrobe.pinarnur.com/api/Color`),
      ]);

      const clothesData = await clothesRes.json();
      const colorsData = await colorsRes.json();

      const filtered = clothesData.filter(
        (item) => item.category_id === categoryId
      );

      setClothes(filtered);
      setColors(colorsData);
    } catch (err) {
      console.error("Veriler alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  // Renk ID'sinden renk adını buluyoruz
  const getColorName = (id) => {
    const found = colors.find((c) => c.id === id);
    return found ? found.name : "Bilinmiyor";
  };

  // Seçilen resmi sunucuya yüklüyoruz
  const uploadImage = async (selectedImage) => {
    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(
        "http://wardrobe.pinarnur.com/api/Clothing/uploadImage",
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = await response.json();
      setUploadedImageUrl(data.imageUrl);
    } catch (err) {
      console.error("Resim yükleme hatası:", err);
    }
  };

  // Kullanıcıdan resim seçmesini sağlıyoruz
  const pickImage = async (source = "gallery") => {
    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });

    if (!result.canceled) {
      const selected = result.assets[0];
      setImage(selected);
      await uploadImage(selected);
    }
  };

  // Yeni kıyafet ekleme işlemi
  const handleSubmit = async () => {
    if (!name || !seasonId || !colorId || !uploadedImageUrl) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setSubmitting(true);
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      const clothingData = {
        id: 0,
        user_id: user.id,
        name,
        image_url: uploadedImageUrl,
        category_id: categoryId,
        season_id: parseInt(seasonId),
        colorId: parseInt(colorId),
      };

      await axios.post(
        "http://wardrobe.pinarnur.com/api/Clothing/newClothing",
        clothingData
      );

      alert("Kıyafet başarıyla eklendi!");
      setName("");
      setColorId("");
      setSeasonId("");
      setImage(null);
      setUploadedImageUrl(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Kıyafet ekleme hatası:", err);
      alert("Kıyafet eklenemedi!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <Center flex={1}>
        <Spinner color="#054f5c" size="lg" />
      </Center>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#f0f4f8" }}>
      <VStack space={3}>
        {/* Form açma kapama butonu */}
        {!showForm && (
          <Button
            onPress={() => setShowForm(true)}
            bg="#054f5c"
            _text={{ color: "white", fontWeight: "bold" }}
            borderRadius="xl"
          >
            Yeni Kıyafet Ekle
          </Button>
        )}

        {/* Form gösterimi */}
        {showForm && (
          <AddClothingForm
            image={image}
            name={name}
            seasonId={seasonId}
            colorId={colorId}
            colors={colors}
            submitting={submitting}
            onPickImage={pickImage}
            onNameChange={setName}
            onSeasonChange={setSeasonId}
            onColorChange={setColorId}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Kıyafet Listesi */}
        {clothes.length === 0 ? (
          <Text color="gray.600" textAlign="center" mt={6}>
            Bu kategoriye ait kıyafet bulunamadı.
          </Text>
        ) : (
          clothes.map((clothing) => (
            <ClothingListItem
              key={clothing.id}
              clothing={clothing}
              getColorName={getColorName}
            />
          ))
        )}
      </VStack>
    </ScrollView>
  );
}
