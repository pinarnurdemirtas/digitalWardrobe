import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "native-base";
import { registerUser } from "../services/apiService"; 

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    setLoading(true);

    const requestData = {
      id: 0, 
      fullName,
      email,
      username,
      city,
      password,
      is_verified: true, 
    };

    const { success, data, message } = await registerUser(requestData);

    if (success) {
      toast.show({
        title: "Registration Successful",
        description: message,
      });
     
    } else {
      toast.show({
        title: "Registration Failed",
        description: message,
      });
    }

    setLoading(false);
  };

  return (
    <Center flex={1} bg="gray.100">
      <Box
        safeArea
        p="5"
        py="8"
        w="90%"
        maxW="400"
        bg="white"
        rounded="lg"
        shadow="7"
      >
        <Heading size="xl" fontWeight="bold" textAlign="center">
          Create Account
        </Heading>

        <VStack space={4} mt="5">
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input
              placeholder="Enter your Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              placeholder="Enter your Username"
              value={username}
              onChangeText={setUsername}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Enter your Password"
              value={password}
              onChangeText={setPassword}
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>City</FormControl.Label>
            <Input
              placeholder="Enter your City"
              value={city}
              onChangeText={setCity}
            />
          </FormControl>

          <Button
            mt="3"
            bg="#054f5c"
            _text={{ color: "white" }}
            isLoading={loading}
            onPress={handleRegister}
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
