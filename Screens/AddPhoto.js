import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {Input, Avatar} from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import {useNavigation} from '@react-navigation/core';

const AddPhoto = () => {
  const [showSpinnerButton, setshowSpinnerButton] = useState(false);
  const [showButton, setshowButton] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <CustomHeader headerName="Profile" />

      <View style={styles.Container2}>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.TextHeaders}>Create username</Text>
          <Text style={styles.subHeaders}>
            You can always change this later
          </Text>
        </View>
        <Input placeholder="Add username" />
      </View>

      <View style={styles.Container2}>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.TextHeaders}>Add status</Text>
          <Text style={styles.subHeaders}>
            You can always change this later
          </Text>
        </View>
        <Input placeholder="Add username" />
      </View>
      <View style={styles.PhotoContainer}>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.TextHeaders}>Add profile picture </Text>
          <Text style={styles.subHeaders}>
            You can always change this later
          </Text>
        </View>
        <View style={{paddingHorizontal: 8}}>
          <Avatar
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1382626004615708675/W07hdvhg_400x400.jpg',
            }}
            size="large"
            rounded
            showEditButton={true}
          />
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 8,
          width: '100%',
          marginTop: 30,
          position: 'absolute',
          bottom: 0,
          marginBottom: 15,
        }}>
        {showButton && <CustomButton ButtonTitle="Complete Profile" />}
        {setshowSpinnerButton && (
          <ButtonWithSpinner
            onPress={() => {
              navigation.navigate('Chat');
            }}
          />
        )}
      </View>
    </View>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Container2: {
    padding: 12,
    marginTop: 20,
  },
  PhotoContainer: {
    marginTop: 20,
    padding: 12,
  },
  TextHeaders: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#484848',
    paddingBottom: 10,
  },
  subHeaders: {
    paddingBottom: 24,
  },
});
