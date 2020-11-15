import React from 'react'
import { Text, BackHandler, View, AppState, AppStateStatus } from 'react-native'
import NativeRefBox from '../../../components/NativeRefBox'
import { LoadingText } from './MultiWaitingPopup/_StyledComponent'
import useMultiGameSocket, { OnSendRoomParam } from '../../../hooks/useMultiGameSocket'
import usePlayData from '../../../hooks/usePlayData'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator'
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../router/routes'
import { StackNavigationProp } from '@react-navigation/stack'
import { FullFlexCenter } from '../../../components/Generic/StyledComponents'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'
import { modifyToTargetRoutes } from '../../../api/navigation'
import styled from 'styled-components'
import Loading from '../../../components/Loading'

type MultiWaitingPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_MultiWaiting">;
type MultiWaitingPopupRouteProps = RouteProp<RootStackParamList, "Popup_MultiWaiting">;

type MultiWaitingPopupProps = {
  navigation: MultiWaitingPopupNavigationProps;
  route: MultiWaitingPopupRouteProps;
}

const TextContainer: typeof View = styled(View)`
  width: 300px;
  background-color: dodgerblue;
  border-radius: 20px;
  border-width: 1px;
`;

const MultiWaitingPopup = (props: MultiWaitingPopupProps) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const global = useGlobal();
  const loadingTextRef = React.createRef<Text>();
  const socket = useMultiGameSocket();
  const playdata = usePlayData();
  const {language: lan} = global;
  const roomData = React.useRef<OnSendRoomParam | null>(null);
  const translation = TranslationPack[lan].screens.Main;

  let foundMatch = false;
  let text = translation.searchingOpponent;
  let interval: null | NodeJS.Timer = null;

  const closeSocket = () => {
    socket.close();
    return null;
  };

  const appStateChangeListener = (state: AppStateStatus) => {
    if (state === "background" || state === "inactive") {
      closeSocket();
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main"},
      ])
    }
  }
  
  AppState.addEventListener("change", appStateChangeListener)

  const unsubscribeBeforeRemove = navigation.addListener("blur", (e) => {
    if (!foundMatch) {
      closeSocket();
    }
  })

  const setRefText = (text: string) => {
    loadingTextRef.current?.setNativeProps({
      text,
    })
  }


  const updateLoadingText = () => {
    if (foundMatch) return;
    if (text !== `${translation.searchingOpponent}...`) {
      text += '.';
    } else {
      text = translation.searchingOpponent;
    }
    setRefText(text);
  }

  React.useEffect(() => {
    interval = setInterval(updateLoadingText, 800)

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
      setRefText(`! ${translation.foundMatch} !`);
      roomData.current = option;
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "MultiGame", params: roomData.current},
      ])
    })

    const pingListener = socket.addListener("onPing", () => {
      const userId = playdata.user.id || -1;
      const roomId = roomData.current?.roomId || -1;
      socket.send(socketClientActions.pong({
        userId,
        roomId,
      }))
    })

    return () => {
      if (interval !== null) { clearInterval(interval); }
      unsubscribeBeforeRemove();
      AppState.removeEventListener("change", appStateChangeListener)
    }
  }, [])

  return (
    <FullFlexCenter style={{backgroundColor: "rgba(0,0,0,0.8)"}}>
      <TextContainer>
        <LoadingText
          ref={loadingTextRef}
          editable={false}
          value={text}
          style={{textAlign: "center"}}
        />
      </TextContainer>
    </FullFlexCenter>
  )
}

export default MultiWaitingPopup
