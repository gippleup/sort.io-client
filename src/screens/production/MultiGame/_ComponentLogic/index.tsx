import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { getExpressionSoundEffect } from "../../../../assets/sounds/expressionSound";
import { getSkinSoundEffect } from "../../../../assets/sounds/skinSound";
import GameScene from "../../../../components/GameScene";
import Profile from "../../../../components/Profile";
import useMultiGameSocket from "../../../../hooks/useMultiGameSocket";
import { ExpressionDirection } from "../../../../redux/actions/global/creator";
import { RootState } from "../../../../redux/reducers";
import { MultiGameProps } from "../../MutiGame";
import multiGameNavigationLogic from "./_navigationLogic";
import multiGameProfileLogic from "./_profileLogic";
import multiGameSocketLogic from "./_socketLogic";

export const MultiGameLogic = (props: MultiGameProps) => {
  const { map, mapDesc } = props.route.params;
  const socket = useMultiGameSocket();
  const {global, items, playData} = useSelector((state: RootState) => state);
  const navigation = props.navigation;
  const gameSceneRef = React.useRef<GameScene>(null);
  const containerRef = React.useRef<View>(null);
  const playerProfileRef = React.useRef<Profile>(null);
  const opponentProfileRef = React.useRef<Profile>(null);
  const gameStarted = React.useRef<boolean>(false);

  const {
    opponentExpress,
    opponentProfile,
    playerExpress,
    playerProfile
  } = multiGameProfileLogic({
    opponentProfileRef,
    playData,
    playerProfileRef,
    socket,
  })

  const {
    alertDockListener,
    alertPrepareListener,
    deleteRoomListener,
    errorListener,
    informOpponentHasLeftListener,
    informWinnerListener,
    sendDockMessage,
    sendReadyMessage,
    sendSuccessMessage,
    sendUpdateScoreMessage,
    sendExpressEmotionMessage,
    syncTimerListener,
    sendExpressionDataListenr,
  } = multiGameSocketLogic({
    containerRef,
    gameSceneRef,
    playData,
    props,
    socket,
    gameStarted,
    opponentExpress,
    playerExpress,
    navigation,
  })

  const {
    blockGoBack,
  } = multiGameNavigationLogic({
    gameStarted,
    navigation,
    socket,
  })

  const onPressExpression = (direction: ExpressionDirection) => {
    const expression = global.expressions[direction];
    if (!expression) return;
    const sound = getExpressionSoundEffect(expression);
    sound.stop();
    sound.setCurrentTime(0);
    sound.play();
    sendExpressEmotionMessage(expression);
  }

  const onReady = () => {
    sendReadyMessage();
  }

  const onDock = (stackIndex: number) => {
    if (!playData.user.id) return;
    sendDockMessage(stackIndex, 'DOCK');
  }

  const onUndock = (stackIndex: number) => {
    sendDockMessage(stackIndex, 'UNDOCK');
  }

  const onScoreChange = (owner: "me" | "opponent", score: number) => {
    sendUpdateScoreMessage(owner, score);
  }

  const onComplete = (winner: "me" | "opponent") => {
    if (winner === 'me') {
      sendSuccessMessage();
    }
  }

  const useEffectCallback = () => {
    const $TimerBase = gameSceneRef.current?.timerRef.current?.timerBaseRef.current;
    $TimerBase?.setTimeTo(120);

    navigation.navigate("Popup_WaitingOpponent");

    navigation.addListener("beforeRemove", blockGoBack);
    return () => {
      navigation.removeListener("beforeRemove", blockGoBack);
      // socket.removeListener(errorListener);
      // socket.removeListener(alertDockListener);
      // socket.removeListener(deleteRoomListener);
      // socket.removeListener(informOpponentHasLeftListener);
      // socket.removeListener(syncTimerListener);
      // socket.removeListener(alertPrepareListener);
      // socket.removeListener(informWinnerListener);
      // socket.removeListener(sendExpressionDataListenr);
    }
  }

  return {
    containerRef,
    gameSceneRef,
    map,
    mapDesc,
    onReady,
    onComplete,
    onDock,
    onUndock,
    onScoreChange,
    opponentProfile,
    playerProfile,
    useEffectCallback,
    socket,
    onPressExpression,
    global,
  }
}
