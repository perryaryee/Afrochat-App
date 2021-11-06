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

const SignUp = ({navigation}) => {
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
          <CustomButton
            ButtonTitle="REGISTER"
            onPress={handleSubmit(onSubmit)}
          />
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
