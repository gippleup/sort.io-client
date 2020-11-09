import { CommonActions, NavigationProp } from "@react-navigation/native";
import { MutableRefObject, RefObject } from "react";
import { View } from "react-native";
import { modifyToTargetRoutes, remainTargetRoutes } from "../../../../api/navigation";
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

  // const closeListner = socket.addListener("onClose",
  //   () => {
  //   }
  // )

  const errorListener = socket.addListener("onError",
    (err: WebSocketErrorEvent) => {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main"},
        {name: "Popup_BadConnection"}
      ]);
      socket.close();
    })

  const informOpponentHasLeftListener = socket.addListener("onInformOpponentHasLeft",
    (passedGoodTime: boolean) => {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "MultiGame"},
        {name: "Popup_GameResult", params: {
          result: passedGoodTime ? "win" : "draw",
          opponentHasLeft: true,
        }}
      ])
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
      containerRef.current?.setNativeProps({
        pointerEvents: "auto"
      })
    })

  const deleteRoomListener = socket.addListener("onDeleteRoom",
    () => {
      remainTargetRoutes(navigation, ["Main"]);
    })

  const informWinnerListener = socket.addListener("onInformWinner",
    (winnerId: number) => {
      const hasWon = playData.user.id === winnerId;
      const gameResult = winnerId === -1
        ? 'draw'
        : hasWon ? 'win' : 'lose';
      modifyToTargetRoutes(navigation, [
        {name: "Main"},
        {name: "MultiGame"},
        {name: "Popup_GameResult", params: {result: gameResult}},
      ]);
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