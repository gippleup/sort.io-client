import React from 'react'
import { View, Text } from 'react-native'
import BasicPopup, { PopupButton } from '@components/Generic/BasicPopup'
import { NotoSans } from '@components/Generic/StyledComponents'
import { useNavigation, RouteProp, CommonActions, NavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import routes, { RootStackParamList } from '@router/routes'
import useMultiGameSocket from '@hooks/useMultiGameSocket'
import socketClientActions from '@hooks/useMultiGameSocket/action/creator'
import usePlayData from '@hooks/usePlayData'
import useGlobal from '@hooks/useGlobal'
import TranslationPack from '@Language/translation'
import { modifyToTargetRoutes, remainTargetRoutes, removeTargetRoute } from '@api/navigation'

type CancelGameNavigationProp = StackNavigationProp<RootStackParamList, 'Popup_CancelGame'>
type CancelGameRouteProp = RouteProp<RootStackParamList, 'Popup_CancelGame'>

export type CancelGameParams = {
  text: string;
  title?: string;
  mode: "multi" | "single"
}

type CancelGameProps = {
  route: CancelGameRouteProp;
  navigation: CancelGameNavigationProp;
}

const CancelGamePopup = (props: CancelGameProps) => {
  const {text, title, mode} = props.route.params;
  const playData = usePlayData();
  const navigation: NavigationProp<RootStackParamList> = props.navigation;
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;

  const sendExitGame = () => {
    if (mode === "multi") {
      if (!playData.user.id || roomId === undefined) return;
      socket.send(socketClientActions.exit({
        userId: playData.user.id,
        roomId,
      }));
      socket.close();
    }
  }

  const exitGame = () => {
    if (mode === "multi") {
      sendExitGame();
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main"},
      ]);
    } else if (mode === "single") {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main", onDemand: true},
        {name: "SelectStage"},
      ]);
    }
  }

  const buttons: PopupButton[] = [
    {
      text: translation.yes,
      onPress: exitGame,
      style: {
        backgroundColor: 'pink',
      }
    },
    {
      text: translation.no,
      onPress: () => removeTargetRoute(navigation, "Popup_CancelGame"),
      style: {
        backgroundColor: 'lightgrey',
      }
    },
  ]

  return (
    <View style={{flex: 1}}>
      <BasicPopup
        title={title}
        buttonAlign="horizontal"
        buttons={buttons}>
        <NotoSans type="Bold">{text}</NotoSans>
      </BasicPopup>
    </View>
  )
}

export default CancelGamePopup
