import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import PatternBackground from './GameScene/PatternBackground';
import BlockBoard from './BlockBoard';
import Timer from './Timer';
import styled from 'styled-components';
import ScoreChecker from './ScoreChecker';

const backgroundImage = require('../assets/BackgroundPattern.png');

const exStackMap = [
  [0, 0, 0],
  [1, 1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [2, 2, 3, 3],
  [3, 4, 4, -1, -1],
];

const GameSceneContainer = styled(View)`
  flex: 1;
`;

const GameInfoContainer = styled(View)`
  flex: 35;
`;

const LevelInfoContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
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

type GameSceneProps = {
  title: string;
  timeLimit: number;
  maxScore: number;
};

const GameScene: React.FC<GameSceneProps> = (props) => {
  const [curScore, setCurScore] = React.useState(0);
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
            skin="basic"
            curScore={curScore}
            maxScore={props.maxScore}
            scale={0.5}
            layout={[[1, 1, 1, 1, 1]]}
          />
        </ScoreCheckerContainer>
      </GameInfoContainer>
      <BlockBoardContainer>
        <BlockBoard
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 340,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          skin="basic"
          stackMap={exStackMap}
          onChange={(score) => setCurScore(score)}
        />
      </BlockBoardContainer>
    </GameSceneContainer>
  );
};

export default GameScene;
