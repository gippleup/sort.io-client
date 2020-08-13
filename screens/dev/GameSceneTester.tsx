import React from 'react';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';

const exStackMap: BlockTypes[][] = [
  [0, 0, 0],
  [-1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [2, 2, -1, -1],
  [2, 2, -1, -1],
  [0, 0, 0],
  [-1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
  [-1, -1, -1],
  [1, 1, -1, -1],
];

const GameSceneTester = () => {
  return (
    <GameScene
      skin="spiky"
      map={exStackMap}
      title={'하드'}
      timeLimit={60}
      maxScore={5}
      mode={'multi'}
      onComplete={() => console.log('끝남')}
    />
  );
};

export default GameSceneTester;
