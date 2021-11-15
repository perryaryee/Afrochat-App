import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import logo from '../assests/logo.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import auth from '@react-native-firebase/auth';
import {Close_Modal, Show_Modal} from '../Redux/Slice/Modalslice';
import {useDispatch} from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [showlogo, setshowlogo] = useState(true);
  const [showLogo2, setshowLogo2] = useState(true);
  const [signUpButton, setsignUpButton] = useState(true);
  const [SpinButton, setSpinButton] = useState(false);

  const onSubmit = data => {
    Keyboard.dismiss();
    setsignUpButton(false);
    setSpinButton(true);
    auth()
      .signInWithEmailAndPassword(data.Email, data.Password)
      .then(user => {
        setSpinButton(false);
        if (user) {
          navigation.replace('Chat');
          dispatch(Show_Modal());
          setTimeout(() => {
            dispatch(Close_Modal());
          }, 3000);
        }
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          alert('Invalid email please try again');
        } else if (err.code === 'auth/wrong-password') {
          alert('Invalid Password..Please try again.');
        } else if (err.code === 'auth/network-request-failed') {
          alert(
            'Connection timeout..please check your internet connection and try again.Thank you',
          );
        } else if (err.code === 'auth/user-not-found') {
          alert('Invalid Email and Password please try again..');
        }
        console.log(err);
        setSpinButton(false);
        setsignUpButton(true);
        // alert(err.message);
      });
  };
  return (
    <View
      style={styles.LoginContainer}
      onPress={() => {
        setshowlogo(!showlogo) || setshowLogo2(!showLogo2);
      }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {showLogo2 && (
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
                disabled={SpinButton ? true : false}
                error={errors.Email && <Text>required field!!</Text>}
                // onFocus={() => {
                //   setshowlogo(false);
                // }}
                label="Email"
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
            name="Email"
            defaultValue=""
          />
          {errors.Password && (
            <Text style={{paddingLeft: 8, paddingTop: 8, color: 'red'}}>
              required field !!
            </Text>
          )}
          <Controller
            disabled={SpinButton ? true : false}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                // onFocus={() => {
                //   setshowLogo2(false);
                // }}
                label="Password"
                outlineColor="#ddddde"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="pink"
                style={{
                  marginHorizontal: 8,
                  backgroundColor: 'f5f5f5',
                }}
                error={errors.Password && <Text>This is required.</Text>}
                secureTextEntry
                right={<TextInput.Icon name="eye-slash" />}
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
              ButtonTitle="LOGIN"
              onPress={handleSubmit(onSubmit)}
            />
          )}
          {SpinButton && <ButtonWithSpinner />}
          <View style={{marginTop: 13}}>
            <Button
              onPress={() => {
                navigation.navigate('ForgetPassword');
              }}
              buttonStyle={{
                // width: '100%',
                padding: 13,
                borderRadius: 25,
                backgroundColor: '#ffffff',
                borderColor: '#7119C7',
                borderWidth: 2,
              }}
              title="FORGET PASSWORD?"
              titleStyle={{
                color: '#7119C7',
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.BottomContainer}>
        <Text>Dont have acccount?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{color: '#B07EDF', paddingLeft: 5}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.6,
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
