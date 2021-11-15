import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {TextInput} from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import noUser from '../assests/noUser.png';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Newgroup = ({navigation}) => {
  const [Image1, setImage] = useState('');
  const [showSpinnerButton, setshowSpinnerButton] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [Groupname, setGroupname] = useState('');
  const [DownloadedUrl, setDownloadedUrl] = useState('');

  const uploadFile = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
    } catch (error) {}
  };
  const CreateGroup = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        headerName="Create new chat"
      />
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          paddingHorizontal: 8,
          flexDirection: 'row',
        }}>
        {!Image1 ? (
          <TouchableOpacity onPress={uploadFile}>
            <Image
              source={noUser}
              style={{
                maxWidth: 100,
                maxHeight: 100,
                flex: 4,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Avatar
            // icon={{name: 'home'}}
            source={{
              uri: Image1,
            }}
            size="large"
            rounded
            // showEditButton={true}
          />
        )}
        <Text style={{marginTop: 10, flex: 6}}>
          Please provide a group Subject and optional icon, will be appropirate
          if you add a group icon.Thank you.
        </Text>
      </View>
      <View style={{marginHorizontal: 8}}>
        <TextInput
          style={{
            marginHorizontal: 8,
            backgroundColor: 'f5f5f5',
          }}
          placeholder="Group name!"
          value={Groupname}
          onChangeText={groupname => {
            setGroupname(groupname);
          }}
          label="Group name"
          outlineColor="#ddddde"
        />
      </View>
      <View style={{marginHorizontal: 8, marginTop: 30}}>
        {showButton && (
          <CustomButton
            ButtonTitle="CREATE CHAT"
            onPress={CreateGroup}
            disabled={!Groupname}
          />
        )}
        {showSpinnerButton && <ButtonWithSpinner />}
      </View>
    </View>
  );
};

export default Newgroup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
