// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../screens/Home/Categories';
import Header from '../components/Header';
import ProductListingScreen from '../screens/PLP/ProductListingScreen';
import Profile from '../screens/Home/Profile';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />, 
      }}
    >
      <Tab.Screen name="Categories" component={Category} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color: color }}>📂</Text> 
        ),
      }}
        />
      <Tab.Screen name="Products" component={ProductListingScreen} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color: color }}>🛍️</Text>
        ),
      }}
      />
      <Tab.Screen name="Profile" component={Profile} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color: color }}>👤</Text>
        ),
      }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
