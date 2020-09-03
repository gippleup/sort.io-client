import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import PatternBackground from './GameScene/PatternBackground';
import Timer from './Timer';
import styled from 'styled-components';
import ScoreChecker from './ScoreChecker';
// import RefBlockBoard from './RefBlockBoard';
import NativeRefBlockBoard from './NativeRefBlockBoard';
import {BlockTypes} from './Block/Types';
import { skins } from './BlockStack/skinMap';
import ProfilePic from './GameScene/ProfilePic';
import CountryFlagIcon from './CountryFlagIcon';
import Constants from '../assets/Constants';
import { decideMapScale } from './GameScene/utils';

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

const LevelInfo = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: bold;
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

const OpponentBoard: typeof NativeRefBlockBoard = styled(NativeRefBlockBoard)`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  border-width: 0.5px;
  border-color: rgba(0,0,0,0.5);
`;

const StyledRefBoard: typeof NativeRefBlockBoard = styled(NativeRefBlockBoard)`
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
  onDock?: (stackIndex: number) => void;
  onUndock?: (stackIndex: number) => void;
  mode: 'single' | 'multi';
  fps?: number;
};

class GameScene extends React.Component<GameSceneProps, {}>{
  timerRef = React.createRef<Timer>();
  scoreCheckerRef = React.createRef<ScoreChecker>();
  opponentScoreCheckerRef = React.createRef<ScoreChecker>();
  boardReadyStatus = {
    opponent: false,
    player: false,
  };
  opponentBoardRef = React.createRef<NativeRefBlockBoard>();
  mapScale = 1;
  scoreCheckerMax = {
    single: {
      width: 320 / 360 * Dimensions.get('screen').width,
      height: 44 / 640 * Dimensions.get('screen').height,
    },
    multi: {
      width: 130 / 360 * Dimensions.get('screen').width,
      height: 32 / 640 * Dimensions.get('screen').height,
    },
  };
  scoreCheckerScale = 0.5;
  checkerMaxWidth = 320;
  checkerMaxHeight = 44;
  initialScore = 0;
  scoreCheckerLayout = [[]];

  constructor(props: Readonly<GameSceneProps>) {
    super(props);
    this.mapScale = decideMapScale(props.map.length);
    this.checkerMaxWidth = this.scoreCheckerMax[props.mode].width;
    this.checkerMaxHeight = this.scoreCheckerMax[props.mode].height;

    if (props.maxScore <= 8) {
      this.scoreCheckerScale = 0.45;
    } else if (props.maxScore <= 16) {
      this.scoreCheckerScale = 0.25;
    } else if (props.maxScore <= 21) {
      this.scoreCheckerScale = 0.2;
    } else if (props.maxScore <= 28) {
      this.scoreCheckerScale = 0.19;
    }

    if (props.mode === 'multi') {
      this.scoreCheckerScale *= (0.33 / 0.5);
    }

    let paddedWidth = (Constants.blockWidth + Constants.blockPadding * 2);
    let checkerColumn = Math.ceil(this.checkerMaxWidth / ( paddedWidth * this.scoreCheckerScale));
    let checkerRow = Math.ceil(props.maxScore / checkerColumn);
    this.scoreCheckerLayout = Array(checkerRow).fill(Array(checkerColumn).fill(1));
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
    this.initialScore = completeMap.filter((bool) => bool).length;

    this.startTimerIfBothReady = this.startTimerIfBothReady.bind(this);
    this.renderOpponentBoard = this.renderOpponentBoard.bind(this);
    this.renderOpponentScoreChecker = this.renderOpponentScoreChecker.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.renderStageTitle = this.renderStageTitle.bind(this);
  }
  
  startTimerIfBothReady = () => {
    const {boardReadyStatus, props, timerRef} = this;
    const { player, opponent } = boardReadyStatus;
    if (props.mode === 'single' && player === true) {
      timerRef.current?.timerBaseRef.current?.startTimer();
    }
    if (props.mode === 'multi' && player === true && opponent === true) {
      timerRef.current?.timerBaseRef.current?.startTimer();
    }
  }

  renderStageTitle = () => {
    const {props} = this;
    if (props.mode === 'multi') {
      return <></>;
    }
    return (
      <LevelInfoContainer>
        <LevelInfo>{props.title}</LevelInfo>
      </LevelInfoContainer>
    )
  }

  renderOpponentBoard = () => {
    const {
      props,
      opponentBoardRef,
      opponentScoreCheckerRef,
      mapScale,
      boardReadyStatus,
      startTimerIfBothReady
    } = this;

    if (props.mode === 'single') {
      return <></>;
    }

    return (
      <OpponentGameContainer>
        <OpponentBoard
          ref={opponentBoardRef}
          initialMap={props.map}
          skin={props.skin}
          onScoreChange={(score) => {
            opponentScoreCheckerRef.current?.setScore(score);
            // if (score === props.maxScore && props.onComplete) {
            //   props.onComplete();
            // }
          }}
          onComplete={props.onComplete}
          scale={mapScale * 0.35}
          onLayout={() => {
            boardReadyStatus.opponent = true
            startTimerIfBothReady();
          }}
          fps={props.fps}
        />
      </OpponentGameContainer>
    )
  }

  renderOpponentScoreChecker = () => {
    const {
      props,
      opponentScoreCheckerRef,
      scoreCheckerScale,
      initialScore,
      scoreCheckerLayout,
    } = this;
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

  renderProfile = () => {
    const {props} = this;
    if (props.mode === 'single') {
      return <></>;
    }
    return (
      <ProfileContainer />
    )
  }

  render() {
    const {
      renderOpponentBoard,
      renderOpponentScoreChecker,
      renderProfile,
      renderStageTitle,
      props,
      scoreCheckerRef,
      initialScore,
      scoreCheckerScale,
      scoreCheckerLayout,
      boardReadyStatus,
      startTimerIfBothReady,
      mapScale,
      timerRef,
    } = this;
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
            onScoreChange={(score) => {
              scoreCheckerRef.current?.setScore(score);
              // if (score === props.maxScore && props.onComplete) {
              //   props.onComplete();
              // }
            }}
            onDock={props.onDock}
            onUndock={props.onUndock}
            onComplete={props.onComplete}
            scale={mapScale}
            onLayout={() => {
              boardReadyStatus.player = true
              startTimerIfBothReady()
            }}
            fps={props.fps}
          />
        </BlockBoardContainer>
      </GameSceneContainer>
    );
  }
}

export default GameScene;
