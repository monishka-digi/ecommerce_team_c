// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../components/Category';
import PLP from '../components/PLP';
import Profile from '../components/Profile';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
    //   screenOptions={{
    //     header: (props) => <Header {...props} />, 
    //   }}
    >
      <Tab.Screen name="Categories" component={Category} />
      <Tab.Screen name="Products" component={PLP} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
