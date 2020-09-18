import React, { RefObject } from 'react'
import { View, Text, BackHandler, Dimensions } from 'react-native'
import Loading from '../../../components/Loading'
import NativeRefBox from '../../../components/NativeRefBox'
import { Modal, LoadingAnimationContainer, LoadingText } from './MultiWaitingPopup/_StyledComponent'
import useMultiGameSocket, { OnSendRoomParam } from '../../../hooks/useMultiGameSocket'
import usePlayData from '../../../hooks/usePlayData'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator'
import { useDispatch } from 'react-redux'
import { applyGuestId } from '../../../redux/actions/playData/thunk'
import { useNavigation, NavigationState, NavigationProp, RouteProp, CommonActions } from '@react-navigation/native'
import { RootStackParamList } from '../../../router/routes'
import { StackNavigationProp } from '@react-navigation/stack'
import { FullFlexCenter } from '../../../components/Generic/StyledComponents'
import { BeforeRemoveEvent } from '../GameScreen/utils'

type MultiWaitingPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_MultiWaiting">;
type MultiWaitingPopupRouteProps = RouteProp<RootStackParamList, "Popup_MultiWaiting">;

type MultiWaitingPopupProps = {
  navigation: MultiWaitingPopupNavigationProps;
  route: MultiWaitingPopupRouteProps;
}

const blockRemoveStack = (e: BeforeRemoveEvent) => e.preventDefault();

const MultiWaitingPopup = (props: MultiWaitingPopupProps) => {
  let foundMatch = false;
  let text = '상대를 찾고 있습니다';
  let interval: null | NodeJS.Timer = null
  const loadingTextRef = React.createRef<Text>();
  const modalRef = React.createRef<NativeRefBox>();
  const loadingTextContainerRef = React.createRef<NativeRefBox>();
  const socket = useMultiGameSocket();
  const playdata = usePlayData();
  const roomData = React.useRef<OnSendRoomParam | null>(null);

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

    modalRef.current?.animate({
      style: {
        backgroundColor: 'black',
        borderColor: 'white',
      },
      duration: 100,
      easing: "easeInOutSine",
    }).start();

    loadingTextContainerRef.current?.animate({
      style: {
        scaleX: 1.3,
        scaleY: 1.3,
      },
      duration: 300,
      easing: "easeOutElastic",
    }).start();

    loadingTextRef.current?.setNativeProps({
      color: 'yellow'
    })
  }

  const onAnimationCompleted = () => {
    if (roomData.current) {
      props.navigation.removeListener("beforeRemove", blockRemoveStack);
      props.navigation.replace("PD_MultiGame", roomData.current);
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

  return (
    <FullFlexCenter style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
      <Modal style={{width: Dimensions.get('screen').width - 60, maxWidth: 300}} ref={modalRef}>
        <LoadingAnimationContainer>
          <Loading
            checkIfLoaded={checkIfFoundMatch}
            onLastAnimationStarted={onLastAnimationStarted}
            onAnimationCompleted={onAnimationCompleted}
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
