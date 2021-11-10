import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ChatList from '../Components/ChatList';
import SearchContainer from '../Components/SearchBar';
import Status from '../Components/Status';
import Chats from '../DammyData.js/DammyData1';
import {useNavigation} from '@react-navigation/core';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomBottomSheet from '../Components/CustomBottomSheet';
import NetInfo from '@react-native-community/netinfo';
import CustomButton from '../Components/CustomButton';
import {Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {selectUser} from '../Redux/Slice/Userslice';
import {selectModal} from '../Redux/Slice/Modalslice';
import {Snackbar} from 'react-native-paper';

// alwaysBounceVertical = true
// automaticallyAdjustContentInsets
// automaticallyAdjustsScrollIndicatorInsets
// snapToStart

const BottomSheet = () => {
  return (
    <View>
      <View
        style={{
          borderBottomColor: '#ddddddd',
          borderBottomWidth: 0.6,
          paddingBottom: 15,
        }}>
        <Text
          style={{
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 18,
            color: '#000000',
          }}>
          Create new chat
        </Text>
      </View>
      <View style={{paddingHorizontal: 8}}>
        <Input placeholder="Add chat" containerStyle={{marginTop: 20}} />
      </View>
    </View>
  );
};

const Chat = () => {
  const [netInfo, setNetInfo] = useState('');
  const modal = useSelector(selectModal);
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(
        state.isConnected === true,
        // `Connection type: ${state.type}
        // Is connected?: ${state.isConnected}
        // IP Address: ${state.details.ipAddress}`,
      );
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  const navigation = useNavigation();
  const [chatname, setchatname] = useState(false);
  const refRBSheet = useRef();

  const title = () => {
    const userDetails = useSelector(selectUser);
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          // paddingHorizontal: 15,
        }}>
        <View style={styles.chatNavBar}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <TouchableOpacity>
            <Text style={{color: '#7119C7', fontSize: 18}}>
              {`Welcome,${userDetails ? userDetails.email : `No user`}`}
              {/* Welcome, Perry! */}
            </Text>
            {/* <AntDesign name="addusergroup" size={22} color="#7119C7" /> */}
          </TouchableOpacity>
          <Text>
            {netInfo ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color="#484848" />
                <Text style={{paddingLeft: 6}}>Connecting...</Text>
              </View>
            )}
          </Text>
          <TouchableOpacity>
            <AntDesign name="addusergroup" size={24} color="#7119C7" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#dddddd',
            borderBottomWidth: 0.6,
            paddingBottom: 20,
          }}>
          <View>
            <Text style={styles.ChatfontSize}>Chats</Text>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <SearchContainer
              onFocus={() => {
                navigation.navigate('Search');
              }}
            />
          </View>

          <View style={styles.chatNavBar3}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllUsers');
              }}>
              <Text style={{color: '#7119C7'}}>All chat</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#7119C7'}}>New Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (Chats.length === 0) {
      return (
        <>
          <View style={styles.NocontentScreen}>
            <AntDesign name="message1" size={80} color="#dddddd" />
            <Text style={{textAlign: 'center', marginTop: 25}}>
              No chat yet.. Click button to add chat
            </Text>
            <View
              style={{
                width: '100%',
                marginTop: 25,
                flex: 1,
                paddingHorizontal: 15,
              }}>
              <CustomButton
                ButtonTitle="ADD NEW CHAT"
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
            </View>
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.HomeConatiner}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          {/* <View>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>Messages</Text>
          </View> */}

          <View>
            {Chats.map(item => {
              return <ChatList key={item.id} {...item} />;
            })}
          </View>
        </View>
      );
    }
  };

  const renderNavBar = () => (
    <View style={[styles.chatNavBar, styles.chatNavBar2]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TouchableOpacity>
        <AntDesign
          name="addusergroup"
          size={22}
          color="#7119C7"
          onPress={() => {
            refRBSheet.current.open();
            StatusBar.setBackgroundColor('#86868C');
          }}
        />
      </TouchableOpacity>

      <Text style={styles.smallChatText}>Chats</Text>

      <TouchableOpacity>
        <AntDesign name="addusergroup" size={24} color="#7119C7" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {modal && (
        <Snackbar
          visible={modal}
          duration={5000}
          style={{
            backgroundColor: 'green',
          }}>
          You are logged In...
        </Snackbar>
      )}
      <CustomBottomSheet
        refRBSheet={refRBSheet}
        BottomSheetContent={BottomSheet}
        onClose={() => {
          StatusBar.setBackgroundColor('#ffffff');
        }}
      />
      <ReactNativeParallaxHeader
        headerMinHeight={60}
        headerMaxHeight={175}
        extraScrollHeight={0}
        // extraScrollHeight={20}
        navbarColor="white"
        alwaysShowNavBar={false}
        alwaysShowTitle={false}
        backgroundColor="white"
        // titleStyle={styles.titleStyle}
        title={title()}
        // backgroundImage="https://i.imgur.com/1CNRvqZ.jpg"
        // backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        // containerStyle={styles.container}
        // contentContainerStyle={styles.contentContainer}
        // innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => setchatname(true),
          onScrollEndDrag: () => setchatname(true),
        }}
      />
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  HomeConatiner: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  SearchContainer: {
    backgroundColor: '#EFEFEF',
    padding: 15,
    borderRadius: 20,
    marginTop: 0,
  },

  ChatfontSize: {
    fontSize: 26,
    color: '#000000',
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  StatusHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  chatNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // padding: 15,
  },
  chatNavBar2: {
    paddingHorizontal: 15,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.6,
    paddingBottom: 13,
    // backgroundColor: '#f5f5f5',
  },
  smallChatText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000000',
  },
  chatNavBar3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 23,
  },
  NocontentScreen: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
});
