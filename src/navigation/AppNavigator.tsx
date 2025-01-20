import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProductDetailsScreen from '../screens/PDP/ProductDetailsScreen';
import ProductListingScreen from '../screens/PLP/ProductListingScreen';
import CartScreen from '../screens/Cart/CheckoutScreen';
import CategoriesProduct from '../screens/PLP/CategoriesProduct';
import {Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import AddressesScreen from '../screens/Addresses/AddressScreen';
import ConformationScreen from '../screens/OrderConformation/ConfirmationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {cartItems} = useSelector(state => state?.cart);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen
        name="PDP"
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log('Icon pressed!')}
              style={{marginRight: 15}}>
              <Text style={{fontSize: 25}}>
                {'🛒'}
                {cartItems?.length}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CategoriesProducts"
        component={CategoriesProduct}
        options={{title: 'Categories Product Details', headerShown: true, headerRight: () => (
          <TouchableOpacity
            onPress={() => console.log('Icon pressed!')}
            style={{marginRight: 15}}>
            <Text style={{fontSize: 25}}>
              {'🛒'}
              {cartItems?.length}
            </Text>
          </TouchableOpacity>
        ),}}
      />

      <Stack.Screen name="PLP" component={ProductListingScreen} />
      <Stack.Screen name="Checkout" component={CartScreen} options={{title: 'Checkout', headerShown: true }}/>
      <Stack.Screen name="Addresses" component={AddressesScreen} options={{title: 'Address Details', headerShown: true }} />
      <Stack.Screen name="OrderConformation" component={ConformationScreen} />

      
    </Stack.Navigator>
  );
};

export default AppNavigator;
