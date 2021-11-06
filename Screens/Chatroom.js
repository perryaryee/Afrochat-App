/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ChatroomHeader} from '../Components/CustomHeader';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getCurrentScope} from 'immer/dist/internal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const Chatroom = () => {
  const navigation = useNavigation();

  const [getMessage, setgetMessage] = useState('');
  const [Messages, setMessages] = useState([]);

  const HandleChange = message => {
    setgetMessage(message);
  };

  const HandleSend = () => {
    setMessages([...Messages, getMessage]);
    setgetMessage('');
  };

  const user = 'Perry';

  return (
    <KeyboardAvoidingView style={styles.ChatroomContainer}>
      <ChatroomHeader
        Backbutton={() => {
          navigation.goBack();
        }}
      />
      {/* <ImageBackground
        resizeMode="cover"
        style={{
          height: hp('85%'),
          width: '100%',
        }}
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}> */}
      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <View style={styles.chatRoomStyle}>
          {Messages.map(message =>
            user === 'Perry' ? (
              <Animatable.View
                style={styles.reciever}
                animation="fadeInUpBig"
                duration={1000}>
                <Avatar
                  position="absolute"
                  bottom={-15}
                  left={-5}
                  containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    right: -5,
                  }}
                  rounded
                  size={30}
                  source={{
                    uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
                  }}
                />
                <Text style={styles.recieverText}>{message}</Text>
                <Text style={styles.recieverName}>Perry Aryee</Text>
              </Animatable.View>
            ) : (
              <Animatable.View
                style={styles.sender}
                animation="fadeInUpBig"
                duration={1000}>
                <Avatar
                  position="absolute"
                  bottom={-15}
                  left={-5}
                  containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    right: -5,
                  }}
                  rounded
                  size={30}
                  source={{
                    uri: 'https://i2-prod.dailystar.co.uk/incoming/article19373759.ece/ALTERNATES/s1227b/0_httpscdnimagesdailystarcoukdynamic122photos257000900x7381397257',
                  }}
                />
                <Text style={styles.senderText}>{message}</Text>
                <Text style={styles.senderName}>Perry Aryee</Text>
              </Animatable.View>
            ),
          )}
        </View>
      </ScrollView>
      {/* </ImageBackground> */}

      <View style={styles.SendMessageConatiner}>
        <View style={{width: wp('85%')}}>
          <TextInput
            value={getMessage}
            onChangeText={HandleChange}
            // multiline={true}
            style={{
              borderWidth: 0.4,
              borderColor: '#7119C7',
              borderRadius: 25,
              paddingLeft: 10,
              backgroundColor: 'white',
              flex: 1,
              // height: 40,
            }}
          />
        </View>
        <View style={{width: wp('15%')}}>
          <TouchableOpacity onPress={HandleSend} disabled={!getMessage}>
            <MaterialCommunityIcons
              name="send"
              color="#7119C7"
              size={30}
              style={{paddingLeft: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatroom;

const styles = StyleSheet.create({
  ChatroomContainer: {
    flex: 1,
    backgroundColor: 'white',

    // padding: 8,
  },
  SendMessageConatiner: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: hp('13%'),
    backgroundColor: '#f5f5f5',
    width: '100%',
    // marginBottom: 20,
  },
  chatRoomStyle: {
    padding: 10,
    // flex: 100,
    width: '100%',
  },
  reciever: {
    padding: 15,
    backgroundColor: '#B07EDF',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },

  sender: {
    padding: 15,
    backgroundColor: '#E6D7F4',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  recieverName: {},
});
