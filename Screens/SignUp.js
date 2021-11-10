import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import logo from '../assests/logo.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {login} from '../Redux/Slice/Userslice';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import {Close_Modal, Show_Modal} from '../Redux/Slice/Modalslice';
import storage from '@react-native-firebase/storage';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [showlogo, setshowlogo] = useState(true);
  const [signUpButton, setsignUpButton] = useState(true);
  const [SpinButton, setSpinButton] = useState(false);

  const onSubmit = data => {
    setsignUpButton(false);
    setSpinButton(true);
    Keyboard.dismiss();
    auth()
      .createUserWithEmailAndPassword(data.Email, data.Password)
      .then(userAuth => {
        setSpinButton(false);
        // console.log(user);
        if (userAuth) {
          auth().currentUser.updateProfile({
            displayName: data.Username,
          });
          navigation.replace('AddPhoto');
          dispatch(Show_Modal());
          setTimeout(() => {
            dispatch(Close_Modal());
          }, 3000);
        }
      })
      .then(() => {
        dispatch(
          login({
            username: data.Username,
            email: userAuth.user.email,
            user_id: userAuth.user.uid,
          }),
        );
      })
      .catch(err => {
        // console.log(err);
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already exist., Please try another email and continue');
        }
        setSpinButton(false);
        setsignUpButton(true);
        alert(err.message);
      });
  };
  return (
    <View style={styles.LoginContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {showlogo && (
        <Image
          source={logo}
          style={{
            maxHeight: hp('30%'),
            maxWidth: wp('70%'),
            alignSelf: 'center',
          }}
        />
      )}
      <View style={styles.mainConatiner}>
        <View style={styles.InputStyles}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                error={errors.Email && <Text>required field!!</Text>}
                onFocus={() => {
                  setshowlogo(!showlogo);
                }}
                label="Username"
                outlineColor="#ddddde"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="pink"
                style={{
                  marginHorizontal: 8,
                  backgroundColor: 'f5f5f5',
                  marginTop: 10,
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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                error={errors.Email && <Text>required field!!</Text>}
                onFocus={() => {
                  setshowlogo(!showlogo);
                }}
                label="Email"
                outlineColor="#ddddde"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="pink"
                style={{
                  marginHorizontal: 8,
                  backgroundColor: 'f5f5f5',
                  marginTop: 10,
                }}
              />
            )}
            name="Email"
            defaultValue=""
          />
          {errors.Email && (
            <Text style={{paddingLeft: 8, paddingTop: 8, color: 'red'}}>
              required field !!
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                error={errors.Email && <Text>required field!!</Text>}
                onFocus={() => {
                  setshowlogo(!showlogo);
                }}
                label="Password"
                outlineColor="#ddddde"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="pink"
                style={{
                  marginHorizontal: 8,
                  backgroundColor: 'f5f5f5',
                  marginTop: 10,
                }}
              />
            )}
            name="Password"
            defaultValue=""
          />
          {errors.Password && (
            <Text style={{paddingLeft: 8, paddingTop: 8, color: 'red'}}>
              required field !!
            </Text>
          )}
        </View>

        <View style={styles.ButtonStyles}>
          {signUpButton && (
            <CustomButton
              ButtonTitle="REGISTER"
              onPress={handleSubmit(onSubmit)}
            />
          )}

          {SpinButton && <ButtonWithSpinner />}
        </View>
      </View>

      <View style={styles.BottomContainer}>
        <Text>Dont have acccount?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddPhoto');
          }}>
          <Text style={{color: '#B07EDF', paddingLeft: 5}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainConatiner: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
  },
  ButtonStyles: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  InputStyles: {
    width: '100%',
    paddingHorizontal: 7,
  },

  BottomContainer: {
    position: 'absolute',
    bottom: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
