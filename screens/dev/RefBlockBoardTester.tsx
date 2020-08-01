import React from 'react'
import { View, Text } from 'react-native'
import RefBlockBoard from '../../components/RefBlockBoard'
import styled from 'styled-components';
import { BlockTypes } from '../../components/Block/Types';

const MyBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  background-color: royalblue;
  width: 340px;
  height: 400px;
`;


const exStackMap: BlockTypes[][] = [
  [0, 0, 0],
  [1, 1],
  [1, -1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [3, 4, 4, -1, -1],
];

const RefBlockBoardTester = () => {
  return (
    <View>
      <MyBoard skin="spiky" initialMap={exStackMap} />
    </View>
  );
};

export default RefBlockBoardTester;
