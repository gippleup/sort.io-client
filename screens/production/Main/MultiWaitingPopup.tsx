import React, { RefObject } from 'react'
import { View, Text, BackHandler, Dimensions, ToastAndroid, Animated, Easing } from 'react-native'
import Loading from '../../../components/Loading'
import NativeRefBox from '../../../components/NativeRefBox'
import { Modal, LoadingAnimationContainer, LoadingText } from './MultiWaitingPopup/_StyledComponent'
import useMultiGameSocket, { OnSendRoomParam } from '../../../hooks/useMultiGameSocket'
import usePlayData from '../../../hooks/usePlayData'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../router/routes'
import { StackNavigationProp } from '@react-navigation/stack'
import { FullFlexCenter } from '../../../components/Generic/StyledComponents'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import Svg, { Defs, Ellipse, RadialGradient, Rect, Stop, StopProps } from 'react-native-svg'
import MaskedView from '@react-native-community/masked-view'
import chroma from 'chroma-js'
import useGlobal from '../../../hooks/useGlobal'

type MultiWaitingPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_MultiWaiting">;
type MultiWaitingPopupRouteProps = RouteProp<RootStackParamList, "Popup_MultiWaiting">;

type MultiWaitingPopupProps = {
  navigation: MultiWaitingPopupNavigationProps;
  route: MultiWaitingPopupRouteProps;
}

const AnimatedStop = Animated.createAnimatedComponent(Stop);

const blockRemoveStack = (e: BeforeRemoveEvent) => {
  e.preventDefault();
};

const MultiWaitingPopup = (props: MultiWaitingPopupProps) => {
  let foundMatch = false;
  let text = '상대를 찾고 있습니다';
  let interval: null | NodeJS.Timer = null;
  const global = useGlobal();
  const loadingTextRef = React.createRef<Text>();
  const modalRef = React.createRef<NativeRefBox>();
  const loadingTextContainerRef = React.createRef<NativeRefBox>();
  const socket = useMultiGameSocket();
  const playdata = usePlayData();
  const roomData = React.useRef<OnSendRoomParam | null>(null);
  const stopColorAnimation = new Animated.Value(0);
  const animContainerRef = React.createRef<NativeRefBox>();
  const innerStopOffset = stopColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });
  const outerStopOffset = stopColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const closeSocket = () => {
    socket.close();
    return null;
  };

  const setRefText = (text: string) => {
    loadingTextRef.current?.setNativeProps({
      text,
    })
  }

  const checkIfFoundMatch = () => {
    return foundMatch;
  }

  const onLastAnimationStarted = () => {
    if (interval !== null) {
      clearInterval(interval);
    }

    setRefText("곧 시작합니다!");

    Animated.timing(stopColorAnimation, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }).start();

    animContainerRef.current?.animate({
      style: {
        marginBottom: 50,
      },
      duration: 100,
      easing: "easeOutSine"
    }).start();

    loadingTextContainerRef.current?.animate({
      style: {
        scaleX: 1.3,
        scaleY: 1.3,
        marginBottom: 20,
      },
      duration: 300,
      easing: "easeOutElastic",
    }).start();

    loadingTextRef.current?.setNativeProps({
      color: 'white'
    })
  }

  const onAnimationCompleted = () => {
    if (roomData.current) {
      props.navigation.removeListener("beforeRemove", blockRemoveStack);
      props.navigation.replace("MultiGame", roomData.current);
    }
  }

  const updateLoadingText = () => {
    if (text !== '상대를 찾고 있습니다...') {
      text += '.';
    } else {
      text = '상대를 찾고 있습니다';
    }
    setRefText(text);
  }

  React.useEffect(() => {
    interval = setInterval(updateLoadingText, 800)
    BackHandler.addEventListener("hardwareBackPress", closeSocket)

    const openListener = socket.addListener("onOpen", () => {
      if (!playdata.user.id) {
      } else {
        socket.send(socketClientActions.enter({
          userId: playdata.user.id,
          name: playdata.user.name,
          skin: global.skin,
        }));
      }
    })

    const loadListener = socket.addListener("onSendRoom", (option: OnSendRoomParam) => {
      foundMatch = true;
      roomData.current = option;
      BackHandler.removeEventListener("hardwareBackPress", closeSocket);
      props.navigation.addListener("beforeRemove", blockRemoveStack);
    })

    const closeListener = socket.addListener("onClose", () => {
      const userId = playdata.user.id || -1;
      const roomId = roomData.current?.roomId || -1;
      socket.send(socketClientActions.alertDisconnect({
        userId,
        roomId
      }))
    })

    return () => {
      if (interval !== null) { clearInterval(interval); }
      BackHandler.removeEventListener("hardwareBackPress", closeSocket)
      socket.removeListener(openListener);
      socket.removeListener(loadListener);
      socket.removeListener(closeListener)
    }
  }, [])

  const mask = <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 15
    }}
  />

  return (
    <FullFlexCenter style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
      <Modal style={{width: Dimensions.get('window').width - 60, maxWidth: 300}} ref={modalRef}>
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <MaskedView maskElement={mask}>
            <Svg style={{width: '100%', height: '100%', borderRadius: 15}}>
              <Rect x="0%" y="0%" width="100%" height="100%"  fill="url(#grad)" />
              <Defs>
                <RadialGradient
                  id="grad"
                  cx="50%"
                  cy="50%"
                  rx="500"
                  ry="500"
                  fx="50%"
                  fy="50%"
                  gradientUnits="userSpaceOnUse"
                >
                  <AnimatedStop offset={innerStopOffset} stopColor="dodgerblue" stopOpacity="1" />
                  <AnimatedStop offset={outerStopOffset} stopColor="black" stopOpacity="0.9" />
                </RadialGradient>
              </Defs>
            </Svg>
          </MaskedView>
        </View>
        <LoadingAnimationContainer ref={animContainerRef}>
          <Loading
            checkIfLoaded={checkIfFoundMatch}
            onLastAnimationStarted={onLastAnimationStarted}
            onAnimationCompleted={onAnimationCompleted}
            skin={global.skin}
          />
        </LoadingAnimationContainer>
        <NativeRefBox ref={loadingTextContainerRef}>
          <LoadingText
            ref={loadingTextRef}
            editable={false}
            value={text}
          />
        </NativeRefBox>
      </Modal>
    </FullFlexCenter>
  )
}

export default MultiWaitingPopup
