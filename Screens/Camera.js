import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/core';

const Camera = () => {
  const navigation = useNavigation();
  const [image, setimage] = useState('');

  return (
    <View style={styles.CameraContainer}>
      {useEffect(() => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          if (image) {
            navigation.navigate('PhotoCapture', {
              image: image,
            });
          }
          // setimage(image.path);
        });
      }, [])}
      {/* <Image source={{uri: image}} /> */}
      {/* {ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        // if (image) {
        //   navigation.navigate('PhotoCapture', {
        //     image,
        //   });
        // }
        console.log(image);
      })} */}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  CameraContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
