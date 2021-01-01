import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Easing, Animated, BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components'
import { modifyToTargetRoutes } from '@api/navigation';
import { NotoSans } from '@components/Generic/StyledComponents';
import useGlobal from '@hooks/useGlobal';
import useMultiGameSocket from '@hooks/useMultiGameSocket';
import TranslationPack from '@Language/translation';

const Container: typeof View = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.9);
  align-items: center;
  justify-content: center;
`;

const InfoText: typeof NotoSans = styled(NotoSans)`
  width: 120px;
  height: 120px;
  background-color: dodgerblue;
  border-width: 0.5px;
  border-radius: 30px;
  text-align: center;
  text-align-vertical: center;
`;

const WaitingOpponentPopup = () => {
  const wiggle = React.useRef(new Animated.Value(0));
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;
  const navigation = useNavigation();
  const socket = useMultiGameSocket();
  const scale = wiggle.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
    if (e.data.action.type === "GO_BACK") {
      e.preventDefault();
    }
  })

  const alertPrepareListener = socket.addListener("onAlertPrepare",
    () => {
      unsubscribeBeforeRemove();
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "MultiGame"},
        {name: "Popup_Prepare"},
      ])
    })

  const goToMain = () => {
    socket.close();
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "Main"},
    ])
  }
  
  React.useEffect(() => {
    const scaleAnimation = Animated.sequence([
      Animated.timing(wiggle.current, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(wiggle.current, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(scaleAnimation).start();

    return () => {
      unsubscribeBeforeRemove();
    }
  })

  return (
    <Container>
      <Animated.View style={{transform: [{scale}]}}>
        <InfoText
          size={20}
          color="white"
          type="Black"
        >
          {translation.waitingOpponent}
        </InfoText>
      </Animated.View>
      <TouchableOpacity onPress={goToMain}>
        <View style={{padding: 10, backgroundColor: "white", borderRadius: 20, marginTop: 70}}>
          <NotoSans size={20}>
            CANCEL
          </NotoSans>
        </View>
      </TouchableOpacity>
    </Container>
  )
}

export default WaitingOpponentPopup
