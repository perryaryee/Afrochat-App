import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingsList = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.SettingListFlex}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Hello</Text>
          <Text
            style={{
              paddingLeft: 8,
              borderBottomWidth: 0.6,
              borderBottomColor: '#dddddd',
            }}>
            Starred Messages
          </Text>
        </View>
        <AntDesign name="right" color="#dddddd" size={15} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsList;

const styles = StyleSheet.create({
  SettingListFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    backgroundColor: 'white',
  },
});
