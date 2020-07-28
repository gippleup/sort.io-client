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
  [1, 1, 1],
  [2, 2],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [3, 3, 3, 3],
  [-1, -1, -1, -1, -1],
];

const BlockBoardContainer: typeof View = styled(View)`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding-bottom: 20;
`;

const BlockBoardTester = () => {
  return (
    <BlockBoardContainer>
      {/* <Timer integerSize={60} decimalSize={20} color="black" duration={60} /> */}
      <BlockBoard style={{width: 180, borderWidth: 1}} stackMap={smallMap} />
      <BlockBoard style={{width: 340, borderWidth: 1}} stackMap={exStackMap} />
    </BlockBoardContainer>
  );
};

export default BlockBoardTester;
