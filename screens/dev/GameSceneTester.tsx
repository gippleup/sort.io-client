import React from 'react';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';
import { generateMap } from '../../api/sortio';


const GameSceneTester = () => {
  const [map, setMap] = React.useState<null | BlockTypes[][]>(null);
  const option = {
    blockStackCount: 10,
    colorCount: 5,
    maxScore: 8,
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
      skin="spiky"
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
