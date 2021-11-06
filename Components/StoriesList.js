import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';

const StoriesList = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('StatusView');
      }}>
      <View style={styles.StoriesListConatiner}>
        <View>
          <Avatar
            containerStyle={styles.AvatarContainer}
            rounded
            size="medium"
            source={{
              uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
            }}
          />
        </View>
        <View
          style={{
            paddingLeft: 8,
            borderBottomWidth: 0.7,
            borderBottomColor: '#dddddd',
            paddingBottom: 16,
            width: '100%',
          }}>
          <Text style={{paddingBottom: 8, fontWeight: 'bold', fontSize: 17}}>
            Perry
          </Text>
          <Text>12hr ago</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoriesList;

const styles = StyleSheet.create({
  StoriesListConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  AvatarContainer: {
    borderColor: '#484848',
    borderWidth: 2,
  },
});
