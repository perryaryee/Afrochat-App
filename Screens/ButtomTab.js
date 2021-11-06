/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../Screens/Chat';
import Settings from '../Screens/Settings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatStack from '../Screens/ChatStack';
import AllStatus from '../Screens/AllStatus';
import Entypo from 'react-native-vector-icons/Entypo';
import Camera from '../Screens/Camera';

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarInactiveTintColor: '#dddddd',
        tabBarActiveTintColor: '#7119C7',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          // elevation: 10,
          borderColor: '#dddddd',
          borderWidth: 0.6,
        },
      }}
      // initialRouteName="Chat"
      // activeColor="#730C99"
      // inactiveColor="#484848"
      // barStyle={{
      //   backgroundColor: '#FFFFFF',
      //   elevation: 10,
      //   borderColor: '#dddddd',
      //   borderWidth: 0.6,
      // }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarBadge: 12,
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarIcon: ({color}) => (
            <AntDesign name="message1" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (
            <AntDesign name="camerao" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={AllStatus}
        options={{
          headerShown: false,
          tabBarLabel: 'Status',
          tabBarIcon: ({color}) => (
            <Entypo name="circular-graph" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="AllStatus"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: 'Settigs',
          tabBarIcon: ({color}) => (
            <AntDesign name="setting" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtomTab;

const styles = StyleSheet.create({});
