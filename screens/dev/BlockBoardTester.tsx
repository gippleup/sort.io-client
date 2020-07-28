import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import BlockBoard from '../../components/BlockBoard';

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

const BlockBoardTester = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        paddingBottom: 20,
      }}>
      <BlockBoard style={{width: 180, borderWidth: 1}} stackMap={smallMap} />
      <BlockBoard style={{width: 340, borderWidth: 1}} stackMap={exStackMap} />
    </View>
  );
};

export default BlockBoardTester;
