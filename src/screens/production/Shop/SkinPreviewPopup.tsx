import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import generateMap from '../../../algo/generateMap'
import { SupportedSkin } from '../../../components/Block/skinMap'
import { BlockTypes } from '../../../components/Block/Types'
import PatternBackground from '../../../components/GameScene/PatternBackground'
import { NotoSans, RoundPaddingCenter, Space } from '../../../components/Generic/StyledComponents'
import RefBlockBoard from '../../../components/NativeRefBlockBoard'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'
import { RootStackParamList } from '../../../router/routes'


const MyBoard: typeof RefBlockBoard = styled(RefBlockBoard)`
  background-color: royalblue;
  width: ${Dimensions.get('window').width - 100}px;
  max-width: 260px;
  height: 180px;
  border-width: 2px;
  border-color: white;
  border-radius: 20px;
  /* transform: scale(0.5) translateX(-85px) translateY(-100px); */
`;


export type SkinPreviewPopupParams = {
  skin: SupportedSkin;
}

type SkinPreviewPopupProps = {
  navigation: StackNavigationProp<RootStackParamList, "Popup_SkinPreview">;
  route: RouteProp<RootStackParamList, "Popup_SkinPreview">;
}

const defaultParam: SkinPreviewPopupParams = {
  skin: "basic",
}

const SkinPreviewPopup = (props: SkinPreviewPopupProps) => {
  const { params = defaultParam } = props.route;
  const { skin } = params;
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.Shop;
  const navigation = useNavigation();
  const onPressClose = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name !== "Popup_SkinPreview")
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
      />
      <MyBoard
        onComplete={undefined}
        skin={skin}
        scale={0.5}
        initialMap={generateMap({
          blockStackCount: 5,
          colorCount: 4,
          maxScore: 4,
          stackLengthMax: 8,
          stackLengthMin: 5,
          shuffleCount: 100,
        }).question}
      />
      <Space height={10} />
      <TouchableOpacity onPress={onPressClose}>
        <RoundPaddingCenter>
          <NotoSans size={20} type="Black">
            {translation.goBack}
          </NotoSans>
        </RoundPaddingCenter>
      </TouchableOpacity>
    </View>
  )
}

export default SkinPreviewPopup
