/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './src/navigation/BottomTabs';
import LoginScreen from './src/screens/Auth/LoginScreen';
import ProductDetailsScreen from './src/screens/PDP/ProductDetailsScreen';
import ProductListingScreen from './src/screens/PLP/ProductListingScreen';
import CartScreen from './src/screens/Cart/CartScreen';
import CheckoutScreen from './src/screens/Cart/CheckoutScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="PDP" component={ProductDetailsScreen} />
        <Stack.Screen name="PLP" component={ProductListingScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
