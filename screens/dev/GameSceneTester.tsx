import React from 'react';
import {View, Text} from 'react-native';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';

const exStackMap: BlockTypes[][] = [
  [0, 0, 0],
  [-1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [2, 2, -1, -1],
  [2, 2, -1, -1],
];

const GameSceneTester = () => {
  return (
    <GameScene
      skin="spiky"
      map={exStackMap}
      title={'하드 1-5'}
      timeLimit={60}
      maxScore={5}
    />
  );
};

export default GameSceneTester;
