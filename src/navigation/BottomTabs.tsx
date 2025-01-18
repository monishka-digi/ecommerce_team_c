// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../screens/Home/Category';
import Header from '../components/Header';
import ProductListingScreen from '../screens/PLP/ProductListingScreen';
import Profile from '../screens/Home/Profile';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />, 
      }}
    >
      <Tab.Screen name="Categories" component={Category} />
      <Tab.Screen name="Products" component={ProductListingScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
