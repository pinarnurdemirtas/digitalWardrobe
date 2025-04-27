import React from "react";
import { VStack, FormControl, Input, Button, Icon, Select, CheckIcon } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function RegisterForm({ form, setForm, showPassword, setShowPassword, loading, handleRegister }) {
  const handleChange = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <VStack space={4}>
      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Kullanıcı Adı</FormControl.Label>
        <Input
          value={form.username}
          onChangeText={(val) => handleChange("username", val)}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="xl"
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="account" size={5} ml="3" color="#054f5c" />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Ad Soyad</FormControl.Label>
        <Input
          value={form.fullname}
          onChangeText={(val) => handleChange("fullname", val)}
          placeholder="Ad Soyad"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="xl"
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="account-box-outline" size={5} ml="3" color="#054f5c" />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Email</FormControl.Label>
        <Input
          value={form.email}
          onChangeText={(val) => handleChange("email", val)}
          placeholder="E-posta Adresi"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="xl"
          keyboardType="email-address"
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="email-outline" size={5} ml="3" color="#054f5c" />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Şifre</FormControl.Label>
        <Input
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChangeText={(val) => handleChange("password", val)}
          placeholder="Şifre"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="xl"
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="lock" size={5} ml="3" color="#054f5c" />}
          InputRightElement={<Icon as={MaterialCommunityIcons} name={showPassword ? "eye-off" : "eye"} size={5} mr="3" color="#054f5c" onPress={() => setShowPassword(!showPassword)} />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}> Şehir </FormControl.Label>
        <Input
          value={form.city}
          onChangeText={(val) => handleChange("city", val)}
          placeholder="Şehir"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="xl"
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="city-variant-outline" size={5} ml="3" color="#054f5c" />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Cinsiyet</FormControl.Label>
        <Select
          selectedValue={form.gender}
          minWidth="200"
          placeholder="Cinsiyet seçiniz"
          onValueChange={(val) => handleChange("gender", val)}
          _selectedItem={{ bg: "#d4f0f0", endIcon: <CheckIcon size="5" /> }}
          borderRadius="xl"
          bg="#ffffff"
          color="#054f5c"
          variant="unstyled"
        >
          <Select.Item label="Kadın" value="Female" />
          <Select.Item label="Erkek" value="Male" />
          <Select.Item label="Diğer" value="Other" />
        </Select>
      </FormControl>

      <Button mt="3" bg="#054f5c" _text={{ color: "white", fontWeight: "bold" }} _pressed={{ bg: "#043c41" }} isLoading={loading} onPress={handleRegister}>
        Kayıt Ol
      </Button>
    </VStack>
  );
}
