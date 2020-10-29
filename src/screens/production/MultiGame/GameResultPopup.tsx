import React from 'react'
import { View, StyleSheet } from 'react-native'
import StrokedText from '../../../components/StrokedText'
import { RoundPaddingCenter, NotoSans, FlexHorizontal, FullFlexCenter, Space } from '../../../components/Generic/StyledComponents'
import usePlayData from '../../../hooks/usePlayData'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useNavigation, CommonActions } from '@react-navigation/native'
import { RootStackParamList } from '../../../router/routes'
import NativeRefBox from '../../../components/NativeRefBox'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions, { requestRematch, requestOtherMatch } from '../../../hooks/useMultiGameSocket/action/creator'
import {boardStyle, titleStyle} from './GameResultPopup/_styles'
import { getSoundEffect } from '../../../assets/Sounds'
import MultiGameResult from '../../../components/MultiGameResult'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler'

type GameResultNavigationProps = StackNavigationProp<RootStackParamList, "Popup_GameResult">
type GameResultRouteProps = RouteProp<RootStackParamList, "Popup_GameResult">

const ButtonShape: typeof View = styled(View)`
  background-color: rgba(255,255,255,0.9);
  border-radius: 10px;
  min-width: 100px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-width: 1px;
`;

export type GameResultParams = {
  result: 'win' | 'lose' | 'draw';
  opponentHasLeft: boolean;
}

type GameResultPopupProps = {
  navigation: GameResultNavigationProps;
  route: GameResultRouteProps;
}

