import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {UserInactivityProvider} from './context/UserInactivity';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <UserInactivityProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
            </GestureHandlerRootView>
          </UserInactivityProvider>
        </NavigationContainer>
      </PersistGate>
      <Toast />
    </Provider>
  );
}

export default App;
