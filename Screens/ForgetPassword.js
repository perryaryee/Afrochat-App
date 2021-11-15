import React, {useState} from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import {CustomHeader} from '../Components/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import auth from '@react-native-firebase/auth';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [showButton, setshowButton] = useState(true);
  const [showSpinButton, setshowSpinButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    Keyboard.dismiss();
    setshowButton(false);
    setshowSpinButton(true);
    try {
      const user = await auth().sendPasswordResetEmail(data.Email);
      setshowButton(true);
      setshowSpinButton(false);
      if (user) {
        alert('User successfully created');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.containerStyles}>
      <CustomHeader
        headerName="Reset Password"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.mainCont}>
        <View
          style={{flexDirection: 'row', paddingHorizontal: 10, marginTop: 20}}>
          <AntDesign name="tago" color="black" size={23} />
          <Text style={{paddingLeft: 10}}>
            Please type in your e-mail address.we will send you a link to this
            email address to resert you password.
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
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
                error={errors.Email && <Text>This is required.</Text>}
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
        </View>
        <View style={{marginTop: 25}}>
          {showButton && (
            <CustomButton
              ButtonTitle="RESERT PASSWORD"
              onPress={handleSubmit(onSubmit)}
            />
          )}
          {showSpinButton && <ButtonWithSpinner />}
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainCont: {
    padding: 15,
  },
});
