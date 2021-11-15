import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ButtomTab from './ButtomTab';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Chatroom from './Chatroom';
import AllStatus from './AllStatus';
import Search from './Search';
import StatusView from './StatusView';
import Login from './Login';
import SignUp from './SignUp';
import AddPhoto from './AddPhoto';
import AllUsers from './AllUsers';
import PhotoCapture from './PhotoCapture';
import ForgetPassword from './ForgetPassword';
import {useSelector} from 'react-redux';
import {selectProfileDetails} from '../Redux/Slice/UserProfileSlice';
import Newgroup from './Newgroup';
const Stack = createStackNavigator();

const StackNavigator = () => {
  const userProfileDetails = useSelector(selectProfileDetails);
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      // initialRouteName={!userProfileDetails ? 'Login' : 'Chat'}
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
      <Stack.Screen name="Newgroup" component={Newgroup} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
