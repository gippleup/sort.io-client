import React, { RefObject } from 'react';
import {View, Text, Image, Dimensions, GestureResponderEvent} from 'react-native';
import PatternBackground from '@components/GameScene/PatternBackground';
import Timer from '@components/Timer';
import ScoreChecker from '@components/ScoreChecker';
// import RefBlockBoard from '@components/RefBlockBoard';
import NativeRefBlockBoard from '@components/NativeRefBlockBoard';
import {BlockTypes} from '@components/Block/Types';
import { SupportedSkin } from '@components/Block/skinMap';
import Constants from '@assets/Constants';
import { decideMapScale } from '@components/GameScene/utils';
import {
  BlockBoardContainer,
  GameInfoContainer,
  GameSceneContainer,
  LevelInfo,
  LevelInfoContainer,
  MetaInfoContainer,
  OpponentBoardContainer,
  OpponentGameContainer,
  PlayerBoardContainer,
  ProfileContainer,
  ScoreCheckerContainer,
  TimerContainer,
  UserName
} from '@components/GameScene/_StyledComponent'
import { FlexHorizontal, NotoSans } from '@components/Generic/StyledComponents';
import { getSkinSoundEffect } from '@assets/sounds/skinSound';
import { Easings } from '@components/NativeRefBox/easings';
import NativeRefBox from '@components/NativeRefBox';
import ExpressionEquipWheel from '@components/ExpressionEquipWheel';
import { ExpressionDirection } from '@redux/actions/global/creator';
import { SupportedExpression } from '@components/Profile/Expressions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '@api/icon';

const backgroundImage = require('@assets/BackgroundPattern.png');

const expectedWheelSize = (size: number) => (216.76190185546875 / 200) * size;

type GameSceneProps = {
  title: string;
  timeLimit: number;
  isManualTimer?: boolean;
  maxScore: number;
  map: BlockTypes[][];
  playerSkin?: SupportedSkin;
  opponentSkin?: SupportedSkin;
  onComplete?: (winner: "opponent" | "me") => any;
  onTimeOut?: () => void;
  onDock?: (stackIndex: number) => void;
  onUndock?: (stackIndex: number) => void;
  onReady?: () => any;
  onScoreChange?: (owner: "opponent" | "me", score: number) => any;
  readyDuration?: number;
  mode: 'single' | 'multi';
  fps?: number;
  timerRoundTo?: number;
  noAnimation?: boolean;
  opponentProfile?: { name: string; photo: JSX.Element; }
  playerProfile?: { name: string; photo: JSX.Element; }
  playerDockEasing?: Easings;
  opponentDockEasing?: Easings;
  playerDockEasingDuraton?: number;
  opponentDockEasingDuration?: number;
  onTouchPlayerProfile?: (e: GestureResponderEvent) => any;
  onTouchOpponentProfile?: (e: GestureResponderEvent) => any;
  timerFps?: number;
  expressionWheelSize?: number;
  expressions?: {
    [T in ExpressionDirection]?: SupportedExpression;
  }
  onPressExpression?: (direction: ExpressionDirection) => any;
  noGradient?: boolean;
  resetVisible?: boolean;
};

type Move = {
  type: "dock";
  targetIndex: number;
  occuredAt: number;
} | {
  type: "undock";
  targetIndex: number;
  occuredAt: number;
} | {
  type: "reset";
  occuredAt: number;
}

type GameRecord = {
  gameType: "single" | "multi";
  createdAt: number | null;
  startedAt: number | null;
  endedAt: number | null;
  map: number[][];
  moves: Move[];
  result: "success" | "win" | "fail" | "defeat" | null;
}

class GameScene extends React.Component<GameSceneProps, {}>{
  timerRef = React.createRef<Timer>();
  scoreCheckerRef = React.createRef<ScoreChecker>();
  opponentScoreCheckerRef = React.createRef<ScoreChecker>();
  boardReadyStatus = {
    opponent: false,
    player: false,
  };
  opponentBoardRef = React.createRef<NativeRefBlockBoard>();
  playerBoardRef = React.createRef<NativeRefBlockBoard>();
  expressionWheelContainerRef = React.createRef<NativeRefBox>();
  playerProfileRef = React.createRef<View>();
  opponentProfileRef = React.createRef<View>();
  playerProfileCenter: null | {x: number; y: number} = null;
  scoreCheckerMax = {
    single: {
      width: 320 / 360 * Dimensions.get('window').width,
      height: 44 / 640 * Dimensions.get('window').height,
    },
    multi: {
      width: 130 / 360 * Dimensions.get('window').width,
      height: 32 / 640 * Dimensions.get('window').height,
    },
  };
  scoreCheckerScale = 0.5;
  checkerMaxWidth = 320;
  checkerMaxHeight = 44;
  initialScore = 0;
  scoreCheckerLayout = [[]];
  onReadyDispatched = false;
  expressionWheelSize = 200;
  record: GameRecord;

