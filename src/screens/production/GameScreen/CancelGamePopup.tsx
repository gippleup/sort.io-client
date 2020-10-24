import React from 'react'
import { View, Text } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import { useNavigation, RouteProp, CommonActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import routes, { RootStackParamList } from '../../../router/routes'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator'
import usePlayData from '../../../hooks/usePlayData'

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
  const navigation = props.navigation;
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();

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

  const goToMain = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name === "Main");
      const result = CommonActions.reset({
        ...state,
        routes,
        index: 0,
      });
      return result;
    })
  }

  const exitGame = () => {
    goToMain();
    sendExitGame();
  }

  const buttons: PopupButton[] = [
    {
      text: "예",
      onPress: exitGame,
      style: {
        backgroundColor: 'pink',
      }
    },
    {
      text: "아니요",
      onPress: navigation.goBack,
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