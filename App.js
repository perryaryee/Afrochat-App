import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './Redux/Store/Store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistStore} from 'redux-persist';
import StackNavigator from './Screens/StackNavigator';


const App = () => {
  const persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator></StackNavigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
