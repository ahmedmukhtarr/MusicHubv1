import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MusicScreen from '../screens/MusicScreen';
import MerchandiseScreen from '../screens/MerchandiseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" size={size} color={color} />
          ),
        }}
      />

      
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Merchandise"
        component={MerchandiseScreen}
        options={{
          tabBarLabel: 'Merchandise',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tshirt-crew" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}