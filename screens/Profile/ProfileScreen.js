import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Avatar,
  Spinner,
  useToast,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ProfileForm from "../../components/Profile/ProfileForm"; 

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFormData(parsed);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const getProfileImage = () => {
    if (!user) return null;
    if (user.gender === "Female") {
      return "https://cdn-icons-png.flaticon.com/512/6997/6997662.png";
    } else if (user.gender === "Male") {
      return "https://cdn-icons-png.flaticon.com/512/6997/6997676.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/848/848006.png";
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.put(
        "http://wardrobe.pinarnur.com/api/Users/update",
        {
          id: user.id,
          username: formData.username,
          email: formData.email,
          password: "123",
          fullname: formData.fullname,
          city: formData.city,
          gender: formData.gender,
          is_verified: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      toast.show({
        title: "Güncellendi",
        description: "Profil başarıyla güncellendi.",
      });
      setEditing(false);
    } catch (error) {
      toast.show({
        title: "Hata",
        description: "Güncelleme sırasında bir sorun oluştu.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(
        `http://wardrobe.pinarnur.com/api/Users/${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await AsyncStorage.clear();
      navigation.replace("Login");
    } catch (error) {
      toast.show({
        title: "Silinemedi",
        description: "Hesap silinirken bir hata oluştu.",
      });
    }
  };

  if (loading) {
    return (
      <Center flex={1} bg="#f0f4f8">
        <Spinner color="#054f5c" size="lg" />
      </Center>
    );
  }

  return (
    <Center flex={1} bg="#f0f4f8" px="6" py="10">
      <Box bg="white" p="8" rounded="2xl" shadow="3" w="100%" maxW="400">
        <Center>
          <Avatar
            size="xl"
            source={{ uri: getProfileImage() }}
            borderWidth={2}
            borderColor="#054f5c"
            mb="4"
          />
          <Text fontSize="lg" fontWeight="bold" color="#054f5c">
            {user?.fullname}
          </Text>
        </Center>

        {/* form alanları ProfileForm üzerinden geliyor */}
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          editing={editing}
          onSave={handleSave}
          onEdit={() => setEditing(true)}
          onDelete={handleDeleteAccount}
        />
      </Box>
    </Center>
  );
}
