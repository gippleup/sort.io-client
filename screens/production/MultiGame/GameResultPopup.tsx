import React from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
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
import { exit, requestRematch, requestOtherMatch } from '../../../hooks/useMultiGameSocket/action/creator'

type GameResultNavigationProps = StackNavigationProp<RootStackParamList, "Popup_GameResult">
type GameResultRouteProps = RouteProp<RootStackParamList, "Popup_GameResult">

export type GameResultParams = {
  hasWon: boolean;
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
  const {hasWon} = props.route.params;
  const buttonFontSize = 20;
  const titleStyle = hasWon ?
    {
      fillColor: "dodgerblue",
      strokeColor: 'white',
      text: "WIN",
    } : 
    {
      fillColor: "red",
      strokeColor: 'black',
      text: "LOSE",
    }

  const boardStyle: ViewStyle = hasWon ? 
    {
      backgroundColor: 'royalblue',
      borderWidth: 3,
      borderColor: 'white',
    } :
    {
      backgroundColor: 'tomato',
      borderWidth: 3,
      borderColor: 'black',
    }

  const textColor = hasWon ? 'white' : 'black'

  const rankViewerRef = React.createRef<RankViewer>();
  const userData = rawData?.targetUser;
  const playCountText = userData ? convertToPlayCountText({
    draw: userData.draw,
    lose: userData.lose,
    total: userData.total,
    win: userData.win,
  }) : '로딩중';

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
  };
  const onAnotherMatchPressed = () => {
    if (!playData.user.id) return;
    socket.send(requestOtherMatch({
      roomId,
      userId: playData.user.id,
    }));
  };
  
  React.useEffect(() => {
    const askRematchListener = socket.addListener("onAskRematch", () => {
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
            username: entry.name,
            userId: entry.userId,
          }
          return mapped;
        };
        const beforeUser = rankData.beforeTargetUser.map(mapEntry);
        const afterUser = rankData.afterTargetUser.map(mapEntry);
        const user: RankViewerDataEntry = {
          ...mapEntry(rankData.targetUser),
          username: mapEntry(rankData.targetUser).username + ' (YOU)'
        };
        const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);
        setData(mappedData);
      })
      }

    if (rankViewerRef.current && data) {
      const $ = rankViewerRef.current
      let position = 1;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].userId === playData.user.id) {
          position = i;
          break;
        }
      }
      $._scrollViewRef.current?.scrollTo({
        y: 26 * position - 20,
        animated: true
      });
    }

    const removeBeforeRemoveListener = navigation
      .addListener("beforeRemove", (e: BeforeRemoveEvent) => {
        if (e.data.action.type === "GO_BACK") {
          e.preventDefault();
        }
      })

    return () => {
      socket.removeListener(askRematchListener);
      removeBeforeRemoveListener();
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
    <FullFlexCenter>
      <NativeRefBox ref={titleRefBox} style={{marginBottom: 10, elevation: 100}}>
        <StrokedText
          dyMultiplier={0.33}
          fillColor={titleStyle.fillColor}
          fontFamily="NotoSansKR-Black"
          fontSize={50}
          height={60}
          strokeColor={titleStyle.strokeColor}
          strokeWidth={10}
          text={titleStyle.text}
          width={150}
        />
      </NativeRefBox>
      <RoundPaddingCenter style={boardStyle}>
        <View style={{ paddingHorizontal: 10 }}>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor} type="Bold">
              대전 기록
            </NotoSans>
            <NotoSans color={textColor} type="Bold">
              {playCountText}
            </NotoSans>
          </FlexHorizontal>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor} size={30} type="Black">
              승률
            </NotoSans>
            <NotoSans color={textColor} size={30} type="Black">
              {prettyPercent(Number(userData?.winningRate))}%
            </NotoSans>
          </FlexHorizontal>
        </View>
        <RankViewer
          ref={rankViewerRef}
          style={{
            width: Dimensions.get('screen').width - 80,
            maxHeight: 200, maxWidth: 300,
            marginVertical: 20,
            borderWidth: 1,
          }}
          blindColor={boardStyle.backgroundColor as string}
          entryStyle={(entry, i, isEnd) => {
            const defaultContainerStyle: ViewStyle = { backgroundColor: 'transparent' }
            if (entry.userId === playData.user.id) {
              return {
                containerStyle: {
                  backgroundColor: hasWon ? 'white' : 'black',
                },
                textStyle: {
                  color: hasWon ? 'black' : 'white',
                  fontWeight: 'bold',
                }
              }
            }

            if (isEnd) {
              return {
                containerStyle: {
                  ...defaultContainerStyle,
                  borderBottomColor: 'transparent'
                },
                textStyle: {
                  color: textColor
                }
              }
            }

            return {
              containerStyle: defaultContainerStyle,
              textStyle: {
                color: textColor
              }
            }
          }}
          data={data}
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
    </FullFlexCenter>
  )
}

export default GameResultPopup
