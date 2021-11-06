import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBar = ({value, onChange, onFocus}) => {
  return (
    <View style={styles.SearchContainer}>
      <AntDesign name="search1" size={20} color="#B5B2B9 " />
      <TextInput
        placeholder="Search"
        style={styles.InPuteStyle}
        placeholderTextColor="#C7C7C7"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  SearchContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  InPuteStyle: {
    paddingLeft: 8,
    fontSize: 18,
    width: '100%',
    height:40
  },
});
