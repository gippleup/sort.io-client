import React from 'react'
import { BackHandler } from 'react-native'
import { RouteProp, EventArg, StackNavigationState, EventListenerCallback, EventMapCore } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import GameScene from '../../components/GameScene';
import { RootStackParamList } from '../../router/routes';
import {GameMode, GameSubType, generateOptionByLevel, BeforeRemoveEvent} from './GameScreen/utils'
import { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';
import useGlobal from '../../hooks/useGlobal';
import TranslationPack from '../../Language/translation';
import { generateMapFromLocal } from '../../api/blockMap';

export type StateEventCallback = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState>, "state">

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameScene'>
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScene'>

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
  const global = useGlobal();
  const lan = global.language;
  const translation = TranslationPack[lan].screens.SinglePlay;
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
            text = translation.quitChallenge;
          } else if (subType === 'training') {
            text = translation.quitPratice;
          }
  
          navigation.navigate('Popup_CancelGame', {
            title: "PAUSE",
            text: text,
            mode: "single",
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
    setMap(generateMapFromLocal(option.map).question);
    // generateMap_Server(option.map).then((data) => {
    //   setMap(data.question)
    // })
    return <></>;
  }

  const navigateToStageClearPopup = (result: "suceess" | "fail") => {
    stageFinished = true;
    gameSceneRef.current?.timerRef.current?.timerBaseRef.current?.stopTimer();
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
      playerSkin={global.skin}
      map={map}
      title={option.levelStr}
      timeLimit={option.time}
      maxScore={option.map.maxScore}
      mode={mode}
      onComplete={() => {
        navigateToStageClearPopup("suceess")
      }}
      onTimeOut={() => {
        navigateToStageClearPopup("fail")
      }}
      fps={60}
      timerRoundTo={0}
      timerFps={1}
      playerDockEasingDuraton={300}
      playerDockEasing="easeOutBounce"
      noAnimation={!global.animationEnabled}
      resetVisible
    />
  );
}

export default GameScreen
