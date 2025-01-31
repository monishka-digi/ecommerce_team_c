import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../screens/Home/Categories';
import Header from '../components/Header';
import ProductListingScreen from '../screens/PLP/ProductListingScreen';
import Profile from '../screens/Home/Profile';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default BottomTabs;
