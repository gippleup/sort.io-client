import MaskedView from '@react-native-community/masked-view';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Dimensions, ViewStyle, Easing, Animated, PanResponder, InteractionManager } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { removeTargetRoute } from '../../api/navigation';
import { RawSingleRankData, RawMultiRankData, getSinglePlayRankFromTo, getMultiPlayRankFromTo } from '../../api/rank';
import PatternBackground from '../../components/GameScene/PatternBackground'
import { NotoSans, Space, WindowSizeView } from '../../components/Generic/StyledComponents';
import SingleRankList from '../../components/SingleRankList';
import StrokedText from '../../components/StrokedText';
import useGlobal from '../../hooks/useGlobal';
import TranslationPack from '../../Language/translation';
import { RootStackParamList } from '../../router/routes';
import MultiRankBoard from './LeaderBoard/MultiRankBoard';
import SingleRankBoard from './LeaderBoard/SingleRankBoard';
import SpanSelector, { SpanSelectorOnChange } from './LeaderBoard/SpanSelector';

const backgroundImage = require('../../assets/BackgroundPattern.png');
const boardWidth = Dimensions.get('window').width - 50;

const GoBack: typeof NotoSans = styled(NotoSans)`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
`;

type LeaderBoardState = {
  span: number;
  interestedOn: "single" | "multi";
}

const LeaderBoard = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const touchStartX = React.useRef<null | number>(null);
  const touchEndX = React.useRef<null | number>(null);
  const prevOffsetX = React.useRef(0);
  const curOffsetX = React.useRef(0);
  const swipeProgress = React.useRef(new Animated.Value(0)).current;
  const [state, setState] = React.useState<LeaderBoardState>({
    span: 1,
    interestedOn: "single",
  });
  const {span, interestedOn} = state;
  const boardLength = 20;

  const updateState = (newState: Partial<LeaderBoardState>) => {
    setState({...state, ...newState});
  }

  swipeProgress.addListener((state) => {
    curOffsetX.current = - state.value * boardWidth;
  })

  const boardContainerTranslateX = swipeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -boardWidth],
  });
  
  const leftBoardScale = swipeProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  })

  const leftBoardRoateY = swipeProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '30deg', '0deg'],
  })
  
  const rightBoardScale = swipeProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  })

  const rightBoardRoateY = swipeProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-30deg', '0deg'],
  })

  const onChangeSpan: SpanSelectorOnChange = (span) => {
    InteractionManager.runAfterInteractions(() => {
      updateState({
        span,
        interestedOn: JSON.stringify(swipeProgress) === "1" ? "multi" : "single"
      });
    })
  }

  const goback = () => removeTargetRoute(navigation, "LeaderBoard");

  const gestureResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      if (touchStartX.current === null) {
        touchEndX.current = null;
        prevOffsetX.current = curOffsetX.current;
        touchStartX.current = e.nativeEvent.pageX;
      }
    },
    onPanResponderMove: (e) => {
      if (touchStartX.current) {
        const diffX = e.nativeEvent.pageX - touchStartX.current;
        curOffsetX.current = prevOffsetX.current + diffX;
        const progress = -(curOffsetX.current / boardWidth);
        swipeProgress.setValue(progress);
      }
    },
    onPanResponderRelease: (e) => {
      if (touchStartX.current && touchEndX.current === null) {
        const diffX = e.nativeEvent.pageX - touchStartX.current;
        curOffsetX.current = prevOffsetX.current + diffX;
        const progress = -(curOffsetX.current / boardWidth);
        touchEndX.current = e.nativeEvent.pageX;
        touchStartX.current = null;
        if (progress <= 0.5) {
          Animated.timing(swipeProgress, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.back(3)),
            useNativeDriver: false,
          }).start(() => {
            InteractionManager.runAfterInteractions(() => {
              updateState({interestedOn: "single"})
            })
          });
        } else {
          Animated.timing(swipeProgress, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.back(3)),
            useNativeDriver: false,
          }).start(() => {
            InteractionManager.runAfterInteractions(() => {
              updateState({interestedOn: "multi"})
            })
          });
        }
      }
    },
  })

  return (
    <WindowSizeView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PatternBackground source={backgroundImage} />
      <WindowSizeView
        style={{
          position: 'absolute',
          borderWidth: 1,
        }}
        {...gestureResponder.panHandlers}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => false}
      />
      <SpanSelector onChange={onChangeSpan} />
      <Animated.View style={{width: boardWidth, flexDirection: 'row', left: boardContainerTranslateX}}>
        <Animated.View style={{transform: [{rotateY: leftBoardRoateY}, {scale: leftBoardScale}]}}>
          <View style={{alignItems: 'center'}}>
            <StrokedText
              dyMultiplier={0.34}
              fillColor="tomato"
              fontFamily="NotoSansKR-Black"
              fontSize={30}
              height={50}
              strokeColor="black"
              strokeWidth={3}
              text={translation.singlePlay + " - TOP 20"}
              width={Dimensions.get('window').width - 50}
            />
          </View>
          <Space height={10} />
          <SingleRankBoard interestedOn={interestedOn === "single"} length={boardLength} span={span} />
        </Animated.View>
        <Animated.View style={{transform:[{scale: rightBoardScale}, {rotateY: rightBoardRoateY}]}}>
          <View style={{alignItems: 'center'}}>
            <StrokedText
              dyMultiplier={0.34}
              fillColor="springgreen"
              fontFamily="NotoSansKR-Black"
              fontSize={30}
              height={50}
              strokeColor="black"
              strokeWidth={3}
              text={translation.multiPlay + " - Top 20"}
              width={Dimensions.get('window').width - 50}
            />
          </View>
          <Space height={10} />
          <MultiRankBoard interestedOn={interestedOn === "multi"} length={boardLength} span={span} />
        </Animated.View>
      </Animated.View>
      <Space height={20} />
      <TouchableOpacity onPress={goback}>
        <GoBack size={20} color="slateblue" type="Black">
          {translation.goToMain}
        </GoBack>
      </TouchableOpacity>
    </WindowSizeView>
  )
}

export default LeaderBoard
