import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import GameScene from "../../../../components/GameScene";
import Profile from "../../../../components/Profile";
import expressions, { SupportedExpression } from "../../../../components/Profile/Expressions";
import useMultiGameSocket from "../../../../hooks/useMultiGameSocket";
import socketClientActions from "../../../../hooks/useMultiGameSocket/action/creator";
import { AlertDockConstructor } from "../../../../hooks/useMultiGameSocket/ServerMessages";
import usePlayData from "../../../../hooks/usePlayData";
import { BeforeRemoveEvent } from "../../GameScreen/utils";
import { MultiGameProps } from "../../MutiGame";
import multiGameNavigationLogic from "./_navigationLogic";
import multiGameProfileLogic from "./_profileLogic";
import multiGameSocketLogic from "./_socketLogic";

export const MultiGameLogic = (props: MultiGameProps) => {
  const { map, mapDesc } = props.route.params;
  const socket = useMultiGameSocket();
  const playData = usePlayData();
  const navigation = useNavigation();
  const gameSceneRef = React.useRef<GameScene>(null);
  const containerRef = React.useRef<View>(null);
  const playerProfileRef = React.useRef<Profile>(null);
  const opponentProfileRef = React.useRef<Profile>(null);
  const gameStarted = React.useRef<boolean>(false);

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
    syncTimerListener,
  } = multiGameSocketLogic({
    containerRef,
    gameSceneRef,
    playData,
    props,
    socket,
    gameStarted,
  })

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
    blockGoBack,
  } = multiGameNavigationLogic({
    gameStarted,
    navigation,
    socket,
  })

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
  }
}
