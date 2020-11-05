import React, { RefObject } from 'react'
import { View, Animated, Easing, TextInput, BackHandler } from 'react-native'
import StrokedText from '../../../components/StrokedText'
import { FlexHorizontal, NotoSans } from '../../../components/Generic/StyledComponents';
import AnimatedCheckbox from '../../../components/AnimatedCheckbox';
import { useNavigation, RouteProp } from '@react-navigation/native';
import chroma from 'chroma-js';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../router/routes';
import { useDispatch } from 'react-redux';
import { depositGold, saveSinglePlay } from '../../../redux/actions/playData/thunk';
import { GameSubType, GameMode, findLastBoolean, getLevelString } from './utils';
import Svg, { Text } from 'react-native-svg';
import { getSoundEffect } from '../../../assets/Sounds';

type StageClearPopupNavigationProp = StackNavigationProp<RootStackParamList, 'Popup_StageClear'>
type StageClearPopupRouteProp = RouteProp<RootStackParamList, 'Popup_StageClear'>

export type StageClearPopupParams = {
  results: (null | boolean)[];
  mode: GameMode;
  subType: GameSubType;
  level: number;
  leftTrial: number;
  successiveWin: number;
}

type StageClearPopupProps = {
  route: StageClearPopupRouteProp;
  navigation: StageClearPopupNavigationProp;
}

const StageClearPopup = (props: StageClearPopupProps) => {
  const dispatch = useDispatch();
  const { mode, leftTrial, level, subType, successiveWin, results } = props.route.params;

  const finishStageWith = (result: 'fail' | 'success') => {
    const nextLevel = Math.min(Math.max(level + (result === 'success' ? 1 : -1), 0), 72);
    const nextSuccessiveWin = result === 'success' ? successiveWin + 1 : 0;
    const successiveWins = [];
    for (let i = 0; i < nextSuccessiveWin; i += 1) {
      successiveWins.push(i + 1);
    }
    const goldMultiplier = subType === 'challenge' ? 2 : 1;
    const bonus = successiveWins.length ? 10 * successiveWins.reduce((acc, ele) => acc + ele) * goldMultiplier : 0;
    const reward = 10 + bonus;

    dispatch(depositGold(reward))

    props.navigation.pop();
    if (leftTrial > 0) {
      props.navigation.replace('GameScene', {
        mode: mode,
        level: nextLevel,
        leftTrial: leftTrial - 1,
        subType: subType,
        successiveWin: nextSuccessiveWin,
        results,
      })
    } else {
      if (subType === 'challenge') {
        dispatch(saveSinglePlay(level))
      }
      navigation.goBack();
    }
  }

  const navigation = useNavigation();
  const { index: round, value: hasWin } = findLastBoolean(props.route.params.results);
  const title = hasWin ? "SUCCESS!" : "FAIL!"
  const subTitle = `${round + 1}   /   3`;
  const titleAppearAnim = new Animated.Value(0);

  const titleScale = titleAppearAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const blockBack = () => true;
  BackHandler.addEventListener("hardwareBackPress", blockBack);

  React.useEffect(() => {
    Animated.timing(titleAppearAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(5),
      useNativeDriver: true,
    }).start()

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", blockBack);
    }
  })

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StrokedText
        text={subTitle}
        fillColor={hasWin ? "yellow" : "red"}
        strokeColor={hasWin ? "goldenrod" : chroma("red").set('hsl.l', 0.3).hex()}
        strokeWidth={10}
        fontFamily="NotoSansKR-Black"
        fontSize={40}
        width={300}
        height={60}
        dyMultiplier={0.35}
      />
      <Animated.View style={{scaleX: titleScale, scaleY: titleScale}}>
        <StrokedText
          text={title}
          fillColor={hasWin ? "yellow" : "red"}
          strokeColor={hasWin ? "goldenrod" : chroma("red").set('hsl.l', 0.3).hex()}
          strokeWidth={10}
          fontFamily="NotoSansKR-Black"
          fontSize={60}
          width={300}
          height={80}
          dyMultiplier={0.35}
        />
      </Animated.View>
      <View style={{scaleX: 0.7, scaleY: 0.7, backgroundColor: 'dodgerblue', borderRadius: 100, borderWidth: 5, borderColor: 'white'}}>
        <FlexHorizontal>
          {results.map((result, i) => {
            return (
              <AnimatedCheckbox
                key={i}
                onAnimationStart={() => {
                  if (i === results.length - 1) {
                    if (hasWin) {
                      const sound = getSoundEffect().success[(successiveWin + 1) as 1 | 2 | 3];
                      sound.setVolume(1);
                      sound.setCurrentTime(0);
                      if (successiveWin === 2) {
                        const sound = getSoundEffect().success[4]
                        sound.setVolume(1);
                        sound.setCurrentTime(0);
                        sound.play();
                      }
                    } else {
                      getSoundEffect().fail.play();
                    }
                  }
                }}
                blank={result === null ? true : false}
                checked={result === true}
                animated={round === i}
                onAnimationFinished={() => {
                  finishStageWith(hasWin ? "success" : "fail")
                }}
              />
            )
          })}
        </FlexHorizontal>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 30,
          borderRadius: 50,
          paddingVertical: 10
        }}>
        <NotoSans
          type="Black"
          size={40}
          style={{
            color: chroma('brown')
              .set('hsl.l', 0.6)
              .desaturate(2)
              .hex()
          }}>
          {getLevelString(level)}
        </NotoSans>
      </View>
    </View>
  )
}

export default StageClearPopup
