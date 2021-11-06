/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

const Status = () => {
  return (
    <TouchableOpacity>
      <View style={{marginHorizontal: 5}}>
        <Avatar
          containerStyle={{
            borderColor: '#7119C7',
            borderWidth: 2,
          }}
          rounded
          size="medium"
          source={{
            uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
          }}
        />
      </View>
      <View style={{marginTop: 5}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Perry</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Status;

const styles = StyleSheet.create({
  StatusContainer: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    // backgroundColor: '#8957BC',
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: '#8957BC',
    borderWidth: 2,
  },
});
