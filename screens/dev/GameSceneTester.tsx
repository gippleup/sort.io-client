import React from 'react';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';
import generateMap from '../../algo/generateMap';


const GameSceneTester = () => {
  const option = {
    blockStackCount: 21,
    colorCount: 17,
    maxScore: 20,
    stackLengthMax: 8,
    stackLengthMin: 2,
    shuffleCount: 100,
  }
  return (
    <GameScene
      playerSkin="horizon"
      map={generateMap(option).question}
      title={'하드'}
      timeLimit={60}
      maxScore={option.maxScore}
      mode={'single'}
      onComplete={() => console.log('끝남')}
    />
  );
};

export default GameSceneTester;
