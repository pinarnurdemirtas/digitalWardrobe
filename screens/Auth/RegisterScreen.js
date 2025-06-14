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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RegisterForm from "../../components/Auth/RegisterForm"; 

export default function RegisterScreen() {
  const navigation = useNavigation();
  const toast = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    city: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://wardrobe.pinarnur.com/api/Auth/register",
        {
          ...form,
          is_verified: true,
        }
      );

      console.log("API Response:", response);

      if (
        response.status === 200 &&
        typeof response.data === "string" &&
        response.data.includes("Kayıt başarılı")
      ) {
        toast.show({
          title: "Başarılı",
          description: response.data,
        });
        navigation.navigate("Login");
      } else {
        toast.show({
          title: "Hata",
          description: "Kayıt sırasında bir hata oluştu.",
        });
      }
    } catch (error) {
      const errorData = error.response?.data;
      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.message || "Kayıt sırasında bir hata oluştu.";

      toast.show({
        title: "Kayıt Başarısız",
        description: message,
      });

      console.log("Response:", error.response?.data);
    } finally {
      setLoading(false);
    }
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
          
              {/* Form */}
              <RegisterForm
                form={form}
                setForm={setForm}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                handleRegister={handleRegister}
              />
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
