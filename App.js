import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ButtomTab from './Screens/ButtomTab';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Chatroom from './Screens/Chatroom';
import AllStatus from './Screens/AllStatus';
import Search from './Screens/Search';
import StatusView from './Screens/StatusView';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import AddPhoto from './Screens/AddPhoto';
import AllUsers from './Screens/AllUsers';
import PhotoCapture from './Screens/PhotoCapture';
import ForgetPassword from './Screens/ForgetPassword';

const Stack = createStackNavigator();

const App = () => {
  // const user = null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}>
        <Stack.Screen name="Chat" component={ButtomTab} />
        <Stack.Screen name="Chatroom" component={Chatroom} />
        <Stack.Screen name="AllStatus" component={AllStatus} />
        <Stack.Screen name="StatusView" component={StatusView} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
        <Stack.Screen name="AllUsers" component={AllUsers} />
        <Stack.Screen name="PhotoCapture" component={PhotoCapture} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
