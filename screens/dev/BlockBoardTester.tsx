import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import BlockBoard from '../../components/BlockBoard';
import Timer from '../../components/Timer';
import styled from 'styled-components';

const smallMap = [
  [1, 1, -1],
  [2, -1],
];

const exStackMap = [
  [0, 0, 0],
  [1, 1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [2, 2, 3, 3],
  [3, 4, 4, -1, -1],
];

const BlockBoardContainer: typeof View = styled(View)`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding-bottom: 20px;
`;

const BlockBoardTester = () => {
  return (
    <BlockBoardContainer>
      {/* <Timer integerSize={60} decimalSize={20} color="black" duration={60} /> */}
      <BlockBoard
        style={{width: 180, borderWidth: 1}}
        skin="basic"
        stackMap={smallMap}
      />
      <BlockBoard
        style={{width: 340, borderWidth: 1}}
        skin="spiky"
        stackMap={exStackMap}
      />
    </BlockBoardContainer>
  );
};

export default BlockBoardTester;
