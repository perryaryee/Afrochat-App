import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
  Image,
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
// import {Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {selectUser} from '../Redux/Slice/Userslice';
import {selectModal} from '../Redux/Slice/Modalslice';
import {Snackbar} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import ButtonWithSpinner from '../Components/ButtonWithSpinner';
import storage from '@react-native-firebase/storage';
import {selectProfileDetails} from '../Redux/Slice/UserProfileSlice';
import noUser from '../assests/noUser.png';

// alwaysBounceVertical = true
// automaticallyAdjustContentInsets
// automaticallyAdjustsScrollIndicatorInsets
// snapToStart

const Chat = () => {
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected === true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const modal = useSelector(selectModal);

  const [Image1, setImage] = useState('');
  const [showSpinnerButton, setshowSpinnerButton] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [Groupname, setGroupname] = useState('');
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [DownloadedUrl, setDownloadedUrl] = useState('');
  const [chat, setchat] = useState([]);

  // const uploadPicture = async () => {
  //   const uploadUri = Image1;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Adding Time stamp to image to avoid overriding.
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   try {
  //     await storage().ref(filename).putFile(uploadUri);
  //     const url = await storage().ref(filename).getDownloadURL();
  //     setDownloadedUrl(url);
  //     setshowSpinnerButton(false);
  //     setshowButton2(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const UploadFile = () => {
    const uploadUri = Image1;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Adding Time stamp to image to avoid overriding.
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });

    storage()
      .ref(filename)
      .putFile(uploadUri)
      .then(sucesss => {
        if (sucesss) {
          alert('Sucess');
        }
      })
      .catch(err => {
        console.log(err);
      });

    storage()
      .ref(filename)
      .getDownloadURL()
      .then(uri => {
        setDownloadedUrl(uri);
      })
      .catch(() => {
        console.log(err);
      });
  };

  const CreateGroup = () => {
    // Keyboard.dismiss();
    setshowButton(false);
    setshowSpinnerButton(true);

    firestore()
      .collection('Group Chats')
      .add({
        Groupname: Groupname,
        profile: DownloadedUrl,
      })
      .then(success => {
        setshowSpinnerButton(false);
        setshowButton(true);
        if (success) {
          refRBSheet.current.close();
          setGroupname('');
          alert('File uploaded Sucessfully');
        }
      })
      // .then(() => {
      //   dispatch(
      //     userProfileDetails({
      //       username: data.Username,
      //       status: data.Status,
      //       profile: url,
      //     }),
      //   );
      // })
      .catch(error => {
        console.log(error);
      });
  };

  const title = () => {
    const userDetails = useSelector(selectUser);
    const userProfileDetails = useSelector(selectProfileDetails);
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
              {`Welcome,${
                userProfileDetails ? userProfileDetails.username : `No user`
              }`}
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Newgroup');
              }}>
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
              {showButton && (
                <CustomButton
                  ButtonTitle="ADD NEW CHAT"
                  onPress={() => {
                    navigation.navigate('Newgroup');
                  }}
                />
              )}
            </View>
          </View>
        </>
      );
    } else {
      useEffect(() => {
        const unsubscribe = firestore().collection('');
      }, []);
      return (
        <View style={styles.HomeConatiner}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View>
            <ScrollView></ScrollView>
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
        renderNavBar={renderNavBar}
        renderContent={renderContent}
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
