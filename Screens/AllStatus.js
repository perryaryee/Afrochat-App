import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchContainer from '../Components/SearchBar';
import {Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StoriesList from '../Components/StoriesList';

const AllStatus = () => {
  return (
    <ScrollView>
      <View style={styles.StatusContainer}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
          // animated={true}
        />
        <View style={styles.AddStatCont}>
          <View style={{padding: 20}}>
            <Text style={styles.SatusfontSize}>Status</Text>
            <SearchContainer />
          </View>
        </View>
        <View style={styles.StatusContainerBottom}>
          <TouchableOpacity
            onPress={() => {
              alert('Hi There, Can you add Statu Pls');
            }}>
            <View style={styles.UploadStat}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
                  }}
                />
                <View style={{paddingLeft: 9}}>
                  <Text>My Status</Text>
                  <Text>Ihr ago</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="camerao" size={24} color="blue" />
                <AntDesign name="camerao" size={24} color="blue" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.StatusListContainer}>
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
            <StoriesList />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AllStatus;

const styles = StyleSheet.create({
  StatusContainer: {
    flex: 1,
    backgroundColor: 'white',

    // padding: 15,
  },
  SatusfontSize: {
    fontSize: 26,
    color: '#484848',
    fontWeight: 'bold',
  },
  AddStatCont: {
    paddingBottom: 20,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  StatusContainerBottom: {
    // padding: 20,
  },
  UploadStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 20,
  },
  StatusListContainer: {
    padding: 20,
    width: '100%',
  },
});
