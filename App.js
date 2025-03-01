import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MenuScreen from "./screens/MenuScreen";
import WeatherScreen from "./screens/WeatherScreen";
import MyClosetScreen from "./screens/MyClosetScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#054f5c" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Digital Wardrobe" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Digital Wardrobe" }}
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
            name="MyCloset"
            component={MyClosetScreen}
            options={{ title: "Digital Wardrobe" }}
          />
         
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
