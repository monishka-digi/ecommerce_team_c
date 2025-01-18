/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/components/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
     <LoginScreen />
      </Provider>
  );
}

export default App;
