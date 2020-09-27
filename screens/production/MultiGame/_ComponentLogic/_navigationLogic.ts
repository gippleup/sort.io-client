import { useNavigation } from "@react-navigation/native";
import { RefObject } from "react";
import useMultiGameSocket from "../../../../hooks/useMultiGameSocket";
import { BeforeRemoveEvent } from "../../GameScreen/utils";

type MultiGameNavigationLogicParams = {
  gameStarted: RefObject<boolean>;
  navigation: ReturnType<typeof useNavigation>;
  socket: ReturnType<typeof useMultiGameSocket>;
}

const multiGameNavigationLogic = (params: MultiGameNavigationLogicParams) => {
  const {gameStarted, navigation, socket} = params;
  const {roomId} = socket.getRoomData();
  const blockGoBack = (e: BeforeRemoveEvent) => {
    const { payload, type } = e.data.action;
    if (type === "GO_BACK") {
      e.preventDefault();
      if (gameStarted.current) {
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
  }


  return {
    blockGoBack,
  }
}

export default multiGameNavigationLogic;