import { CommonActions, NavigationProp } from "@react-navigation/native";
import { MutableRefObject, RefObject } from "react";
import { View } from "react-native";
import GameScene from "../../../../components/GameScene";
import { SupportedExpression } from "../../../../components/Profile/Expressions";
import useMultiGameSocket from "../../../../hooks/useMultiGameSocket";
import socketClientActions from "../../../../hooks/useMultiGameSocket/action/creator";
import { AlertDockConstructor } from "../../../../hooks/useMultiGameSocket/ServerMessages";
import usePlayData from "../../../../hooks/usePlayData";
import { RootStackParamList } from "../../../../router/routes";
import { MultiGameProps } from "../../MutiGame";

type MultiGameSocketLogicParams = {
  playData: ReturnType<typeof usePlayData>,
  socket: ReturnType<typeof useMultiGameSocket>,
  props: MultiGameProps,
  gameSceneRef: RefObject<GameScene>,
  containerRef: RefObject<View>,
  gameStarted: MutableRefObject<boolean>,
  opponentExpress: (expression: SupportedExpression) => any;
  playerExpress: (expression: SupportedExpression) => any;
  navigation: NavigationProp<RootStackParamList, "MultiGame">
}

const multiGameSocketLogic = (param: MultiGameSocketLogicParams) => {
  const {
    playData,
    socket,
    props,
    containerRef,
    gameSceneRef,
    gameStarted,
    opponentExpress,
    playerExpress,
    navigation,
  } = param;
  const { roomId } = socket.getRoomData();
  const {id: userId} = playData.user;

  const removeOpponentWaitingPopup = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name !== "Popup_WaitingOpponent");
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }

  const goToMain = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name === "Main");
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }

  const sendDockMessage = (stackIndex: number, action: 'DOCK' | 'UNDOCK') => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.dock({
      userId,
      stackIndex: stackIndex,
      roomId: roomId,
      action,
    }));
  }

  const sendSuccessMessage = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.success({
      userId,
      roomId: roomId,
    }));
  }

  const sendReadyMessage = () => {
    if (!playData.user.id) return;
    socket.send(socketClientActions.alertReady({
      roomId: roomId,
      userId
    }));
  }

  const sendUpdateScoreMessage = (owner: "me" | "opponent", score: number) => {
    if (owner === "me" && playData.user.id) {
      socket.send(socketClientActions.updateScore({
        roomId,
        userId,
        score,
      }))
    }
  }
  
  const sendExpressEmotionMessage = (expression: SupportedExpression) => {
    socket.send(socketClientActions.expressEmotion({
      expression,
      roomId,
      userId,
    }))
  }


  const errorListener = socket.addListener("onError",
    (err: WebSocketErrorEvent) => {
      goToMain();
      socket.close();
    })

  const informOpponentHasLeftListener = socket.addListener("onInformOpponentHasLeft",
    () => {
      props.navigation.dispatch((state) => {
        removeOpponentWaitingPopup();
        const routes: typeof state.routes = state.routes
          .filter((route) => {
            const routesToStay = ["Main", "MultiGame"]
            if (routesToStay.indexOf(route.name) !== -1) {
              return true;
            } else {
              return false;
            }
          })
          .concat([{
            key: "Popup_GameResult" + Date.now(),
            name: "Popup_GameResult",
            params: {
              result: 'draw',
              opponentHasLeft: true,
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
      removeOpponentWaitingPopup();
      props.navigation.navigate("Popup_Prepare");
      containerRef.current?.setNativeProps({
        pointerEvents: "auto"
      })
    })

  const deleteRoomListener = socket.addListener("onDeleteRoom",
    () => {
      // props.navigation.dispatch((state) => {
      //   return CommonActions.reset({
      //     ...state,
      //     routes: [{
      //       name: "Main",
      //       key: "Main" + Date.now(),
      //     }],
      //     index: 0,
      //   })
      // })
    })

  const informWinnerListener = socket.addListener("onInformWinner",
    (winnerId: number) => {
      const hasWon = playData.user.id === winnerId;
      const gameResult = winnerId === -1
        ? 'draw'
        : hasWon ? 'win' : 'lose';
      props.navigation.dispatch((state) => {
        const routes: typeof state.routes = state.routes.concat([{
          key: "Popup_GameResult" + Date.now(),
          name: "Popup_GameResult",
          params: {
            result: gameResult,
          },
        }]);
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    })

  const syncTimerListener = socket.addListener("onSyncTimer",
    (leftTime: number) => {
      if (!gameStarted.current) {
        gameStarted.current = true;
      }
      const $TimerBase = gameSceneRef.current?.timerRef.current?.timerBaseRef.current;
      $TimerBase?.setTimeTo(leftTime);
    })

  const sendExpressionDataListenr = socket.addListener("onSendExpressionData", 
    (data: {userId: number, expression: string}) => {
      const {expression, userId} = data;
      if (userId === playData.user.id) {
        playerExpress(expression as SupportedExpression);
      } else {
        opponentExpress(expression as SupportedExpression);
      }
    })

  return {
    sendDockMessage,
    sendSuccessMessage,
    sendReadyMessage,
    sendUpdateScoreMessage,
    sendExpressEmotionMessage,
    errorListener,
    informOpponentHasLeftListener,
    alertDockListener,
    alertPrepareListener,
    deleteRoomListener,
    informWinnerListener,
    syncTimerListener,
    sendExpressionDataListenr,
  }
}

export default multiGameSocketLogic;