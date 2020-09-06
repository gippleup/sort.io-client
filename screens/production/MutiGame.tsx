import React, { Component } from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import GameScene from '../../components/GameScene';
import { BlockTypes } from '../../components/Block/Types';
import { generateMap, MapOption, configureSocket } from '../../api/sortio';
import usePlayData from '../../hooks/usePlayData';
import useMultiGameSocket from '../../hooks/useMultiGameSocket';
import { AlertDockConstructor } from '../../hooks/useMultiGameSocket/ServerMessages';
import socketClientActions from './MultiGame/action/creator';
import { RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../router/routes';
import { stack } from 'd3';
import { BeforeRemoveEvent } from './GameScreen/utils';

type MultiGameRouteProps = RouteProp<RootStackParamList, "PD_MultiGame">;
type MultiGameNavigationProps = NavigationProp<RootStackParamList, "PD_MultiGame">;

export type MapDesc = MapOption & { difficulty: number };

export type MultiGameParams = {
  map: number[][];
  mapDesc: MapDesc;
  roomId: number;
}

type MultiGameProps = {
  route: MultiGameRouteProps;
  navigation: MultiGameNavigationProps;
}

export const MutiGame = (props: MultiGameProps) => {
  const {map, mapDesc, roomId} = props.route.params;
  const socket = useMultiGameSocket();
  const gameSceneRef = React.createRef<GameScene>();
  const playData = usePlayData();
  const navigation = useNavigation();
  let stageFinished = false;

  const sendDockMessage = (stackIndex: number, action: 'DOCK' | 'UNDOCK') => {
    if (!playData.user.id) return;
    const dockMessage = socketClientActions.dock({
      userId: playData.user.id,
      stackIndex: stackIndex,
      roomId: roomId,
      action,
    })
    socket.send(JSON.stringify(dockMessage));
  }

  const sendSuccessMessage = () => {
    if (!playData.user.id) return;
    const successMessage = socketClientActions.success({
      userId: playData.user.id,
      roomId: roomId,
    })
    socket.send(JSON.stringify(successMessage));
  }

  const sendReadyMessage = () => {
    if (!playData.user.id) return;
    const readyMessage = socketClientActions.alertReady({
      roomId: roomId,
      userId: playData.user.id
    })
    socket.send(JSON.stringify(readyMessage));
  }

  React.useEffect(() => {
    const errorListener = socket.addListener("onError", 
    (err: WebSocketErrorEvent) => {
      console.log('에러남', err)
    })

    const alertDockListener = socket.addListener("onAlertDock",
    (data: AlertDockConstructor) => {
      const { userId, stackIndex, action } = data;
      const $opponentBoard = gameSceneRef.current?.opponentBoardRef.current;
      if (userId !== playData.user.id) {
        if (action === "UNDOCK") {
          $opponentBoard?.undock(stackIndex);
        }
        if (action === "DOCK") {
          $opponentBoard?.dock(stackIndex);
        }
      }
    })
    
    const deleteRoomListener = socket.addListener("onDeleteRoom",
    () => {
        // TODO: (상대가 나갔을 때) 상대가 방을 나갔다는 것을 표시해주고, 승리했다는 메세지를 보여준다.
    })
    
    const syncTimerListener = socket.addListener("onSyncTimer",
    (leftTime: number) => {
      const $TimerBase = gameSceneRef.current?.timerRef.current?.timerBaseRef.current;
      $TimerBase?.setTimeTo(leftTime);
    })

    const blockGoBack = (e: BeforeRemoveEvent) => {
      const { payload, type } = e.data.action;
      if (type === "POP") {
        e.preventDefault();
        return;
      }
      if (type === "GO_BACK") {
        if (stageFinished) return;
        e.preventDefault();
        setTimeout(() => {
          navigation.navigate('Popup_CancelGame', {
            title: '기권',
            text: '지금 종료하면 패배 처리됩니다. \n기권하시겠습니까?',
            mode: "multi",
            roomId,
          });
        })
      }
    }

    navigation.addListener("beforeRemove", blockGoBack);
    return () => {
      navigation.removeListener("beforeRemove", blockGoBack);
      socket.removeListener(errorListener);
      socket.removeListener(alertDockListener);
      socket.removeListener(deleteRoomListener);
      socket.removeListener(syncTimerListener);
    }
  })

  if (!map) {
    return <></>;
  }

  return (
    <GameScene
      ref={gameSceneRef}
      mode={'multi'}
      title={'하드'}
      map={map}
      skin="spiky"
      timeLimit={60}
      isManualTimer
      maxScore={mapDesc.maxScore}
      onComplete={() => {
        stageFinished = true;
        sendSuccessMessage();
      }}
      onDock={(stackIndex) => {
        if (!playData.user.id) return;
        sendDockMessage(stackIndex, 'DOCK');
      }}
      onUndock={(stackIndex) => {
        sendDockMessage(stackIndex, 'UNDOCK');
      }}
      onReady={sendReadyMessage}
      timerRoundTo={3}
    />
  );
}

export default MutiGame
