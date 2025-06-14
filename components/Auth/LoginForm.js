import React from "react";
import { VStack, FormControl, Input, Button, Icon, Link, Text } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function LoginForm({ username, password, showPassword, loading, setUsername, setPassword, setShowPassword, handleLogin, navigateRegister }) {
  return (
    <VStack space={5}>
      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}>Kullanıcı Adı</FormControl.Label>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Kullanıcı Adı Giriniz"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="md"
          _focus={{ bg: "#f0fbfb", borderColor: "#0a6b6b" }}
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="account" size={5} ml="3" color="#054f5c" />}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ color: "#054f5c" }}> Şifre </FormControl.Label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChangeText={setPassword}
          placeholder="Şifre Giriniz"
          placeholderTextColor="#054f5c"
          bg="#ffffff"
          color="#054f5c"
          borderRadius="md"
          _focus={{ bg: "#f0fbfb", borderColor: "#0a6b6b" }}
          InputLeftElement={<Icon as={MaterialCommunityIcons} name="lock" size={5} ml="3" color="#054f5c" />}
          InputRightElement={<Icon as={MaterialCommunityIcons} name={showPassword ? "eye-off" : "eye"} size={5} mr="3" color="#054f5c" onPress={() => setShowPassword(!showPassword)} />}
        />
        <Link alignSelf="flex-end" mt="1" _text={{ fontSize: "xs", color: "#086070" }}>
          Şifremi Unuttum?
        </Link>
      </FormControl>

      <Button mt="2" bg="#054f5c" _text={{ color: "white", fontWeight: "bold" }} _pressed={{ bg: "#043c41" }} isLoading={loading} onPress={handleLogin}>
        Giriş Yap
      </Button>

      <Button variant="link" onPress={navigateRegister}>
  <Text>
    <Text style={{ color: "black", fontWeight: "normal" }}>
      Hesabın yok mu?{" "}
    </Text>
    <Text style={{ color: "#054f5c", fontWeight: "bold" }}>
      Kayıt Ol
    </Text>
  </Text>
</Button>

    </VStack>
  );
}
