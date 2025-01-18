/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/components/LoginScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from './src/components/Category';
import PDP from './src/components/PDP';
import PLP from './src/components/PLP';
import BottomTabs from './src/navigation/BottomTabs';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
        {/* <LoginScreen /> */}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
