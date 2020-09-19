import React from 'react'
import { View, Text, Dimensions, ViewStyle, TextStyle } from 'react-native'
import StrokedText from '../../../components/StrokedText'
import { RoundPaddingCenter, NotoSans, FlexHorizontal, FullFlexCenter } from '../../../components/Generic/StyledComponents'
import chroma from 'chroma-js'
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../../components/RankViewer'
import usePlayData from '../../../hooks/usePlayData'
import { RoundRectangleButton } from '../../../components/EndGameInfo/_StyledComponents'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useNavigation, CommonActions } from '@react-navigation/native'
import routes, { RootStackParamList } from '../../../router/routes'
import { getMultiPlayRank, UserMultiRankData, RankData } from '../../../api/sortio'
import { convertToPlayCountText } from './GameResultPopup/util'
import { prettyPercent } from '../../../components/EndGameInfo/utils'
import NativeRefBox from '../../../components/NativeRefBox'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import socketClientActions, { exit, requestRematch, requestOtherMatch } from '../../../hooks/useMultiGameSocket/action/creator'
import {boardStyle, rankViewerHighlightStyle, textColor, titleStyle} from './GameResultPopup/_styles'

type GameResultNavigationProps = StackNavigationProp<RootStackParamList, "Popup_GameResult">
type GameResultRouteProps = RouteProp<RootStackParamList, "Popup_GameResult">

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
  const [data, setData] = React.useState<null | RankViewerData>(null);
  const [rawData, setRawData] = React.useState<null | RankData<UserMultiRankData>>()
  const titleRefBox = React.createRef<NativeRefBox>();
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const {result, opponentHasLeft} = props.route.params;
  const buttonFontSize = 20;
  const containerRef = React.createRef<View>();

  const rankViewerRef = React.createRef<RankViewer>();
  const userData = rawData?.targetUser;
  const playCountText = userData ? convertToPlayCountText({
    draw: userData.draw,
    lose: userData.lose,
    total: userData.total,
    win: userData.win,
  }) : '로딩중';

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
        key: "PD_Main" + Date.now(),
        name: "PD_Main",
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
            name: "PD_Main",
            key: "PD_Main" + Date.now(),
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

    if (playData.user.id && !rawData) {
      getMultiPlayRank(playData.user.id, 5)
      .then((rankData) => {
        if (!rankData) {
          return setData(rankData);
        }

        setRawData(rankData);

        const mapEntry = (entry: UserMultiRankData) => {
          const mapped: RankViewerDataEntry = {
            rank: Number(entry.rank),
            rate: Number(entry.rate),
            name: entry.name,
            id: entry.id,
            photo: entry.photo,
          }
          return mapped;
        };
        const beforeUser = rankData.beforeTargetUser.map(mapEntry);
        const afterUser = rankData.afterTargetUser.map(mapEntry);
        const user: RankViewerDataEntry = {
          ...mapEntry(rankData.targetUser),
          name: mapEntry(rankData.targetUser).name + ' (YOU)'
        };
        const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);
        setData(mappedData);
      })
      }

    if (rankViewerRef.current && data) {
      const $ = rankViewerRef.current
      let position = 1;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].id === playData.user.id) {
          position = i;
          break;
        }
      }
      $._blindScrollViewRef.current?.
      _scrollViewRef.current?.scrollTo({
        y: 56 * position,
        animated: true
      })
    }

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

  if (!data) {
    return (
      <FullFlexCenter>
        <RoundPaddingCenter>
          <NotoSans type="Black">데이터를 불러오고 있습니다</NotoSans>
        </RoundPaddingCenter>
      </FullFlexCenter>
    )
  }

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
        <View style={{ paddingHorizontal: 10 }}>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor[result]} type="Bold">
              대전 기록
            </NotoSans>
            <NotoSans color={textColor[result]} type="Bold">
              {playCountText}
            </NotoSans>
          </FlexHorizontal>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor[result]} size={30} type="Black">
              승률
            </NotoSans>
            <NotoSans color={textColor[result]} size={30} type="Black">
              {prettyPercent(Number(userData?.winningRate))}%
            </NotoSans>
          </FlexHorizontal>
        </View>
        <RankViewer
          ref={rankViewerRef}
          style={{
            width: Dimensions.get('screen').width - 80,
            maxHeight: 160, maxWidth: 300,
            marginVertical: 20,
            borderWidth: 1,
          }}
          data={data}
          blindColor={boardStyle[result].backgroundColor as string}
          entryStyle={(entry, i, isEnd) => {
            const defaultContainerStyle: ViewStyle = { backgroundColor: 'transparent' }
            if (entry.id === playData.user.id) {
              const { containerStyle, textStyle } = rankViewerHighlightStyle[result];
              return {
                containerStyle: containerStyle,
                textStyle: textStyle
              }
            }

            if (isEnd) {
              return {
                containerStyle: {
                  ...defaultContainerStyle,
                  borderBottomColor: 'transparent'
                },
                textStyle: {
                  color: textColor[result]
                }
              }
            }

            return {
              containerStyle: defaultContainerStyle,
              textStyle: {
                color: textColor[result]
              }
            }
          }}
        />
        <FlexHorizontal>
          <RoundRectangleButton onPress={onHomePressed} style={{marginRight: 10}} width={100}>
            <View>
              <NotoSans type="Bold" size={buttonFontSize}>홈</NotoSans>
            </View>
          </RoundRectangleButton>
          <View style={{flex: 1}}>
            <RoundRectangleButton onPress={onRematchPressed}>
              <View>
                <NotoSans type="Bold" size={buttonFontSize}>재대결</NotoSans>
              </View>
            </RoundRectangleButton>
          </View>
        </FlexHorizontal>
        <View style={{marginTop: 10}}>
          <RoundRectangleButton onPress={onAnotherMatchPressed}>
            <View>
              <NotoSans type="Bold" size={buttonFontSize}>한판 더 하기</NotoSans>
            </View>
          </RoundRectangleButton>
        </View>
      </RoundPaddingCenter>
      {renderOpponentLeftMessage()}
    </FullFlexCenter>
  )
}

export default GameResultPopup
