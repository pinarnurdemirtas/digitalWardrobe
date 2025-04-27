import React, { useEffect } from "react";
import { ScrollView, Center, VStack, Button, Icon, useToast } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

export default function MenuScreen() {
  const navigation = useNavigation();
  const toast = useToast();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; 
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const actionType = e.data.action.type;

      if (actionType === 'GO_BACK' || actionType === 'POP') {
        e.preventDefault(); 
      }
    });

    return unsubscribe;
  }, [navigation]);

  const menuItems = [
    {
      name: "Kombin Önerisi Al",
      iconLib: MaterialIcons,
      icon: "search",
      route: "FindOutfit",
      bg: "#054f5c",
      color: "white",
    },
    {
      name: "Kıyafet Dolabım",
      iconLib: MaterialCommunityIcons,
      icon: "wardrobe",
      route: "MainCategory",
      bg: "white",
      color: "#054f5c",
    },
    {
      name: "Kombin Oluştur",
      iconLib: MaterialIcons,
      icon: "add",
      route: "AddClothing",
      bg: "white",
      color: "#054f5c",
    },
    {
      name: "Kombinlerim",
      iconLib: MaterialIcons,
      icon: "style",
      route: "MyOutfits",
      bg: "white",
      color: "#054f5c",
    },
    {
      name: "Favorilerim",
      iconLib: MaterialIcons,
      icon: "favorite",
      route: "FavoriteOutfits",
      bg: "white",
      color: "#054f5c",
    },
    {
      name: "Hava Durumu",
      iconLib: MaterialIcons,
      icon: "wb-sunny",
      route: "Weather",
      bg: "white",
      color: "#054f5c",
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="#f0f4f8" px="6" py="12">
        <VStack space={6} w="100%">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              bg={item.bg}
              _pressed={{ bg: item.bg, opacity: 1 }}
              _text={{
                color: item.color,
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "left",
              }}
              leftIcon={
                <Icon
                  as={item.iconLib}
                  name={item.icon}
                  size={7}
                  color={item.color}
                />
              }
              onPress={() => navigation.navigate(item.route)}
              borderRadius="xl"
              py="5"
              px="4"
              justifyContent="flex-start"
              shadow={2}
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
}