  constructor(props: Readonly<GameSceneProps>) {
    super(props);
    this.record = {
      endedAt: null,
      startedAt: null,
      createdAt: Date.now(),
      gameType: props.mode,
      map: props.map,
      moves: [],
      result: null,
    }
    this.checkerMaxWidth = this.scoreCheckerMax[props.mode].width;
    this.checkerMaxHeight = this.scoreCheckerMax[props.mode].height;
    this.expressionWheelSize = props.expressionWheelSize || 200;

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
    this.renderScoreChecker = this.renderScoreChecker.bind(this);
    this.renderStageTitle = this.renderStageTitle.bind(this);
    this.checkIfBoardReady = this.checkIfBoardReady.bind(this);
    this.showExpressionWheel = this.showExpressionWheel.bind(this);
    this.hideExpressionWheel = this.hideExpressionWheel.bind(this);
    this.resetPlayerBoard = this.resetPlayerBoard.bind(this);
    this.renderResetButton = this.renderResetButton.bind(this);
  }

  resetPlayerBoard() {
    this.playerBoardRef.current?.reset();
    this.scoreCheckerRef.current?.setScore(this.initialScore);
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
      boardReadyStatus,
    } = this;

    if (props.mode === 'single') {
      return <></>;
    }

    return (
      <OpponentGameContainer pointerEvents="none">
        <OpponentBoardContainer>
          <NativeRefBlockBoard
            width={(130 / 360) * Dimensions.get('window').width}
            height={(150 / 640) * Dimensions.get('window').height}
            ref={opponentBoardRef}
            initialMap={props.map}
            maxScore={props.maxScore}
            skin={props.opponentSkin || "basic"}
            onScoreChange={(score) => {
              opponentScoreCheckerRef.current?.setScore(score);
              if (props.onScoreChange) {
                props.onScoreChange("opponent", score);
              }
            }}
            onComplete={() => {
              if (props.onComplete) {
                props.onComplete("opponent");
              }
            }}
            onLayout={() => {
              boardReadyStatus.opponent = true
              this.onLayout();
            }}
            fps={props.fps}
            noAnimation={props.noAnimation}
            dockEasing={props.opponentDockEasing}
            dockEasingDuration={props.opponentDockEasingDuration}
            noGradient={props.noGradient}
          />
        </OpponentBoardContainer>
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
        <ProfileContainer ref={this.opponentProfileRef} onTouchStart={props.onTouchOpponentProfile}>
          {props.opponentProfile?.photo}
        </ProfileContainer>
        <View>
          <FlexHorizontal>
            <UserName backgroundColor="black" color="white">
              {props.opponentProfile?.name}
            </UserName>
          </FlexHorizontal>
          <ScoreChecker
            ref={opponentScoreCheckerRef}
            skin={props.opponentSkin || "basic"}
            initialScore={initialScore}
            maxScore={props.maxScore}
            scale={scoreCheckerScale}
            layout={scoreCheckerLayout}
          />
        </View>
      </ScoreCheckerContainer>
    )
  }

  showExpressionWheel(x: number, y: number) {
    const actualWheelSize = expectedWheelSize(this.expressionWheelSize) / 2;
    this.expressionWheelContainerRef.current?.setStyle({
      display: "flex",
      left: x - actualWheelSize,
      top: y - actualWheelSize,
    })
    this.expressionWheelContainerRef.current?.animate({
      style: {
        scaleX: 1,
        scaleY: 1,
      },
      duration: 1000,
      easing: "easeOutElastic",
    }).start();
  }

  hideExpressionWheel(callback?: () => any) {
    this.expressionWheelContainerRef.current?.animate({
      style: {
        scaleX: 0,
        scaleY: 0,
      },
      duration: 300,
      easing: "easeInOutSine",
    }).start(() => {
      this.expressionWheelContainerRef.current?.setStyle({display: "none"})
      if (callback) {
        callback();
      }
    })
  }

  renderResetButton() {
    const {resetPlayerBoard, props} = this;
    if (!props.resetVisible) return <></>;
    return (
      <View style={{position: "absolute", right: 0, top: -40, flexDirection: "row", alignItems: "center"}}>
        <NotoSans style={{marginRight: 5}} color="white" type="Black">RESET</NotoSans>
        <TouchableOpacity onPress={resetPlayerBoard}>
          <View style={{width: 30, height: 30, backgroundColor: "white", borderRadius: 15, justifyContent: "center", alignItems: "center"}}>
            {getIcon("fontAwesome", "undo", {
              color: "black",
              size: 20,
            })}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderScoreChecker() {
    const { props } = this;
    const {
      initialScore,
      scoreCheckerScale,
      scoreCheckerLayout,
      scoreCheckerRef,
    } = this;

    const onTouchStart = (e: GestureResponderEvent) => {
      if (props.onTouchPlayerProfile) {
        props.onTouchPlayerProfile(e);
      }
      if (!this.playerProfileCenter) {
        this.playerProfileRef.current?.measure((x, y, width, height, pageX, pageY) => {
          this.playerProfileCenter = {
            x: pageX + width / 2,
            y: pageY + height / 2,
          }
          this.showExpressionWheel(this.playerProfileCenter.x, this.playerProfileCenter.y);
        })
      } else {
        this.showExpressionWheel(this.playerProfileCenter.x, this.playerProfileCenter.y);
      }
    }

    const profile = (
      <ProfileContainer ref={this.playerProfileRef} onTouchStart={onTouchStart}>
        {props.playerProfile?.photo}
      </ProfileContainer>
    )

    const name = (
      <FlexHorizontal>
        <UserName backgroundColor="dodgerblue" color="white">
          {props.playerProfile?.name}
        </UserName>
      </FlexHorizontal>
    )

    return (
      <ScoreCheckerContainer gameType={props.mode}>
        {props.mode === "single" ? <></> : profile}
        <View>
          {props.mode === "single" ? <></> : name}
          <ScoreChecker
            ref={scoreCheckerRef}
            skin={props.playerSkin || "basic"}
            initialScore={initialScore}
            maxScore={props.maxScore}
            scale={scoreCheckerScale}
            layout={scoreCheckerLayout}
          />
        </View>
      </ScoreCheckerContainer>
    )
  }

  render() {
    const {
      renderOpponentBoard,
      renderOpponentScoreChecker,
      renderScoreChecker,
      renderStageTitle,
      props,
      scoreCheckerRef,
      boardReadyStatus,
      startTimerIfBothReady,
      timerRef,
      expressionWheelSize,
      expressionWheelContainerRef,
      playerBoardRef,
      resetPlayerBoard,
      renderResetButton
    } = this;

    return (
      <GameSceneContainer>
        <PatternBackground source={backgroundImage}/>
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
                fps={props.timerFps}
              />
            </TimerContainer>
            {renderOpponentScoreChecker()}
            {renderScoreChecker()}
          </MetaInfoContainer>
        </GameInfoContainer>
        <BlockBoardContainer>
          <PlayerBoardContainer>
            {renderResetButton()}
            <NativeRefBlockBoard
              ref={playerBoardRef}
              width={Dimensions.get('window').width - 20}
              height={Dimensions.get('window').height * 0.65 - 20}
              maxScore={props.maxScore}
              initialMap={props.map}
              skin={props.playerSkin || "basic"}
              onScoreChange={(score) => {
                scoreCheckerRef.current?.setScore(score);
                if (props.onScoreChange) {
                  props.onScoreChange("me", score);
                }
              }}
              onDock={(stackIndex) => {
                if (props.onDock) {
                  props.onDock(stackIndex);
                }
                const sound = getSkinSoundEffect(props.playerSkin || "basic").dock;
                if (sound) {
                  sound.play();
                }
                this.hideExpressionWheel();
              }}
              onUndock={(stackIndex) => {
                if (props.onUndock) {
                  props.onUndock(stackIndex);
                }
                this.hideExpressionWheel();
              }}
              onSelfCompleteStack={(stackIndex) => {
                const sound = getSkinSoundEffect(props.playerSkin || "basic").self_dock_complete;
                if (sound) {
                  sound.pause();
                  sound.setCurrentTime(0);
                  sound.play();
                }
              }}
              onCompleteStack={(stackIndex) => {
                const sound = getSkinSoundEffect(props.playerSkin || "basic").dock_complete;
                if (sound) {
                  sound.pause();
                  sound.setCurrentTime(0);
                  sound.play();
                }
              }}
              onLeftOver={(stackIndex) => {
                const sound = getSkinSoundEffect(props.playerSkin || "basic").leftover;
                if (sound) {
                  sound.pause();
                  sound.setCurrentTime(0);
                  sound.play();
                }
              }}
              onComplete={() => {
                if (props.onComplete) {
                  props.onComplete("me");
                }
              }}
              onLayout={() => {
                boardReadyStatus.player = true;
                this.onLayout();
              }}
              fps={props.fps}
              noAnimation={props.noAnimation}
              dockEasing={props.playerDockEasing}
              dockEasingDuration={props.playerDockEasingDuraton}
              noGradient={props.noGradient}
              showSize
            />
          </PlayerBoardContainer>
        </BlockBoardContainer>
        <NativeRefBox
          ref={expressionWheelContainerRef}
          style={{
            display: 'none',
            position: 'absolute',
            scaleX: 0,
            scaleY: 0,
          }}
        >
          <ExpressionEquipWheel
            {...props.expressions}
            onPress={(direction) => {
              this.hideExpressionWheel(() => {
                if (props.onPressExpression) {
                  props.onPressExpression(direction);
                }
              });
            }}
            size={expressionWheelSize}
          />
        </NativeRefBox>
      </GameSceneContainer>
    );
  }
}

export default GameScene;
