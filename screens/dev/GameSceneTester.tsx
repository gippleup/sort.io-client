import React from 'react';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';
import { generateMap } from '../../api/sortio';


const GameSceneTester = () => {
  const [map, setMap] = React.useState<null | BlockTypes[][]>(null);
  const option = {
    blockStackCount: 21,
    colorCount: 17,
    maxScore: 20,
    stackLengthMax: 8,
    stackLengthMin: 2,
    shuffleCount: 100,
  }
  if (!map) {
    generateMap(option).then((data) => {
      setMap(data.question)
    })
    return <></>;
  }
  return (
    <GameScene
      playerSkin="horizon"
      map={map}
      title={'하드'}
      timeLimit={60}
      maxScore={option.maxScore}
      mode={'single'}
      onComplete={() => console.log('끝남')}
    />
  );
};

export default GameSceneTester;
