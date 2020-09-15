import React from 'react'
import { View, Text } from 'react-native'
import { FullFlexCenter, RoundPaddingCenter, NotoSans, FlexHorizontal } from '../../../components/Generic/StyledComponents'
import { useNavigation, CommonActions, RouteProp } from '@react-navigation/native'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../router/routes'

type OpponentLeftPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_OpponentLeft">;
type OpponentLeftPopupRouteProps = RouteProp<RootStackParamList, "Popup_OpponentLeft">;

type OpponentLeftPopupProps = {
  navigation: OpponentLeftPopupNavigationProps;
  route: OpponentLeftPopupRouteProps;
}

const OpponentLeftPopup = (props: OpponentLeftPopupProps) => {
  const navigation = props.navigation;

  React.useEffect(() => {
    const unsubscribeBeforeRemoveEvent = navigation.addListener(
      "beforeRemove", (e: BeforeRemoveEvent) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
      }
    })
    return () => {
      unsubscribeBeforeRemoveEvent();
    }
  })

  return (
    <FullFlexCenter style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
      <RoundPaddingCenter
        style={{
          marginBottom: 10,
          borderWidth: 3,
          borderColor: 'black'
        }}
      >
        <NotoSans color="tomato" type="Black">아쿠, 상대방이 나갔습니다.</NotoSans>
      </RoundPaddingCenter>
    </FullFlexCenter>
  )
}

export default OpponentLeftPopup
