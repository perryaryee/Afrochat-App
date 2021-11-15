import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StoryContainer} from 'react-native-stories-view';
// import Stories from 'react-native-stories-media';

const data = [
  'https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4',
  'https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4',
  'https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4',
  'https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4',
  'https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4',
];

const StatusView = () => { 
  return (
    <StoryContainer
      visible={true}
      enableProgress={true}
      images={data}
      duration={20}
      containerStyle={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default StatusView;

const styles = StyleSheet.create({});
