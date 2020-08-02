import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import PatternBackground from './GameScene/PatternBackground';
import BlockBoard from './BlockBoard';
import Timer from './Timer';
import styled from 'styled-components';
import ScoreChecker from './ScoreChecker';
import RefBlockBoard from './RefBlockBoard';
import {BlockTypes} from './Block/Types';
import { skins } from './BlockStack/skinMap';

const backgroundImage = require('../assets/BackgroundPattern.png');

const GameSceneContainer = styled(View)`
  flex: 1;
`;

const GameInfoContainer = styled(View)`
  flex: 25;
`;

const LevelInfoContainer = styled(View)`
  align-items: center;
  justify-content: flex-end;
  flex: 2;
`;

const LevelInfo = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

const TimerContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const ScoreCheckerContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BlockBoardContainer = styled(View)`
  flex: 65;
  align-items: center;
  justify-content: center;
`;

const StyledRefBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  width: 340px;
  height: 400px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
`;

type GameSceneProps = {
  title: string;
  timeLimit: number;
  maxScore: number;
  map: BlockTypes[][];
  skin: skins;
};

const GameScene: React.FC<GameSceneProps> = (props) => {
  const scoreCheckerRef = React.createRef<ScoreChecker>();
  const filledStack = props.map.filter((stack) => stack[0] !== -1);
  const completeMap = filledStack.map((stack) => {
    let completedStack = true;
    stack.forEach((block) => {
      if (block !== stack[0]) {
        completedStack = false;
      }
    });
    return completedStack;
  });
  const initialScore = completeMap.filter((bool) => bool).length;
  return (
    <GameSceneContainer>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
      <GameInfoContainer>
        <LevelInfoContainer>
          <LevelInfo>{props.title}</LevelInfo>
        </LevelInfoContainer>
        <TimerContainer>
          <Timer
            iconSize={20}
            color="white"
            alertAt={15}
            integerSize={50}
            decimalSize={20}
            duration={props.timeLimit}
          />
        </TimerContainer>
        <ScoreCheckerContainer>
          <ScoreChecker
            ref={scoreCheckerRef}
            skin={props.skin}
            initialScore={initialScore}
            maxScore={props.maxScore}
            scale={0.5}
            layout={[[1, 1, 1, 1, 1]]}
          />
        </ScoreCheckerContainer>
      </GameInfoContainer>
      <BlockBoardContainer>
        {/* <BlockBoard
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 340,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          skin="basic"
          stackMap={props.map}
          onChange={(score) => scoreCheckerRef.current?.setScore(score)}
        /> */}
        <StyledRefBoard
          initialMap={props.map}
          skin={props.skin}
          onChange={(score) => {
            scoreCheckerRef.current?.setScore(score);
          }}
        />
      </BlockBoardContainer>
    </GameSceneContainer>
  );
};

export default GameScene;
