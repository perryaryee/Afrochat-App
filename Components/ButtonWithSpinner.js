import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const ButtonWithSpinner = ({ onPress }) => {
    return (
        <Button
            //   loading
            onPress={onPress}
            buttonStyle={{
                // width: '100%',
                padding: 15,
                borderRadius: 25,
                backgroundColor: '#7119C7',
            }}
        />
    );
};

export default ButtonWithSpinner;

const styles = StyleSheet.create({});
