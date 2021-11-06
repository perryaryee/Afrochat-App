import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SettingsList from '../Components/SettingsList';

const Settings = () => {
  return (
    <View style={styles.SettingsContainer}>
      <ScrollView>
        <View style={{height: hp('15%'), paddingVertical: 8}}>
          <Text style={styles.SatusfontSize}>Settings</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1382626004615708675/W07hdvhg_400x400.jpg',
              }}
            />
            <View style={{paddingLeft: 8}}>
              <Text>Perry Aryee</Text>
              <Text>what ever it takes...</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <SettingsList />
          <SettingsList />
          <SettingsList />
          <SettingsList />
          <SettingsList />
          <SettingsList />
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <View>
          <Text style={{textAlign: 'center'}}>from</Text>
          <Text style={{fontWeight: '800', color: '#484848'}}>
            FLEXPROGRMMER
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  SettingsContainer: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    padding: 15,
    backgroundColor: 'white',
  },
  SatusfontSize: {
    fontSize: 26,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 23,
  },
  BottomContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
