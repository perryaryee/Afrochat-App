import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


const PhotoCapture = ({route}) => {
  //   const {image} = route.params;
  return (
    <View style={styles.imageContainer}>
      <Image
        source={route.params.image}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

export default PhotoCapture;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
});
