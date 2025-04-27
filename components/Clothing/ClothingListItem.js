import React from "react";
import { HStack, VStack, Image, Text } from "native-base";

export default function ClothingListItem({ clothing, getColorName }) {
  return (
    <HStack
      bg="white"
      borderRadius="xl"
      shadow={3}
      p={3}
      space={4}
      alignItems="center"
      mt={2}
    >
      <Image
        source={{ uri: clothing.image_url }}
        alt={clothing.name}
        w={90}
        h={90}
        borderRadius="md"
      />
      <VStack>
        <Text fontSize="lg" fontWeight="bold" color="#054f5c">
          {clothing.name}
        </Text>
        <Text color="gray.600">
          Renk: {getColorName(clothing.colorId)}
        </Text>
      </VStack>
    </HStack>
  );
}
