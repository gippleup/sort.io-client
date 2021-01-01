import { useNavigation } from "@react-navigation/native";
import { RefObject } from "react";
import useGlobal from "@hooks/useGlobal";
import useMultiGameSocket from "@hooks/useMultiGameSocket";
import TranslationPack from "@Language/translation";
import { BeforeRemoveEvent } from "@screens/production/GameScreen/utils";

type MultiGameNavigationLogicParams = {
  gameStarted: RefObject<boolean>;
  navigation: ReturnType<typeof useNavigation>;
  socket: ReturnType<typeof useMultiGameSocket>;
}

const multiGameNavigationLogic = (params: MultiGameNavigationLogicParams) => {
  const {gameStarted, navigation, socket} = params;
  const {roomId} = socket.getRoomData();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;
  const blockGoBack = (e: BeforeRemoveEvent) => {
    const { payload, type } = e.data.action;
    if (type === "GO_BACK") {
      e.preventDefault();
      if (gameStarted.current) {
        setTimeout(() => {
          navigation.navigate('Popup_CancelGame', {
            title: translation.withdrawal,
            text: translation.withdrawalDesc,
            mode: "multi",
            roomId,
          });
        })
      }
    }
  }


  return {
    blockGoBack,
  }
}

export default multiGameNavigationLogic;