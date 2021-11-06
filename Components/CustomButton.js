import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const CustomButton = ({ButtonTitle, onPress, disabled}) => {
  return (
    <Button
      title={ButtonTitle}
      onPress={onPress}
      disabled={disabled}
      buttonStyle={{
        // width: '100%',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#7119C7',
      }}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
