import { useNavigation } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGlobal from '../../hooks/useGlobal';
import TranslationPack from '../../Language/translation';
import { SupportedSkin } from '../Block/skinMap';
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '../Generic/StyledComponents';
import MoneyIcon from '../Main/MoneyIcon';
import expressions, { SupportedExpression } from '../Profile/Expressions';
import ScoreIcon from '../ScoreChecker/ScoreIcon';
import { ItemBoxContainer, ItemDescriptionBubble, ItemDescriptionConatiner, ItemProfileContainer, PreviewButton, PriceTagContainer, PurchaseButton } from './ItemBox/_StyledComponent';

const ItemBox: React.FC<{}> = () => {
  const renderProductProfile = () => (
    <View
      style={{
        width: 60,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20
      }}
    />
  )

  const PriceTag = () => (
    <View style={{width: 40, height: 24, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20}}/>
  )

  const ItemTag = () => (
    <FlexHorizontal>
      <Space width={10} />
      <View style={{width: 80, height: 30, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20}} />
      <Space width={10} />
      <PriceTag />
    </FlexHorizontal>
  )

  return (
    <ItemBoxContainer>
      <View>
        <ItemProfileContainer>
          {renderProductProfile()}
        </ItemProfileContainer>
        <Space height={10} />
        <PreviewButton>
          <View
            style={{
              height: 20,
              width: 50,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 20
            }}
          />
        </PreviewButton>
      </View>
      <Space width={20} />
      <ItemDescriptionConatiner>
        <ItemTag />
        <View style={{margin: 5, width: '100%', flex: 1}}>
          <ItemDescriptionBubble style={{height: 40, width: '80%'}}/>
        </View>
        <View style={{width: '100%', paddingBottom: 5}}>
          <PurchaseButton>
            <View
              style={{
                height: 30,
                width: 80,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20
              }}
            />
          </PurchaseButton>
        </View>
      </ItemDescriptionConatiner>
    </ItemBoxContainer>
  )
}

export default React.memo(ItemBox);
