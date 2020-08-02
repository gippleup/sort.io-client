import React from 'react';
import {View, Text} from 'react-native';
import RefBlockBoard from '../../components/RefBlockBoard';
import styled from 'styled-components';
import {BlockTypes} from '../../components/Block/Types';

const MyBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  background-color: royalblue;
  width: 340px;
  height: 400px;
  /* transform: scale(0.5) translateX(-85px) translateY(-100px); */
`;

const MyBoard2: typeof RefBlockBoard = styled(RefBlockBoard)`
  background-color: royalblue;
  width: 340px;
  height: 200px;
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
        skin="spiky"
        initialMap={exStackMap}
      />
      <MyBoard2
        skin="basic"
        initialMap={[
          [1, 1, 1],
          [1, 0],
        ]}
      />
    </View>
  );
};

export default RefBlockBoardTester;
