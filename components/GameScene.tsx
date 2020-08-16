import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import PatternBackground from './GameScene/PatternBackground';
import Timer from './Timer';
import styled from 'styled-components';
import ScoreChecker from './ScoreChecker';
import RefBlockBoard from './RefBlockBoard';
import {BlockTypes} from './Block/Types';
import { skins } from './BlockStack/skinMap';
import ProfilePic from './GameScene/ProfilePic';
import CountryFlagIcon from './CountryFlagIcon';
import Constants from '../assets/Constants';

const backgroundImage = require('../assets/BackgroundPattern.png');

const GameSceneContainer = styled(View)`
  flex: 1;
`;

const GameInfoContainer = styled(View)`
  flex: 25;
  flex-direction: row;
`;

const OpponentGameContainer = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 0.5;
  width: ${(119 / 360) * Dimensions.get('screen').width}px;
  max-width: 119px;
  height: ${(140 / 640) * Dimensions.get('screen').height}px;
  max-height: 140px;
`;

const LevelInfoContainer = styled(View)`
  align-items: center;
  justify-content: flex-end;
  flex: 2;
`;

const ProfileContainer = styled(View)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 16px;
  margin-right: 10px;
`;

const MetaInfoContainer = styled(View)`
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

const ScoreCheckerContainer: typeof View = styled(View)`
  align-items: center;
  justify-content: center;
  margin-vertical: 5px;
  flex-direction: row;
`;

const BlockBoardContainer = styled(View)`
  flex: 65;
  align-items: center;
  justify-content: center;
`;

const OpponentBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  border-width: 0.5px;
  border-color: rgba(0,0,0,0.5);
`;

const StyledRefBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  width: ${(340 / 360) * Dimensions.get('screen').width}px;
  max-width: 340px;
  height: ${(400 / 640) * Dimensions.get('screen').height}px;
  max-height: 400px;
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
  onComplete?: () => void;
  onTimeOut?: () => void;
  mode: 'single' | 'multi';
};

