import React from 'react'
import { View, Text } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {generateMap as generateMap_Local} from '../../algo/generateMap';
import {generateMap as generateMap_Server} from '../../api/sortio';
import GameScene from '../../components/GameScene';
import { RootStackParamList } from '../../router/routes';
import {GameMode, GameSubType, generateOptionByLevel} from './GameScreen/utils'
import { saveSingleGameResult } from '../../api/local';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PD_GameScene'>
type GameScreenRouteProp = RouteProp<RootStackParamList, 'PD_GameScene'>
type GameScreenProps = {
  route: GameScreenRouteProp;
  navigation: GameScreenNavigationProp;
}

export type GameScreenParams = {
  mode: GameMode;
  subType: GameSubType;
  level: number;
  leftTrial: number;
}

const GameScreen = (props: GameScreenProps) => {
  const [map, setMap] = React.useState<null | number[][]>(null);
  const option = generateOptionByLevel(props.route.params.level);
  const navigation = useNavigation();
  const {mode, leftTrial, level, subType} = props.route.params;

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
    if (leftTrial > 0) {
      props.navigation.replace('PD_GameScene', {
        mode: mode,
        level: nextLevel,
        leftTrial: leftTrial - 1,
        subType: subType,
      })
    } else {
      saveSingleGameResult({
        createdAt: new Date(Date.now()).toDateString(),
        difficulty: level,
        userId: null,
      }).then(() => {
        navigation.goBack();
      })
    }
  }

  return (
    <GameScene
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
