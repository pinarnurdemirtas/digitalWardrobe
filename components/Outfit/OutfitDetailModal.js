import React from "react";
import { Modal, ScrollView, VStack, HStack, Pressable, Image, Text } from "native-base";

export default function OutfitDetailModal({ isOpen, onClose, outfit, onImagePress }) {
  if (!outfit) return null;

  const createdAt = new Date(outfit.createdAt);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content bg="white" maxWidth="95%" height="50%">
        <Modal.CloseButton />
        <Modal.Header>{outfit.name || `Kombin #${outfit.id}`}</Modal.Header>
        <Modal.Body>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={4}>
              {outfit.clothes.map((cloth, index) => (
                <Pressable key={index} onPress={() => onImagePress(cloth.image_url)}>
                  <Image
                    source={{ uri: cloth.image_url }}
                    alt={cloth.name}
                    width={200}
                    height={200}
                    borderRadius="lg"
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </HStack>
          </ScrollView>

          <VStack mt={4} space={2}>
            <Text fontSize="sm" color="gray.500">
              Tarih: {createdAt.toLocaleDateString('tr-TR')}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Saat: {createdAt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
