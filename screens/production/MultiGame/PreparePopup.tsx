import React from 'react'
import { View, Text } from 'react-native'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions from './action/creator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../router/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import usePlayData from '../../../hooks/usePlayData';
import StrokedText from '../../../components/StrokedText';
import { FullFlexCenter } from '../Main/MultiWaitingPopup/_StyledComponent';
import ReadyTimer from '../../../components/ReadyTimer';
import { BeforeRemoveEvent } from '../GameScreen/utils';

type PreparePopupRouteProps = RouteProp<RootStackParamList, "Popup_Prepare">;
type PreparePopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_Prepare">;

export type PreparePopupParams = {
  roomId: number;
}

type PreparePopupProps = {
  navigation: PreparePopupNavigationProps;
  route: PreparePopupRouteProps;
}

const PreparePopup = (props: PreparePopupProps) => {
  const { roomId } = props.route.params
  const playData = usePlayData();
  const socket = useMultiGameSocket();
  const readyTimerRef = React.createRef<ReadyTimer>();
  const navigation = useNavigation();

  const sendPrepared = () => {
    if (!playData.user.id) return;
    const prepareMessage = socketClientActions.alertPrepared({
      roomId,
      userId: playData.user.id,
    })
    socket.send(JSON.stringify(prepareMessage))
  }

  React.useEffect(() => {
    const blockGoBack = (e: BeforeRemoveEvent) => {
      const { payload, type } = e.data.action;
      if (type === "GO_BACK") {
        e.preventDefault();
      }
    }

    navigation.addListener("beforeRemove", blockGoBack)

    const syncPrepareTimerListener = socket.addListener("onSyncPrepareTimer",
      (leftTime: number) => {
        readyTimerRef.current?.setLeftTime(leftTime);
        if (leftTime === 0) {
          props.navigation.pop();
        }
      })

    return () => {
      socket.removeListener(syncPrepareTimerListener);
      navigation.removeListener("beforeRemove", blockGoBack);
    }
  })

  return (
    <FullFlexCenter>
      <ReadyTimer
        ref={readyTimerRef}
        isManual
        initialText="Ready!"
        duration={3}
        onInitialTextDisappear={sendPrepared}
      />
    </FullFlexCenter>
  )
}

export default PreparePopup
