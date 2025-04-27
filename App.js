import React from "react";
import { NativeBaseProvider, Button } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import MenuScreen from "./screens/Home/MenuScreen";
import WeatherScreen from "./screens/Weather/WeatherScreen";
import MainCategoryScreen from "./screens/Category/MainCategoryScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import SubCategoryScreen from "./screens/Category/SubCategoryScreen";
import ClothesScreen from "./screens/Clothes/ClothesScreen";
import MyOutfitsScreen from "./screens/Outfits/MyOutfitsScreen";
import InteractionScreen from "./screens/Interaction/InteractionScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import FavoriteOutfitsScreen from "./screens/Outfits/FavoriteOutfitsScreen";
import CreateCombineScreen from "./screens/Outfits/CreateCombineScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#f5fcfc" },
            headerTintColor: "#054f5c",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Hoşgeldiniz" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Kayıt Ol" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Digital Wardrobe",
              headerLeft: () => null,
              headerRight: () => (
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="logout"
                      size="lg"
                      color="#054f5c"
                    />
                  }
                  onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.replace("Login");
                  }}
                  borderRadius="full"
                  _pressed={{ bg: "#e0f2f1" }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: "Digital Wardrobe" }}
          />
          <Stack.Screen
            name="Weather"
            component={WeatherScreen}
            options={{ title: "Digital Wardrobe" }}
          />
          <Stack.Screen
            name="MainCategory"
            component={MainCategoryScreen}
            options={{ title: "Kategoriler" }}
          />
          <Stack.Screen
            name="SubCategoryScreen"
            component={SubCategoryScreen}
            options={{ title: "Alt Kategoriler" }}
          />
          <Stack.Screen
            name="Clothes"
            component={ClothesScreen}
            options={{ title: "Kıyafetler" }}
          />
          <Stack.Screen
            name="MyOutfits"
            component={MyOutfitsScreen}
            options={{ title: "Kombinler" }}
          />
          <Stack.Screen
            name="Interaction"
            component={InteractionScreen}
            options={{ title: "Keşfet" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profil" }}
          />
          <Stack.Screen
            name="AddClothing"
            component={CreateCombineScreen}
            options={{ title: "Kombin Oluştur" }}
          />
          <Stack.Screen
            name="FavoriteOutfits"
            component={FavoriteOutfitsScreen}
            options={{ title: "Favori Kombinler" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
