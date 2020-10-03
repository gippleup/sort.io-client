import React from 'react';
import {View, Text} from 'react-native';
import NativeRefBlockBoard from '../../components/NativeRefBlockBoard';
import styled from 'styled-components';
import {BlockTypes} from '../../components/Block/Types';

const MyBoard: typeof NativeRefBlockBoard = styled(NativeRefBlockBoard)`
  background-color: royalblue;
  width: 340px;
  height: 400px;
  /* transform: scale(0.5) translateX(-85px) translateY(-100px); */
`;

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
    <View>
      <MyBoard
        onComplete={() => console.log('잘됨')}
        skin="baby"
        initialMap={exStackMap}
      />
    </View>
  );
};

export default RefBlockBoardTester;
