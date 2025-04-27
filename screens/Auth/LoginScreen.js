import React, { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Icon,
  ScrollView,
  KeyboardAvoidingView,
  useToast,
} from "native-base";
import { Platform, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LoginForm from "../../components/Auth/LoginForm"; 

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Giriş işlemi
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://wardrobe.pinarnur.com/api/Auth/login",
        { username, password }
      );

      if (response.data?.token) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate("Home");
      } else {
        toast.show({
          title: "Hata",
          description: "Bilinmeyen bir hata oluştu.",
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Kullanıcı adı veya şifre yanlış.";
      toast.show({ title: "Giriş Başarısız", description: message });
    } finally {
      setLoading(false);
    }
  };

  // Kayıt ekranına yönlendirme
  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#054f5c" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Center flex={1} bg="#054f5c">
            <Box
              safeArea
              p="8"
              w="90%"
              maxW="400"
              bg="#f5fcfc"
              rounded="2xl"
              shadow="9"
              borderWidth={1}
              borderColor="#086070"
            >
              {/* Logo ve Başlık */}
              <Center mb="6">
                <Icon
                  as={MaterialCommunityIcons}
                  name="wardrobe-outline"
                  size="90"
                  color="#054f5c"
                />
                <Heading size="lg" fontWeight="bold" color="#054f5c" mt="3">
                  Digital Wardrobe
                </Heading>
              </Center>

              {/* Form */}
              <LoginForm
                username={username}
                password={password}
                showPassword={showPassword}
                loading={loading}
                setUsername={setUsername}
                setPassword={setPassword}
                setShowPassword={setShowPassword}
                handleLogin={handleLogin}
                navigateRegister={navigateRegister}
              />
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
