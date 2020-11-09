import React from 'react';
import GameScene from '../../components/GameScene';
import {BlockTypes} from '../../components/Block/Types';
import generateMap from '../../algo/generateMap';
import { findNodeHandle, GestureResponderEvent, View } from 'react-native';
import Profile from '../../components/Profile';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '../../hooks/useGlobal';
import expressions from '../../components/Profile/Expressions';


const GameSceneTester = () => {
  const option = {
    blockStackCount: 21,
    colorCount: 18,
    maxScore: 20,
    stackLengthMax: 8,
    stackLengthMin: 2,
    shuffleCount: 100,
  }
  
  const global = useGlobal();
  const playerProfileRef = React.createRef<Profile>();
  const opponentProfileRef = React.createRef<Profile>();

  return (
    <GameScene
      playerSkin="horizon"
      map={generateMap(option).question}
      title={'하드'}
      timeLimit={5}
      fps={60}
      maxScore={option.maxScore}
      mode={'multi'}
      playerProfile={{ name: 'me', photo: <Profile ref={playerProfileRef} chatBubbleSize={50} iconColor="dodgerblue" /> }}
      opponentProfile={{ name: 'opponent', photo: <Profile ref={opponentProfileRef} chatBubbleSize={50} iconColor="black" /> }}
      onComplete={undefined}
      playerDockEasing="easeInOutSine"
      playerDockEasingDuraton={100}
      timerFps={1}
      timerRoundTo={0}
      expressions={global.expressions}
      onPressExpression={(direction) => {
        const expression = global.expressions[direction];
        if (expression) {
          const element = expressions[expression](true);
          playerProfileRef.current?.express(element, "topLeft", 50);
          opponentProfileRef.current?.express(element, "bottomLeft", 50);
        }
      }}
    />
  );
};

export default GameSceneTester;
