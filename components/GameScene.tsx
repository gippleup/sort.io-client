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
import CountryFlagIcon from './CountryFlagIcon';
import Constants from '../assets/Constants';
import { decideMapScale } from './GameScene/utils';
import {
  BlockBoardContainer,
  GameInfoContainer,
  GameSceneContainer,
  LevelInfo,
  LevelInfoContainer,
  MetaInfoContainer,
  OpponentBoard,
  OpponentGameContainer,
  ProfileContainer,
  ScoreCheckerContainer,
  StyledRefBoard,
  TimerContainer
} from './GameScene/_StyledComponent'

const backgroundImage = require('../assets/BackgroundPattern.png');

type GameSceneProps = {
  title: string;
  timeLimit: number;
  isManualTimer?: boolean;
  maxScore: number;
  map: BlockTypes[][];
  skin: skins;
  onComplete?: (winner: "opponent" | "me") => any;
  onTimeOut?: () => void;
  onDock?: (stackIndex: number) => void;
  onUndock?: (stackIndex: number) => void;
  onReady?: () => any;
  readyDuration?: number;
  mode: 'single' | 'multi';
  fps?: number;
  timerRoundTo?: number;
  noAnimation?: boolean;
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
  onReadyDispatched = false;

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
    this.checkIfBoardReady = this.checkIfBoardReady.bind(this);
  }

  checkIfBoardReady = () => {
    const { boardReadyStatus, props, onReadyDispatched } = this;
    const { player, opponent } = boardReadyStatus;
    let isReady = false;
    if (props.mode === 'single' && player === true) {
      isReady = true;
    }

    if (props.mode === 'multi' && player === true && opponent === true) {
      isReady = true;
    }

    if (isReady && props.onReady && !onReadyDispatched) {
      this.onReadyDispatched = true;
      props.onReady();
    }

    return isReady;
  }
  
  startTimerIfBothReady = () => {
    const {props, timerRef} = this;
    const boardIsReady = this.checkIfBoardReady();
    if (boardIsReady) {
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

  private onLayout() {
    const {checkIfBoardReady, startTimerIfBothReady, props} = this;
    const delay = props.readyDuration || 0;
    if (!props.isManualTimer) {
      setTimeout(startTimerIfBothReady, delay);
    } else {
      setTimeout(checkIfBoardReady, delay);
    }
  }

  renderOpponentBoard = () => {
    const {
      props,
      opponentBoardRef,
      opponentScoreCheckerRef,
      mapScale,
      boardReadyStatus,
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
          }}
          onComplete={() => {
            if (props.onComplete) {
              props.onComplete("opponent");
            }
          }}
          scale={mapScale * 0.35}
          onLayout={() => {
            boardReadyStatus.opponent = true
            this.onLayout();
          }}
          fps={props.fps}
          noAnimation={props.noAnimation}
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
      <ScoreCheckerContainer gameType={props.mode}>
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
            <TimerContainer gameType={props.mode}>
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
                roundTo={props.timerRoundTo}
              />
            </TimerContainer>
            {renderOpponentScoreChecker()}
            <ScoreCheckerContainer gameType={props.mode}>
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
            }}
            onDock={props.onDock}
            onUndock={props.onUndock}
            onComplete={() => {
              if (props.onComplete) {
                props.onComplete("me");
              }
            }}
            scale={mapScale}
            onLayout={() => {
              boardReadyStatus.player = true;
              this.onLayout();
            }}
            fps={props.fps}
            noAnimation={props.noAnimation}
          />
        </BlockBoardContainer>
      </GameSceneContainer>
    );
  }
}

export default GameScene;