const GameScene: React.FC<GameSceneProps> = (props) => {
  const timerRef = React.createRef<Timer>();
  const scoreCheckerRef = React.createRef<ScoreChecker>();
  const opponentScoreCheckerRef = React.createRef<ScoreChecker>();
  const boardReadyStatus = React.useRef<{ opponent: boolean, player: boolean }>({ opponent: false, player: false });
  const opponentBoardRef = React.createRef<RefBlockBoard>();
  let mapScale = 1;
  if (props.map.length <= 3) {
    mapScale = 1;
  } else if (props.map.length <= 8) {
    mapScale = 0.75
  } else if (props.map.length <= 10) {
    mapScale = 0.7
  } else if (props.map.length <= 12) {
    mapScale = 0.55
  } else if (props.map.length <= 21) {
    mapScale = 0.5
  } else if (props.map.length <= 24) {
    mapScale = 0.4
  } else if (props.map.length <= 27) {
    mapScale = 0.38
  } else if (props.map.length <= 36) {
    mapScale = 0.36
  }

  let scoreCheckerMax = {
    single: {
      width: 320 / 360 * Dimensions.get('screen').width,
      height: 44 / 640 * Dimensions.get('screen').height,
    },
    multi: {
      width: 130 / 360 * Dimensions.get('screen').width,
      height: 32 / 640 * Dimensions.get('screen').height,
    },
  };
  let scoreCheckerScale = 0.5;
  let checkerMaxWidth = scoreCheckerMax[props.mode].width;
  let checkerMaxHeight = scoreCheckerMax[props.mode].height;
  if (props.maxScore <= 8) {
    scoreCheckerScale = 0.45;
  } else if (props.maxScore <= 15) {
    scoreCheckerScale = 0.3;
  } else if (props.maxScore <= 18) {
    scoreCheckerScale = 0.25;
  } else if (props.maxScore <= 21) {
    scoreCheckerScale = 0.2;
  } else if (props.maxScore <= 28) {
    scoreCheckerScale = 0.19;
  }

  let checkerColumn = Math.ceil(checkerMaxWidth / ((Constants.blockWidth + Constants.blockPadding * 2) * scoreCheckerScale));
  let checkerRow = Math.ceil(props.maxScore / checkerColumn);

  if (props.mode === 'multi') {
    scoreCheckerScale *= (0.33 / 0.5);
  }

  let scoreCheckerLayout = Array(checkerRow).fill(Array(checkerColumn).fill(1));

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


  const startTimerIfBothReady = () => {
    if (boardReadyStatus.current) {
      const {player, opponent} = boardReadyStatus.current;
      if (player === true && opponent === true) {
        timerRef.current?.timerBaseRef.current?.startTimer();
      }
    }
  }

  const renderStageTitle = () => {
    if (props.mode === 'multi') {
      return <></>;
    }
    return (
      <LevelInfoContainer>
        <LevelInfo>{props.title}</LevelInfo>
      </LevelInfoContainer>
    )
  }

  const renderOpponentBoard = () => {
    if (props.mode === 'single') {
      return <></>;
    }
    return (
      <OpponentGameContainer>
        <OpponentBoard
          ref={opponentBoardRef}
          initialMap={props.map}
          skin={props.skin}
          onChange={(score) => {
            opponentScoreCheckerRef.current?.setScore(score);
            // if (score === props.maxScore && props.onComplete) {
            //   props.onComplete();
            // }
          }}
          onComplete={props.onComplete}
          scale={mapScale * 0.35}
          onLayout={() => {
            if (boardReadyStatus.current) {
              boardReadyStatus.current.opponent = true
              startTimerIfBothReady();
            }
          }}
        />
      </OpponentGameContainer>
    )
  }

  const renderOpponentScoreChecker = () => {
    if (props.mode === 'single') {
      return <></>;
    }
    return (
      <ScoreCheckerContainer>
        <ProfileContainer />
        <ScoreChecker
          ref={opponentScoreCheckerRef}
          skin={props.skin}
          initialScore={initialScore}
          maxScore={props.maxScore}
          scale={scoreCheckerScale}
          layout={scoreCheckerLayout}
        />
      </ScoreCheckerContainer>
    )
  }


  const renderProfile = () => {
    if (props.mode === 'single') {
      return <></>;
    }
    return (
      <ProfileContainer />
    )
  }

  return (
    <GameSceneContainer>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
      <GameInfoContainer>
        {renderOpponentBoard()}        
        <MetaInfoContainer>
          {renderStageTitle()}
          <TimerContainer>
            <Timer
              ref={timerRef}
              iconSize={20}
              color="white"
              alertAt={15}
              integerSize={50}
              decimalSize={20}
              duration={props.timeLimit}
              onFinish={props.onTimeOut}
              auto={false}
            />
          </TimerContainer>
          {renderOpponentScoreChecker()}
          <ScoreCheckerContainer>
            {renderProfile()}
            <ScoreChecker
              ref={scoreCheckerRef}
              skin={props.skin}
              initialScore={initialScore}
              maxScore={props.maxScore}
              scale={scoreCheckerScale}
              layout={scoreCheckerLayout}
            />
          </ScoreCheckerContainer>
        </MetaInfoContainer>
      </GameInfoContainer>
      <BlockBoardContainer>
        <StyledRefBoard
          initialMap={props.map}
          skin={props.skin}
          onChange={(score) => {
            scoreCheckerRef.current?.setScore(score);
            // if (score === props.maxScore && props.onComplete) {
            //   props.onComplete();
            // }
          }}
          onComplete={props.onComplete}
          scale={mapScale}
          onLayout={() => {
            if (boardReadyStatus.current) {
              boardReadyStatus.current.player = true
              startTimerIfBothReady()
            }
          }}
        />
      </BlockBoardContainer>
    </GameSceneContainer>
  );
};

export default GameScene;
