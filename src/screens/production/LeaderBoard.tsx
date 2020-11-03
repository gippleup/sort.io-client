import MaskedView from '@react-native-community/masked-view';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { RefObject } from 'react'
import { View, Text, Dimensions, ViewStyle, Easing, Animated, PanResponder } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { SinglePlayData } from '../../api/local';
import { removeTargetRoute } from '../../api/navigation';
import { getSinglePlayRank, RankData, UserSingleRankData } from '../../api/sortio';
import PatternBackground from '../../components/GameScene/PatternBackground'
import { FlexHorizontal, FullFlexCenter, NotoSans, Space, WindowSizeView } from '../../components/Generic/StyledComponents';
import NativeRefBox from '../../components/NativeRefBox';
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../components/RankViewer';
import SlideSelector from '../../components/SlideSelector';
import StrokedText from '../../components/StrokedText';
import useGlobal from '../../hooks/useGlobal';
import usePlayData from '../../hooks/usePlayData';
import TranslationPack from '../../Language/translation';
import { RootStackParamList } from '../../router/routes';
import RankBoard from './LeaderBoard/RankBoard';

const backgroundImage = require('../../assets/BackgroundPattern.png');
const boardWidth = Dimensions.get('window').width - 50;

const LeaderBoardContainer: typeof View = styled(View)`
  width: ${boardWidth}px;
  height: ${Dimensions.get('window').height - 250}px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
`;

const GoBack: typeof NotoSans = styled(NotoSans)`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
`;

const LeaderBoard = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const touchStartX = React.useRef<null | number>(null);
  const touchEndX = React.useRef<null | number>(null);
  const prevOffsetX = React.useRef(0);
  const curOffsetX = React.useRef(0);
  const swipeProgress = React.useRef(new Animated.Value(0)).current;

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
          }).start();
        } else {
          Animated.timing(swipeProgress, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.back(3)),
            useNativeDriver: false,
          }).start();
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
      <Animated.View style={{width: boardWidth, flexDirection: 'row', left: boardContainerTranslateX}}>
        <Animated.View style={{transform: [{rotateY: leftBoardRoateY}, {scale: leftBoardScale}]}}>
          <View style={{alignItems: 'center'}}>
            <StrokedText
              dyMultiplier={0.34}
              fillColor="black"
              fontFamily="NotoSansKR-Black"
              fontSize={40}
              height={50}
              strokeColor="white"
              strokeWidth={3}
              text={translation.singlePlay}
              width={Dimensions.get('window').width - 50}
            />
          </View>
          <Space height={10} />
          <LeaderBoardContainer>
            <RankBoard mode="single" />
          </LeaderBoardContainer>
        </Animated.View>
        <Animated.View style={{transform:[{scale: rightBoardScale}, {rotateY: rightBoardRoateY}]}}>
          <View style={{alignItems: 'center'}}>
            <StrokedText
              dyMultiplier={0.34}
              fillColor="black"
              fontFamily="NotoSansKR-Black"
              fontSize={40}
              height={50}
              strokeColor="white"
              strokeWidth={3}
              text={translation.multiPlay}
              width={Dimensions.get('window').width - 50}
            />
          </View>
          <Space height={10} />
          <LeaderBoardContainer>
            <RankBoard mode="multi" />
          </LeaderBoardContainer>
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
