import React from 'react'
import { View, Text, BackHandler } from 'react-native'
import { RouteProp, useNavigation, EventArg } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {generateMap as generateMap_Local} from '../../algo/generateMap';
import {generateMap as generateMap_Server} from '../../api/sortio';
import GameScene from '../../components/GameScene';
import { RootStackParamList } from '../../router/routes';
import {GameMode, GameSubType, generateOptionByLevel} from './GameScreen/utils'
import { saveSingleGameResult, saveGold } from '../../api/local';
import usePopup from '../../hooks/usePopup';
import CancelGamePopup from './GameScreen/CancelGamePopup';

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
}

type GameScreenProps = {
  route: GameScreenRouteProp;
  navigation: GameScreenNavigationProp;
}

const GameScreen = (props: GameScreenProps) => {
  const [map, setMap] = React.useState<null | number[][]>(null);
  const option = generateOptionByLevel(props.route.params.level);
  const popup = usePopup();
  const navigation = useNavigation();
  const gameSceneRef = React.createRef<GameScene>();
  const {mode, leftTrial, level, subType, successiveWin} = props.route.params;

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

    popup.addListener("hide", restartTimer);

    BackHandler.addEventListener("hardwareBackPress", () => {
      stopTimer();
      return null;
    })

    const blockGoBack = (e: BeforeRemoveEvent) => {
      setTimeout(() => {
        popup.show(() => {
          let text = '';
          if (subType === 'challenge') {
            text = '챌린지를 종료하시겠습니까?'
          } else if (subType === 'training') {
            text = '연습모드를 종료하시겠습니까?'
          }
          return (
            <CancelGamePopup
              onPressYes={() => navigation.dispatch(e.data.action)}
              text={text}
            />
          )
        })
      })
      e.preventDefault();
    }

    navigation.addListener("beforeRemove", blockGoBack);

    return () => {
      navigation.removeListener("beforeRemove", blockGoBack);
      popup.removeListener("hide", restartTimer);
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

  const finishStageWith = (result: 'fail' | 'success') => {
    const nextLevel = level + (result === 'success' ? 1 : -1);
    const nextSuccessiveWin = result === 'success' ? successiveWin + 1 : 0;
    const successiveWins = [];
    for (let i = 0; i < nextSuccessiveWin; i += 1) {
      successiveWins.push(i + 1);
    }
    const goldMultiplier = subType === 'challenge' ? 2 : 1;
    const bonus = successiveWins.length ? 10 * successiveWins.reduce((acc, ele) => acc + ele) * goldMultiplier : 0;
    const reward = 10 + bonus;
    
    saveGold(reward).then(async () => {
      if (leftTrial > 0) {
        props.navigation.replace('PD_GameScene', {
          mode: mode,
          level: nextLevel,
          leftTrial: leftTrial - 1,
          subType: subType,
          successiveWin: nextSuccessiveWin,
        })
      } else {
        if (subType === 'challenge') {
          await saveSingleGameResult({
            createdAt: new Date(Date.now()).toDateString(),
            difficulty: level,
            userId: null,
          })
        }
        navigation.goBack();
      }
    })

  }

  return (
    <GameScene
      ref={gameSceneRef}
      skin="spiky"
      map={map}
      title={option.levelStr}
      timeLimit={option.time}
      maxScore={option.map.maxScore}
      mode={mode}
      onComplete={() => finishStageWith('success')}
      onTimeOut={() => finishStageWith('fail')}
    />
  );
}

export default GameScreen
