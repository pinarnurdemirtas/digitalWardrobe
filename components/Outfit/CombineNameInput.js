import React from 'react';
import { Box, Text, Input } from 'native-base';

// Kombin ismi giriş kutusu
export default function CombineNameInput({ combineName, setCombineName }) {
  return (
    <Box>
      <Text mb={2} fontSize={16} color="#054f5c" fontWeight="bold">
        Kombin İsmi
      </Text>
      <Input
        placeholder="Kombin ismi giriniz"
        value={combineName}
        onChangeText={setCombineName}
        borderRadius="xl"
        bg="white"
        _focus={{ borderColor: '#054f5c' }}
      />
    </Box>
  );
}
