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

const Login = () => {
  const navigation = useNavigation();
  const [focus, setfocuse] = useState({
    nameFocus: false,
    emaliFocus: false,
    passwordFocus: false,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [showlogo, setshowlogo] = useState(true);

  const onSubmit = data => {};
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
      <View style={{paddingHorizontal: 50}}>
        <Text style={{textAlign: 'center'}}>
          Welcom to AfroChat..Make sure out Lgoin with your email and Password
        </Text>
      </View>
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
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
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
          <CustomButton ButtonTitle="LOGIN" onPress={handleSubmit(onSubmit)} />
          <View style={{marginTop: 13}}>
            <Button
              onPress={() => {
                navigation.navigate('ForgetPassword');
              }}
              buttonStyle={{
                // width: '100%',
                padding: 15,
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
