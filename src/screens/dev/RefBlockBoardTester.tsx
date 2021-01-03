import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import NativeRefBlockBoard from '@components/NativeRefBlockBoard';
import styled from 'styled-components';
import {BlockTypes} from '@components/Block/Types';

const exStackMap: BlockTypes[][] = [
  [0, 0, 0],
  [1, 1],
  [1, 1, -1, -1, -1],
  [1, -1, -1, -1],
  [1, -1, -1, -1],
  [1, -1, -1, -1, -1],
];

const RefBlockBoardTester = () => {
  return (
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <View onLayout={(e) => console.log(e.nativeEvent.layout)} style={{backgroundColor: "royalblue"}}>
        <NativeRefBlockBoard
          onComplete={undefined}
          skin="baby"
          initialMap={exStackMap}
          width={Dimensions.get("screen").width}
          height={Dimensions.get("window").height}
        />
      </View>
    </View>
  );
};

export default RefBlockBoardTester;
