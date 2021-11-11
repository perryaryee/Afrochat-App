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
  Image,
  TouchableOpacity,
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
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {userProfileDetails} from '../Redux/Slice/UserProfileSlice';
import noUser from '../assests/noUser.png';

const AddPhoto = () => {
  const [showSpinnerButton, setshowSpinnerButton] = useState(false);
  const [SaveButton, setSaveButton] = useState(true);
  const [showButton, setshowButton] = useState(true);
  const [showButton2, setshowButton2] = useState(true);
  const [DownloadedUrl, setDownloadedUrl] = useState('');
  const dispatch = useDispatch();
  const [Image1, setImage] = useState('');
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

  const StoreData = async data => {
    Keyboard.dismiss();
    setshowButton2(false);
    setSaveButton(false);
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
      setDownloadedUrl(url);
      setshowSpinnerButton(false);
      setshowButton2(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = data => {
    firestore()
      .collection('Users')
      .add({
        username: data.Username,
        status: data.Status,
        profile: DownloadedUrl,
      })
      .then(success => {
        if (success) {
          alert('File uploaded to firestore Sucessfully');
          navigation.navigate('Chat');
        }
      })
      .then(() => {
        dispatch(
          userProfileDetails({
            username: data.Username,
            status: data.Status,
            profile: DownloadedUrl,
          }),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  // const onSubmit = async data => {
  //   Keyboard.dismiss();
  //   setshowButton(false);
  //   setshowSpinnerButton(true);

  //   // try {
  //   //   const url = await storage().ref(filename).getDownloadURL();
  //   //   const users = await firestore().collection('Users').add({
  //   //     username: data.Username,
  //   //     status: data.Status,
  //   //     profile: url,
  //   //   });
  //   //   if (users) {
  //   //     alert('user Successfully Added');
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  // const StoreData = () => {
  //   firestore()
  //     .collection('Users')
  //     .add({
  //       username: data.Username,
  //       status: data.Status,
  //       profile: url,
  //     })
  //     .then(success => {
  //       if (success) {
  //         alert('File uploaded Sucessfully');
  //       }
  //     })
  //     .then(() => {
  //       dispatch(
  //         userProfileDetails({
  //           username: data.Username,
  //           status: data.Status,
  //           profile: url,
  //         }),
  //       );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

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
          {!Image1 ? (
            <TouchableOpacity onPress={UploadFile}>
              <Image
                source={noUser}
                style={{
                  maxWidth: 100,
                  maxHeight: 100,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Avatar
              // icon={{name: 'home'}}
              source={{
                uri: Image1,
              }}
              size={100}
              rounded
              // showEditButton={true}
            />
          )}
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
        {showButton2 && (
          <View style={{marginTop: 13, marginBottom: 10}}>
            <CustomButton ButtonTitle="Save" onPress={StoreData} />
          </View>
        )}
        {showButton && (
          <CustomButton
            ButtonTitle="Complete Profile"
            onPress={handleSubmit(onSubmit)}
          />
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
