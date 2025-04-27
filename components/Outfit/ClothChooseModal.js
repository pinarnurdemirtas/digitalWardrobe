import React from 'react';
import { Modal, ScrollView, VStack, Pressable, Box, Image, Text } from 'native-base';

// Modal ile kıyafet seçimi
export default function ClothChooseModal({ isOpen, onClose, clothes, onClothChoose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Kıyafet Seç</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={3}>
              {clothes.map((item) => (
                <Pressable key={item.id} onPress={() => onClothChoose(item)}>
                  <Box flexDirection="row" alignItems="center" mb={3}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      alt={item.name}
                      size="sm"
                      mr={3}
                      borderRadius={8}
                    />
                    <Text>{item.name}</Text>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
