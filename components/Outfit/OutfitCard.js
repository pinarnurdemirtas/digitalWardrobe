import React from "react";
import { Box, HStack, VStack, Text, IconButton, Icon, Button, AlertDialog } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ClothesGrid from "./ClothesGrid";

export default function OutfitCard({ outfit, toggleFavorite, addToExplore, removeFromExplore }) {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isRemove, setIsRemove] = React.useState(false);
  const cancelRef = React.useRef(null);

  const handleExploreAction = () => {
    if (isRemove) {
      removeFromExplore(outfit.id);
    } else {
      addToExplore(outfit.id);
    }
    setIsAlertOpen(false);
  };

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

          {/* Keşfet işlemleri */}
          <Button
            mt={3}
            bg="white"
            _text={{ color: "#054f5c", fontWeight: "bold" }}
            _pressed={{ bg: "gray.100" }}
            shadow={2}
            borderColor="#054f5c"
            borderWidth={1}
            onPress={() => {
              setIsRemove(outfit.isPublic);
              setIsAlertOpen(true);
            }}
          >
            {outfit.isPublic ? "Keşfetten Kaldır" : "Keşfete Ekle"}
          </Button>
        </VStack>
      </HStack>

      {/* Onay Dialogu */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Onayla</AlertDialog.Header>
          <AlertDialog.Body>
            {isRemove
              ? "Bu kombini keşfetten kaldırmak istediğine emin misin?"
              : "Bu kombini keşfete eklemek istediğine emin misin?"}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="coolGray" onPress={() => setIsAlertOpen(false)} ref={cancelRef}>
                Vazgeç
              </Button>
              <Button bg="#054f5c" _pressed={{ bg: "#043c41" }} onPress={handleExploreAction}>
                Evet
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
}
