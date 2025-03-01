import React, { useState } from 'react';
import { Box, Button, Center, FormControl, Heading, Icon, Input, Link, Text, VStack, HStack, useToast, ScrollView, KeyboardAvoidingView } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';  
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/apiService';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    const { success, data, message } = await loginUser(username, password);  

    if (success) {
      navigation.navigate('Menu');
    } else {
      toast.show({
        title: 'Login Failed',
        description: message,
      });
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Center flex={1} bg="gray.100">
          <Box safeArea p="5" py="8" w="90%" maxW="400" bg="white" rounded="lg" shadow="8">
            <Heading size="xl" fontWeight="bold" textAlign="center">
              Welcome
            </Heading>
            <Text mt="2" textAlign="center" color="coolGray.600">
              Don’t have an account?{' '}
              <Link
                _text={{ color: '#086070', fontWeight: 'bold' }}
                onPress={() => navigation.navigate('Register')}
              >
                Sign up
              </Link>
            </Text>

            <VStack space={4} mt="5">
              <FormControl>
                <FormControl.Label _text={{ color: '#054f5c' }}>Username</FormControl.Label>
                <Input
                  placeholder="Enter your username"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: '#054f5c' }}>Password</FormControl.Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  InputRightElement={
                    <Icon
                      as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                      size={5}
                      mr="2"
                      color="#054f5c"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <Link
                  _text={{ fontSize: 'xs', fontWeight: '500', color: '#054f5c' }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forgot Password?
                </Link>
              </FormControl>

              <Button
                mt="3"
                bg="#054f5c"
                _text={{ color: 'white' }}
                isLoading={loading}
                onPress={handleLogin}
              >
                Login
              </Button>

              <HStack mt="5" justifyContent="center" alignItems="center">
                <Box h="0.5" bg="muted.400" flex={1} />
                <Text mx="2" color="muted.500">
                  OR CONTINUE WITH
                </Text>
                <Box h="0.5" bg="muted.400" flex={1} />
              </HStack>

              <HStack justifyContent="space-around" mt="3">
                <Button variant="outline" _text={{ color: 'black', fontSize: 15 }} leftIcon={<Icon as={FontAwesome} name="google" size="sm" />}>
                  Google
                </Button>
                <Button variant="outline" _text={{ color: 'black', fontSize: 15 }} leftIcon={<Icon as={FontAwesome} name="twitter" size="sm" />}>
                  Twitter
                </Button>
                <Button variant="outline" _text={{ color: 'black', fontSize: 14 }} leftIcon={<Icon as={FontAwesome} name="instagram" size="sm" />}>
                  Instagram
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
