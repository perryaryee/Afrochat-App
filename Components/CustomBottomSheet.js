import React, {useRef} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomBottomSheet = ({BottomSheetContent, refRBSheet, onClose}) => {
  //   const refRBSheet = useRef();
  return (
    <RBSheet
      onClose={onClose}
      closeOnDragDown={true}
      dragFromTopOnly={true}
      animationType="fade"
      ref={refRBSheet}
      height={hp('50%')}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          // backfaceVisibility: 'visible',
          // backgroundColor: "#86868C",
        },
        draggableIcon: {
          backgroundColor: 'gray',
        },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}>
      <ScrollView>
        <BottomSheetContent />
      </ScrollView>
    </RBSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({});
