import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import DammyData from '../DammyData.js/DammyData1';
import ChatList from '../Components/ChatList';
import UsersLists from '../Components/UsersLists';
import firestore from '@react-native-firebase/firestore';

const AllUsers = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchusers = async () => {
      const usersCollection = await firestore().collection('Users').get();
      setUsers(
        usersCollection.docs.map(doc => {
          doc.data();
        }),
      );
    };
    fetchusers();
  }, []);
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
          {Users.map(user => {
            return (
              <UsersLists
                profile={user}
                // profile={user.profile}
                // username={user.username}
                // status={user.status}
              />
            );
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
