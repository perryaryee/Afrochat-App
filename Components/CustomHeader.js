import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Avatar} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomHeader = ({onPressBack, headerName}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Entypo
          name="chevron-thin-left"
          color="#000000"
          size={23}
          style={{
            fontWeight: 'bold',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.headerText}>{headerName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert('Hello world');
        }}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChatroomHeader = ({Backbutton}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={Backbutton}>
          <AntDesign name="left" color="#000000" size={23} />
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 22}}>
          <Avatar
            rounded
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeY7sDml7oPyE1qlDO82FReMxUbCy_SGpEw&usqp=CAU',
            }}
          />
          <View style={{paddingLeft: 10}}>
            <Text style={styles.chatheadername}>React Arena</Text>
            <Text>online</Text>
          </View>
        </View>
      </View>

      <SimpleLineIcons name="call-out" color="#dddddd" size={21} />
    </View>
  );
};
export {CustomHeader, ChatroomHeader};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.8,
    paddingHorizontal: 12,
    height: 50,
  },
  headerText: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 16,
  },
  chatheadername: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
});
