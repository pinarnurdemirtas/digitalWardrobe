import React from "react";
import { Box, HStack, VStack, Text, IconButton, Icon, Button, AlertDialog } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ClothesGrid from "./ClothesGrid";

export default function OutfitCard({ outfit, toggleFavorite }) {

  const cancelRef = React.useRef(null);

  // Tarih ve saat bilgisini hazırla
  const createdAt = new Date(outfit.createdAt);
  const formattedDate = createdAt.toLocaleDateString('tr-TR');
  const formattedTime = createdAt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <Box bg="white" p={4} rounded="xl" shadow={2} position="relative">
      {/* Sağ üstte like ikonu */}
      <IconButton
        icon={<Icon as={MaterialIcons} name="favorite" color={outfit.isFavorite ? "red.500" : "gray.400"} />}
        onPress={() => toggleFavorite(outfit.id)}
        position="absolute"
        top={2}
        right={2}
        size="lg"
        variant="ghost"
      />

      <HStack space={4} alignItems="center" mt={4}>
        <ClothesGrid clothes={outfit.clothes} />
        <VStack flex={1}>
          <Text fontSize="lg" fontWeight="bold" color="#054f5c">
            {outfit.name || `Kombin #${outfit.id}`}
          </Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Tarih: {formattedDate}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Saat: {formattedTime}
          </Text>
        </VStack>
      </HStack>

    </Box>
  );
}
