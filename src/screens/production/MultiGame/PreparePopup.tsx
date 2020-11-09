import React from 'react'
import { View, Text } from 'react-native'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions from '../../../hooks/useMultiGameSocket/action/creator';
import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../router/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import usePlayData from '../../../hooks/usePlayData';
import StrokedText from '../../../components/StrokedText';
import ReadyTimer from '../../../components/ReadyTimer';
import { BeforeRemoveEvent } from '../GameScreen/utils';
import { FullFlexCenter } from '../../../components/Generic/StyledComponents';
import chroma from 'chroma-js';
import { modifyToTargetRoutes, remainTargetRoutes } from '../../../api/navigation';

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
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const sendPrepared = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.alertPrepared({
      roomId,
      userId: playData.user.id,
    }))
  }

  const unsubscribeBlockRemove = navigation.addListener("beforeRemove", (e) => {
    const { payload, type } = e.data.action;
    if (type === "GO_BACK") {
      e.preventDefault();
    }
  })

  React.useEffect(() => {
    const syncPrepareTimerListener = socket.addListener("onSyncPrepareTimer",
      (leftTime: number) => {
        if (leftTime > 0) {
          readyTimerRef.current?.setLeftTime(leftTime);
        } else {
          readyTimerRef.current?.setText("START!");
          setTimeout(() => {
            modifyToTargetRoutes(navigation, [
              {name: "LoadingScreen"},
              {name: "MultiGame"},
            ])
          }, 1000);
        }
      })

    return () => {
      // socket.removeListener(syncPrepareTimerListener);
      unsubscribeBlockRemove();
    }
  })

  return (
    <FullFlexCenter style={{backgroundColor: chroma('dodgerblue').alpha(0.3).hex()}}>
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
