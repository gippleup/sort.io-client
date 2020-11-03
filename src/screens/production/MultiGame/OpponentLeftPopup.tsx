import React from 'react'
import { View, Text } from 'react-native'
import { FullFlexCenter, RoundPaddingCenter, NotoSans, FlexHorizontal } from '../../../components/Generic/StyledComponents'
import { useNavigation, CommonActions, RouteProp, NavigationProp } from '@react-navigation/native'
import { BeforeRemoveEvent } from '../GameScreen/utils'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../router/routes'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'
import { removeTargetRoute } from '../../../api/navigation'

type OpponentLeftPopupNavigationProps = StackNavigationProp<RootStackParamList, "Popup_OpponentLeft">;
type OpponentLeftPopupRouteProps = RouteProp<RootStackParamList, "Popup_OpponentLeft">;

type OpponentLeftPopupProps = {
  navigation: OpponentLeftPopupNavigationProps;
  route: OpponentLeftPopupRouteProps;
}

const OpponentLeftPopup = (props: OpponentLeftPopupProps) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;

  React.useEffect(() => {
    const unsubscribeBeforeRemoveEvent = navigation.addListener(
      "beforeRemove", (e: BeforeRemoveEvent) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
      }
    })

    setTimeout(() => removeTargetRoute(navigation, "Popup_OpponentLeft"), 2000);

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
        <NotoSans color="tomato" type="Black">{translation.opponentLeft}</NotoSans>
      </RoundPaddingCenter>
    </FullFlexCenter>
  )
}

export default OpponentLeftPopup
