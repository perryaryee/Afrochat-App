import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import DammyData from '../DammyData.js/DammyData1';
import ChatList from '../Components/ChatList';

const AllUsers = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        headerName="Users"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.MainConatainer}>
          {DammyData.map(users => {
            return <ChatList key={users.id} {...users} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  MainConatainer: {
    padding: 15,
  },
});
