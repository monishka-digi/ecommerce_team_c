import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProductDetailsScreen from '../screens/PDP/ProductDetailsScreen';
import ProductListingScreen from '../screens/PLP/ProductListingScreen';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Cart/CheckoutScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="PDP" component={ProductDetailsScreen} options={{ title: 'Product Details', headerShown: true }} />
      <Stack.Screen name="PLP" component={ProductListingScreen}  />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
