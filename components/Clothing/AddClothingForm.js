import React from "react";
import { VStack, HStack, Button, Icon, Image, FormControl, Input, Select } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddClothingForm({
  image,
  name,
  seasonId,
  colorId,
  colors,
  submitting,
  onPickImage,
  onNameChange,
  onSeasonChange,
  onColorChange,
  onSubmit,
  onCancel,
}) {
  return (
    <VStack space={4} bg="white" p={4} borderRadius="xl" shadow={3}>
      <HStack space={3}>
        <Button
          onPress={() => onPickImage("gallery")}
          flex={1}
          bg="#054f5c"
          leftIcon={<Icon as={MaterialIcons} name="photo-library" size="sm" color="white" />}
          _text={{ color: "white" }}
          borderRadius="lg"
        >
          Galeri
        </Button>
        <Button
          onPress={() => onPickImage("camera")}
          flex={1}
          bg="#054f5c"
          leftIcon={<Icon as={MaterialCommunityIcons} name="camera-outline" size="sm" color="white" />}
          _text={{ color: "white" }}
          borderRadius="lg"
        >
          Kamera
        </Button>
      </HStack>

      {image && (
        <Image
          source={{ uri: image.uri }}
          alt="Seçilen"
          borderRadius="lg"
          size="2xl"
          alignSelf="center"
          mt={2}
        />
      )}

      <FormControl>
        <FormControl.Label>Kıyafet Adı</FormControl.Label>
        <Input
          value={name}
          onChangeText={onNameChange}
          placeholder="Kıyafet Adı Yaz"
          borderRadius="lg"
        />
      </FormControl>

      <FormControl>
        <FormControl.Label>Mevsim</FormControl.Label>
        <Select
          selectedValue={seasonId}
          onValueChange={onSeasonChange}
          placeholder="Mevsim Seç"
          borderRadius="lg"
          borderColor="coolGray.300"
          bg="white"
          isReadOnly={true}
          dropdownIcon={<></>}
          _selectedItem={{ bg: "coolGray.200", endIcon: null }}
        >
          <Select.Item label="Her Mevsim" value="5" />
          <Select.Item label="İlkbahar" value="4" />
          <Select.Item label="Yaz" value="2" />
          <Select.Item label="Sonbahar" value="3" />
          <Select.Item label="Kış" value="1" />
        </Select>
      </FormControl>

      <FormControl>
        <FormControl.Label>Renk</FormControl.Label>
        <Select
          selectedValue={colorId}
          onValueChange={onColorChange}
          placeholder="Renk Seç"
          borderRadius="lg"
          borderColor="coolGray.300"
          bg="white"
          isReadOnly={true}
          dropdownIcon={<></>}
          _selectedItem={{ bg: "coolGray.200", endIcon: null }}
        >
          {colors.map((color) => (
            <Select.Item
              key={color.id}
              label={color.name}
              value={color.id.toString()}
            />
          ))}
        </Select>
      </FormControl>

      <Button
        onPress={onSubmit}
        isLoading={submitting}
        bg="#054f5c"
        borderRadius="xl"
        _text={{ color: "white" }}
      >
        Kıyafeti Ekle
      </Button>

      <Button
        variant="outline"
        borderColor="gray.400"
        borderRadius="xl"
        onPress={onCancel}
      >
        İptal
      </Button>
    </VStack>
  );
}
