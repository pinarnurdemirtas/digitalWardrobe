import React from "react";
import { Modal, Center, Image } from "native-base";

export default function ImagePreviewModal({ isOpen, onClose, imageUrl }) {
  if (!imageUrl) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content bg="white" maxWidth="95%" height="65%">
        <Modal.CloseButton />
        <Center flex={1}>
          <Image
            source={{ uri: imageUrl }}
            alt="Seçilen Görsel"
            width="100%"
            height="100%"
            resizeMode="contain"
          />
        </Center>
      </Modal.Content>
    </Modal>
  );
}
