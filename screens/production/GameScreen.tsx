import React from 'react'
import { BackHandler } from 'react-native'
import { RouteProp, EventArg, StackNavigationState, EventListenerCallback, EventMapCore } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {generateMap as generateMap_Local} from '../../algo/generateMap';
import {generateMap as generateMap_Server} from '../../api/sortio';
import GameScene from '../../components/GameScene';
import { RootStackParamList } from '../../router/routes';
import {GameMode, GameSubType, generateOptionByLevel} from './GameScreen/utils'
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';

export type StateEventCallback = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState>, "state">

export type BeforeRemoveEvent = EventArg<"beforeRemove", true, {
  action: Readonly<{
    type: string;
    payload?: object | undefined;
    source?: string | undefined;
    target?: string | undefined;
  }>
}>

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PD_GameScene'>
type GameScreenRouteProp = RouteProp<RootStackParamList, 'PD_GameScene'>

export type GameScreenParams = {
  mode: GameMode;
  subType: GameSubType;
  level: number;
  leftTrial: number;
  successiveWin: number;
  results: (null | boolean)[];
}

type GameScreenProps = {
  route: GameScreenRouteProp;
  navigation: GameScreenNavigationProp;
}

const GameScreen = (props: GameScreenProps) => {
  const [map, setMap] = React.useState<null | number[][]>(null);
  const option = generateOptionByLevel(props.route.params.level);
  const navigation = props.navigation;
  const gameSceneRef = React.createRef<GameScene>();
  const {mode, leftTrial, level, subType, successiveWin, results} = props.route.params;
  let stageFinished = false;

  React.useEffect(() => {
    const restartTimer = () => {
      gameSceneRef.current?.
        timerRef.current?.
        timerBaseRef.current?.
        startTimer();
    };

    const stopTimer = () => {
      gameSceneRef.current?.
        timerRef.current?.
        timerBaseRef.current?.
        stopTimer();
    }

    BackHandler.addEventListener("hardwareBackPress", () => {
      stopTimer();
      return null;
    })

    const blockGoBack = (e: BeforeRemoveEvent) => {
      const {payload, type} = e.data.action;
      if (type === "POP") {
        e.preventDefault();
        return;
      }
      if (type === "GO_BACK") {
        if (stageFinished) return;
        e.preventDefault();
        setTimeout(() => {
          let text = '';
  
          if (subType === 'challenge') {
            text = '챌린지를 종료하시겠습니까?'
          } else if (subType === 'training') {
            text = '연습게임을 종료하시겠습니까?'
          }
  
          navigation.navigate('Popup_CancelGame', {
            text: text,
          });        
        })
      }
    }

    navigation.addListener("beforeRemove", blockGoBack);
    navigation.addListener("focus", restartTimer);
    return () => {
      navigation.removeListener("beforeRemove", blockGoBack);
      navigation.removeListener("focus", restartTimer);
    }
  })

  if (!map) {
    if (props.route.params.mode === 'single') {
      setMap(generateMap_Local(option.map).question);
    } else {
      generateMap_Server(option.map).then((data) => {
        setMap(data.question)
      })
    }
    return <></>;
  }

  const navigateToStageClearPopup = (result: "suceess" | "fail") => {
    stageFinished = true;
    const nextResults = results.concat(result === "suceess" ? true : false);
    navigation.navigate('Popup_StageClear', {
      results: nextResults,
      leftTrial,
      level,
      mode,
      subType,
      successiveWin,
    });
  }


  return (
    <GameScene
    ref={gameSceneRef}
      skin="spiky"
      map={map}
      title={option.levelStr}
      // timeLimit={option.time}
      timeLimit={1000}
      maxScore={option.map.maxScore}
      mode={mode}
      onComplete={() => {
        navigateToStageClearPopup("suceess")
      }}
      onTimeOut={() => {
        navigateToStageClearPopup("fail")
      }}
      fps={60}
    />
  );
}

export default GameScreen
