import React from 'react'
import { View, Text } from 'react-native'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../router/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import usePlayData from '../../../hooks/usePlayData';
import StrokedText from '../../../components/StrokedText';
import ReadyTimer from '../../../components/ReadyTimer';
import { BeforeRemoveEvent } from '../GameScreen/utils';
import { FullFlexCenter } from '../../../components/Generic/StyledComponents';

type PreparePopupRouteProps = RouteProp<RootStackParamList, "Popup_Prepare">;
type PreparePopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_Prepare">;

export type PreparePopupParams = undefined;

type PreparePopupProps = {
  navigation: PreparePopupNavigationProps;
  route: PreparePopupRouteProps;
}

const PreparePopup = (props: PreparePopupProps) => {
  const playData = usePlayData();
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const readyTimerRef = React.createRef<ReadyTimer>();
  const navigation = useNavigation();

  const sendPrepared = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.alertPrepared({
      roomId,
      userId: playData.user.id,
    }))
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
        if (leftTime > 0) {
          readyTimerRef.current?.setLeftTime(leftTime);
        } else {
          props.navigation.pop();
        }
      })

    return () => {
      socket.removeListener(syncPrepareTimerListener);
      navigation.removeListener("beforeRemove", blockGoBack);
    }
  })

  return (
    <FullFlexCenter style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
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
