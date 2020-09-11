import React, { RefObject } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../router/routes'
import { RouteProp } from '@react-navigation/native'
import { RoundPaddingCenter, NotoSans, FullFlexCenter, FlexHorizontal } from '../../../components/Generic/StyledComponents'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import useMultiGameSocket from '../../../hooks/useMultiGameSocket'
import { cancelRequestRematch } from '../../../hooks/useMultiGameSocket/action/creator'
import usePlayData from '../../../hooks/usePlayData'
import Logger from '../../../components/Logger'
import RematchStatusAnimation from './RematchWaitingPopup/RematchStatusAnimation'
import RematchLogger, { RematchMessage } from './RematchWaitingPopup/RematchLogger'
import RematchStatusPlayerAnimation from './RematchWaitingPopup/RematchStatusAnimation/RematchStatusPlayerAnimation'

type RematchWaitingPopupRouteProps = RouteProp<RootStackParamList, "Popup_RematchWaiting">

type RematchWaitingPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_RematchWaiting">

export type RematchWaitingPopupParams = undefined;

type RematchWaitingPopupProps = {
  navigation: RematchWaitingPopupNavigationProps;
  route: RematchWaitingPopupRouteProps;
}

const RematchWaitingPopup = (props: RematchWaitingPopupProps) => {
  const socket = useMultiGameSocket();
  const roomId = socket.getRoomId();
  const playData = usePlayData();
  const userId = playData.user.id;
  const animationRef = React.createRef<RematchStatusAnimation>();
  const loggerRef = React.createRef<Logger>();

  const addMessage = (message: RematchMessage) => {
    loggerRef.current?.addMessage(message)
  }

  const setUserAnim = () => {
    const playerRef = animationRef.current?.playerRef;
    const opponentRef = animationRef.current?.opponentRef;

    const extractUsefulMethods = (ref?: RefObject<RematchStatusPlayerAnimation>) => {
      const fallback = () => {};
      return {
        askRematch: ref?.current?.askRematch || fallback,
        disagreeRematch: ref?.current?.disagreeRematch || fallback,
        agreeRematch: ref?.current?.agreeRematch || fallback,
        think: ref?.current?.think || fallback,
        popCommentBox: ref?.current?.popCommentBox || fallback,
        popMessage: ref?.current?.popMessage || fallback,
      }
    }

    return {
      player: extractUsefulMethods(playerRef),
      opponent: extractUsefulMethods(opponentRef),
    }
  }

  React.useEffect(() => {
    props.navigation.addListener("beforeRemove", (e: BeforeRemoveEvent) => {
      if (e.data.action.type === "GO_BACK") {
        if (!userId) return;
        socket.send(cancelRequestRematch({
          roomId,
          userId,
        }))
      }
    })

    setUserAnim().player?.agreeRematch();
    setUserAnim().player?.popCommentBox();
    setUserAnim().opponent?.disagreeRematch();

    addMessage({
      ownerId: 324,
      text: `${playData.user.name}은(는) 재대결을 요청했다!`
    })
  })

  return (
    <FullFlexCenter>
      <RoundPaddingCenter>
        <RematchStatusAnimation ref={animationRef} />
        <RematchLogger ref={loggerRef} />
      </RoundPaddingCenter>
    </FullFlexCenter>
  )
}

export default RematchWaitingPopup
