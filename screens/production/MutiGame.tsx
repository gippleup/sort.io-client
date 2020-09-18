import React from 'react'
import GameScene from '../../components/GameScene';
import { MapOption } from '../../api/sortio';
import usePlayData from '../../hooks/usePlayData';
import useMultiGameSocket from '../../hooks/useMultiGameSocket';
import { AlertDockConstructor } from '../../hooks/useMultiGameSocket/ServerMessages';
import socketClientActions from '../../hooks/useMultiGameSocket/action/creator';
import { RouteProp, NavigationProp, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../../router/routes';
import { BeforeRemoveEvent } from './GameScreen/utils';
import { FullFlexCenter } from '../../components/Generic/StyledComponents';
import { View } from 'react-native';

type MultiGameRouteProps = RouteProp<RootStackParamList, "PD_MultiGame">;
type MultiGameNavigationProps = NavigationProp<RootStackParamList, "PD_MultiGame">;

export type MapDesc = MapOption & { difficulty: number };

export type MultiGameParams = {
  map: number[][];
  mapDesc: MapDesc;
}

type MultiGameProps = {
  route: MultiGameRouteProps;
  navigation: MultiGameNavigationProps;
}

export const MutiGame = (props: MultiGameProps) => {
  const {map, mapDesc} = props.route.params;
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const gameSceneRef = React.createRef<GameScene>();
  const containerRef = React.createRef<View>();
  const playData = usePlayData();
  const navigation = useNavigation();

  const sendDockMessage = (stackIndex: number, action: 'DOCK' | 'UNDOCK') => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.dock({
      userId: playData.user.id,
      stackIndex: stackIndex,
      roomId: roomId,
      action,
    }));
  }

  const sendSuccessMessage = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.success({
      userId: playData.user.id,
      roomId: roomId,
    }));
  }

  const sendReadyMessage = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.alertReady({
      roomId: roomId,
      userId: playData.user.id
    }));
  }

  React.useEffect(() => {
    const errorListener = socket.addListener("onError", 
    (err: WebSocketErrorEvent) => {
      console.log('에러남', err)
    })

    const informOpponentHasLeftListener = socket.addListener(
      "onInformOpponentHasLeft", () => {
        props.navigation.dispatch((state) => {
          const routes: typeof state.routes = state.routes.concat([{
            // key: "Popup_OpponentLeft" + Date.now(),
            // name: "Popup_OpponentLeft",
            key: "Popup_GameResult" + Date.now(),
            name: "Popup_GameResult",
            params: {
              result: 'draw'
            }
          }]);
          socket.removeListener(informOpponentHasLeftListener);
          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });
        })
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
    
    const alertPrepareListener = socket.addListener("onAlertPrepare",
    () => {
      props.navigation.navigate("Popup_Prepare");
      containerRef.current?.setNativeProps({
        pointerEvents: "auto"
      })
    })

    const deleteRoomListener = socket.addListener("onDeleteRoom",
    () => {
    })
    
    const syncTimerListener = socket.addListener("onSyncTimer",
    (leftTime: number) => {
      const $TimerBase = gameSceneRef.current?.timerRef.current?.timerBaseRef.current;
      $TimerBase?.setTimeTo(leftTime);
    })

    const informWinnerListener = socket.addListener("onInformWinner",
    (winnerId: number) => {
      const hasWon = playData.user.id === winnerId;
      props.navigation.dispatch((state) => {
        const routes: typeof state.routes = state.routes.concat([{
          key: "Popup_GameResult" + Date.now(),
          name: "Popup_GameResult",
          params: {
            result: hasWon ? 'win' : 'lose',
          },
        }]);
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    })

    const blockGoBack = (e: BeforeRemoveEvent) => {
      const { payload, type } = e.data.action;
      if (type === "GO_BACK") {
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
      socket.removeListener(informOpponentHasLeftListener);
      socket.removeListener(syncTimerListener);
      socket.removeListener(alertPrepareListener);
      socket.removeListener(informWinnerListener);
    }
  })

  if (!map) {
    return <></>;
  }

  return (
    <View ref={containerRef} style={{flex: 1}} pointerEvents="none">
      <GameScene
        ref={gameSceneRef}
        mode={'multi'}
        title={'하드'}
        map={map}
        skin="spiky"
        timeLimit={60}
        isManualTimer
        maxScore={mapDesc.maxScore}
        onComplete={(winner) => {
          if (winner === 'me') {
            sendSuccessMessage();
          }
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
        // noAnimation 이걸 리덕스로 다뤄야 함. 메인에 버튼 하나 만들고 그걸로 리덕스 상태 변경하기
      />
    </View>
  );
}

export default MutiGame
