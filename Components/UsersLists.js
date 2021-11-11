import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
// import {Avatar} from 'react-native-paper';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const UsersLists = ({profile, status, username}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        alert(
          'Hi there, Afrochat is only restricted to group messaging only,private chat will be added in the next version.Thank you.',
        );
      }}>
      <View style={styles.ChatListContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: wp('100%'),
          }}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: profile,
            }}
          />

          <View
            style={{
              paddingLeft: 14,
              borderBottomWidth: 0.8,
              borderBottomColor: '#dddddd',
              paddingBottom: 18,
              width: '100%',
            }}>
            <Text
              style={{fontWeight: '500', paddingBottom: 6, color: '#000000'}}>
              {username}
            </Text>
            <Text>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UsersLists;

const styles = StyleSheet.create({
  ChatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  StatusContainer: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    // backgroundColor: '#8957BC',
    flex: 20,

    backgroundColor: 'white',
    borderColor: '#8957BC',
    borderWidth: 2,
  },
});