const GameResultPopup = (props: GameResultPopupProps) => {
  const playData = usePlayData();
  const navigation = useNavigation();
  const titleRefBox = React.createRef<NativeRefBox>();
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const {players} = socket.getRoomData();
  const player = players.filter((player) => player.id === playData.user.id)[0];
  const opponent = players.filter((player) => player.id !== playData.user.id)[0];
  const {result, opponentHasLeft} = props.route.params;
  const buttonFontSize = 20;
  const containerRef = React.createRef<View>();

  const resultStyle = {
    me: {
      container: result === "win" 
        ? styles.winnerResult
        : result === "lose"
          ? styles.loserResult
          : styles.drawResult,
      info: result === "win" 
      ? styles.winnerInfo
      : result === "lose"
        ? styles.loserInfo
        : styles.drawInfo,
      text: result === "win"
      ? "black"
      : result === "lose"
        ? "white"
        : "black",
      iconBackground: result === "win" 
      ? "gold"
      : result === "lose"
        ? "black"
        : "black",
      modifier: result === "win" 
      ? " - WINNER"
      : result === "lose"
        ? " - LOSER"
        : "",
    },
    opponent: {
      container: result === "win"
        ? styles.loserResult
        : result === "lose"
          ? styles.winnerResult
          : styles.drawResult,
      info: result === "win" 
      ? styles.loserInfo
      : result === "lose"
        ? styles.winnerInfo
        : styles.drawInfo,
      text: result === "win"
      ? "white"
      : result === "lose"
        ? "black"
        : "black",
      iconBackground:  result === "win" 
      ? "black"
      : result === "lose"
        ? "gold"
        : "black",
      modifier: result === "win" 
      ? " - LOSER"
      : result === "lose"
        ? " - WINNER"
        : "",
    },
  }

  const renderOpponentLeftMessage = () => {
    if (opponentHasLeft) {
      return (
        <RoundPaddingCenter
          style={{
            marginTop: 15,
            maxWidth: 300,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'tomato'
          }}
        >
          <NotoSans size={14} type="Bold" color="tomato">
            상대방이 나갔습니다.
          </NotoSans>
        </RoundPaddingCenter>
      )
    } else {
      return <></>;
    }
  }

  const goHome = () => {
    navigation.dispatch((state) => {
      const routes: typeof state.routes = [{
        key: "Main" + Date.now(),
        name: "Main",
      }];
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    })
  }

  const onHomePressed = () => {
    socket.close();
    // 소켓 연결 끊겼을 안 나간 사람을 승자로 처리.
    goHome();
  };
  const onRematchPressed = () => {
    if (!playData.user.id) return;
    socket.send(requestRematch({
      roomId,
      userId: playData.user.id,
    }));
    containerRef.current?.setNativeProps({
      pointerEvents: "none",
    })
  };

  const onAnotherMatchPressed = () => {
    if (!playData.user.id) return;
    socket.send(requestOtherMatch({
      roomId,
      userId: playData.user.id,
    }));
    // containerRef.current?.setNativeProps({
    //   pointerEvents: "none",
    // })
    navigation.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        routes: [
          {
            name: "Main",
            key: "Main" + Date.now(),
          },
          {
            name: "Popup_MultiWaiting",
            key: "Popup_MultiWaiting" + Date.now(),
          }
        ],
        index: 1,
      })
    })
  };
  
  React.useEffect(() => {
    if (result === "win") {
      getSoundEffect().win.play();
    } else {
      getSoundEffect().lose.play();
    }

    const removeStackLengthListener = props.navigation.addListener("state", (e) => {
      const { routes } = e.data.state;
      const lastRoute = routes[routes.length - 1];
      if (lastRoute.name === "Popup_GameResult") {
        containerRef.current?.setNativeProps({
          pointerEvents: "auto",
        })
      }
    })

    const closeListener = socket.addListener("onClose", () => {
      const userId = playData.user.id || -1;
      socket.send(socketClientActions.alertDisconnect({
        userId,
        roomId
      }))
    })

    const informOpponentHasLeftListener = socket.addListener(
      "onInformOpponentHasLeft", () => {
        navigation.dispatch((state) => {
          const routes: typeof state.routes = state.routes.concat([{
            key: "Popup_OpponentLeft" + Date.now(),
            name: "Popup_OpponentLeft",
          }]);

          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          })
        })
      }
    )
    
    const allowInformRematchRequestListener = socket.addListener(
      "onAllowInformRematchRequest", () => {
      navigation.dispatch((state) => {
        const routes: typeof state.routes = state.routes.concat([{
          key: "Popup_RematchWaiting" + Date.now(),
          name: "Popup_RematchWaiting",
          params: {
            beingInvited: false,
          }
        }]);
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    })

    const askRematchListener = socket.addListener(
      "onAskRematch", () => {
      navigation.dispatch((state) => {
        const routes: typeof state.routes = state.routes.concat([{
          key: "Popup_RematchWaiting" + Date.now(),
          name: "Popup_RematchWaiting",
          params: {
            beingInvited: true,
          }
        }]);
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    })

    titleRefBox.current?.setScale(3);
    titleRefBox.current?.animate({
      style: {
        scaleX: 1,
        scaleY: 1,
      },
      duration: 1000,
      easing: "easeOutElastic"
    }).start();

    const removeBeforeRemoveListener = navigation
      .addListener("beforeRemove", (e: BeforeRemoveEvent) => {
        if (e.data.action.type === "GO_BACK") {
          e.preventDefault();
        }
      })

    return () => {
      socket.removeListener(askRematchListener);
      socket.removeListener(allowInformRematchRequestListener);
      socket.removeListener(informOpponentHasLeftListener);
      socket.removeListener(closeListener);
      removeBeforeRemoveListener();
      removeStackLengthListener();
    }
  })

  return (
    <FullFlexCenter ref={containerRef}>
      <NativeRefBox ref={titleRefBox} style={{marginBottom: 10, elevation: 100}}>
        <StrokedText
          dyMultiplier={0.33}
          fillColor={titleStyle[result].fillColor}
          fontFamily="NotoSansKR-Black"
          fontSize={50}
          height={60}
          strokeColor={titleStyle[result].strokeColor}
          strokeWidth={10}
          text={titleStyle[result].text}
          width={200}
        />
      </NativeRefBox>
      <RoundPaddingCenter style={boardStyle[result]}>
        <MultiGameResult
          infoContainerStyle={resultStyle.me.info}
          style={resultStyle.me.container}
          userId={player.id}
          isMine
          color={resultStyle.me.text}
          iconBackground={resultStyle.me.iconBackground}
          modifier={`(YOU)${resultStyle.me.modifier}`}
        />
        <Space height={5}/>
        <MultiGameResult
          infoContainerStyle={resultStyle.opponent.info}
          style={resultStyle.opponent.container}
          userId={opponent.id}
          color={resultStyle.opponent.text}
          iconBackground={resultStyle.opponent.iconBackground}
          modifier={`(OPPONENT)${resultStyle.opponent.modifier}`}
        />
        <Space height={10}/>
        <FlexHorizontal>
          <TouchableOpacity onPress={onHomePressed}>
            <ButtonShape>
              <NotoSans type="Bold" size={buttonFontSize}>홈</NotoSans>
            </ButtonShape>
          </TouchableOpacity>
          <Space width={10}/>
          <View style={{flex:1}}>
            <TouchableOpacity style={{width: "100%"}} onPress={onRematchPressed}>
              <ButtonShape>
                <NotoSans type="Bold" size={buttonFontSize}>재대결</NotoSans>
              </ButtonShape>
            </TouchableOpacity>
          </View>
        </FlexHorizontal>
        <Space height={10} />
        <TouchableOpacity onPress={onAnotherMatchPressed}>
          <ButtonShape>
            <NotoSans type="Bold" size={buttonFontSize}>한판 더 하기</NotoSans>
          </ButtonShape>
        </TouchableOpacity>
      </RoundPaddingCenter>
      {renderOpponentLeftMessage()}
    </FullFlexCenter>
  )
}

const styles = StyleSheet.create({
  winnerResult: {
    backgroundColor: "white",
  },
  winnerInfo: {
    backgroundColor: "lemonchiffon",
  },
  loserResult: {
    backgroundColor: "darkred",
  },
  loserInfo: {
    backgroundColor: "grey"
  },
  drawResult: {
    backgroundColor: "white",
  },
  drawInfo: {
    backgroundColor: "lightgrey",
  }
})

export default GameResultPopup
