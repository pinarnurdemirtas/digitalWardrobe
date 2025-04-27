import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from './MenuScreen';
import InteractionScreen from '../Interaction/InteractionScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#054f5c',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f5fcfc', 
          borderTopWidth: 0, 
          elevation: 10, 
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Menu') iconName = 'view-list';
          else if (route.name === 'Interaction') iconName = 'travel-explore';
          else if (route.name === 'Profile') iconName = 'person';
          return (
            <Icon
              as={MaterialIcons}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Interaction" component={InteractionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
