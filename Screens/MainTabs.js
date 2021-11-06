import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ButtomTab from './Screens/ButtomTab';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Chatroom from './Screens/Chatroom';
import AllStatus from './Screens/AllStatus';
import StatusView from '../Screens/StatusView';
import Search from './Screens/Search';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';

const Stack = createStackNavigator();
const navigation = useNavigation();

const MainTabs = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Chat"
        component={ButtomTab}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chatroom"
        component={Chatroom}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="left"
                color="black"
                size={23}
                style={{paddingLeft: 8}}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <View>
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
                  }}
                />
              </View>
              <View style={{paddingLeft: 10}}>
                <Text>Perry</Text>
                <Text>Online</Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign.Button
                name="phone"
                size={25}
                color="#7119C7"
                style={{backgroundColor: 'white'}}
                onPress={() => {
                  alert('Hi There, This function is not yet working');
                }}
              />
              <AntDesign.Button
                name="videocamera"
                size={25}
                style={{backgroundColor: 'white'}}
                color="#7119C7"
                onPress={() => {
                  alert('Hi There, This function is not yet working');
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AllStatus"
        component={AllStatus}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="StatusView" component={StatusView} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
