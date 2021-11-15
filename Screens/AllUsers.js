import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import DammyData from '../DammyData.js/DammyData1';
import ChatList from '../Components/ChatList';
import UsersLists from '../Components/UsersLists';
import firestore from '@react-native-firebase/firestore';

const AllUsers = () => {
  const [Users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchusers = async () => {
      setloading(true);
      await firestore()
        .collection('Users')
        .onSnapshot(snapshot => {
          setloading(false);
          setUsers(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
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
        {loading ? (
          <View style={{marginTop: 10}}>
            <ActivityIndicator size="large" color="#7119C7" />
          </View>
        ) : (
          <View style={styles.MainConatainer}>
            {Users.map(({id, data}) => {
              return (
                <UsersLists
                  // id={id}
                  key={id}
                  profile={data.profile}
                  username={data.username}
                  status={data.status}
                />
              );
            })}
          </View>
        )}
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
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
