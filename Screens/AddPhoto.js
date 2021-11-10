import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {Input, Avatar} from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import {useNavigation} from '@react-navigation/core';
import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const AddPhoto = () => {
  const [showSpinnerButton, setshowSpinnerButton] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [Image, setImage] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const UploadFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const onSubmit = async data => {
    Keyboard.dismiss();
    setshowButton(false);
    setshowSpinnerButton(true);

    const uploadUri = Image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Adding Time stamp to image to avoid overriding.
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    try {
      await storage().ref(filename).putFile(uploadUri);
      const url = await storage().ref(filename).getDownloadURL();
      console.log(url);
      // const downloadedImageUri = await  filename.getD
      setshowSpinnerButton(false);
      setshowButton(true);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <CustomHeader headerName="Profile" />

      <View style={styles.Container2}>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.TextHeaders}>Create username</Text>
          <Text style={styles.subHeaders}>
            You can always change this later
          </Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              // disabled={SpinButton ? true : false}
              error={errors.Username && <Text>required field!!</Text>}
              // onFocus={() => {
              //   setshowlogo(!showlogo);
              // }}
              label="Username"
              outlineColor="#ddddde"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              activeOutlineColor="pink"
              style={{
                marginHorizontal: 8,
                backgroundColor: 'f5f5f5',
              }}
            />
          )}
          name="Username"
          defaultValue=""
        />
        {errors.Username && (
          <Text style={{paddingLeft: 8, paddingTop: 8, color: 'red'}}>
            required field !!
          </Text>
        )}
      </View>

      <View style={styles.Container2}>
        <View style={{paddingHorizontal: 8}}>
          <Text style={styles.TextHeaders}>Add status</Text>
          <Text style={styles.subHeaders}>
            You can always change this later
          </Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              // disabled={SpinButton ? true : false}
              error={errors.Status && <Text>required field!!</Text>}
              // onFocus={() => {
              //   setshowlogo(!showlogo);
              // }}
              label="Status"
              outlineColor="#ddddde"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              activeOutlineColor="pink"
              style={{
                marginHorizontal: 8,
                backgroundColor: 'f5f5f5',
              }}
            />
          )}
          name="Status"
          defaultValue=""
        />
        {errors.Status && (
          <Text style={{paddingLeft: 8, paddingTop: 8, color: 'red'}}>
            required field !!
          </Text>
        )}
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
            // icon={}
            source={{
              uri: Image,
            }}
            size="large"
            rounded
            showEditButton={true}
            onPress={UploadFile}
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
        {showButton && (
          <CustomButton ButtonTitle="Complete Profile" onPress={onSubmit} />
        )}
        {showSpinnerButton && (
          <ButtonWithSpinner
            onPress={() => {
              navigation.navigate('Chat');
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
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
