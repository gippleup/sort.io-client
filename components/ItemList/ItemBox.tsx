import { useNavigation } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGlobal from '../../hooks/useGlobal';
import TranslationPack from '../../Language/translation';
import { skins } from '../Block/skinMap';
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '../Generic/StyledComponents';
import MoneyIcon from '../Main/MoneyIcon';
import expressions, { SupportedExpression } from '../Profile/Expressions';
import ScoreIcon from '../ScoreChecker/ScoreIcon';
import { ItemBoxContainer, ItemDescriptionBubble, ItemDescriptionConatiner, ItemProfileContainer, PreviewButton, PriceTagContainer, PurchaseButton } from './ItemBox/_StyledComponent';

export type Currency = "gold" | "cube";
export type ItemCategory = "skin" | "expression" | "etc";

export type Item = {
  category: ItemCategory;
  name: skins | SupportedExpression;
  title: string;
  price: number;
  currency: Currency;
  hasOwned: boolean;
}

const ItemBox: React.FC<Item> = (props) => {
  const {
    category,
    currency,
    hasOwned,
    name,
    price,
    title,
  } = props;
  const global = useGlobal();
  const {language: lan} = global;
  const navigation = useNavigation();

  const ItemDescription = () => {
    let text;
    if (category === "skin") {
      text = TranslationPack[lan].skin[name as skins].description
    } else if (category === "expression") {
      text = TranslationPack[lan].expression[name as SupportedExpression].description
    } else {
      text = '';
    }
    return (
      <NotoSans size={10} type="Regular">
        {text || '여기 상품 설명 채워야 됨'}
      </NotoSans>
    )
  }

  const renderProductProfile = () => {
    if (category === "skin") {
      return <ScoreIcon skin={name as skins} scale={1} type={49} />
    } else if (category === "expression") {
      return expressions[name as SupportedExpression]
    }
  }

  const PriceTag = () => (
    <PriceTagContainer>
      <MoneyIcon size={8} />
      <Space width={5} />
      <NotoSans color="white" type="Black" size={12}>{price}</NotoSans>
    </PriceTagContainer>
  )

  const ItemTag = () => (
    <FlexHorizontal>
      <Space width={10} />
      <NotoSans color="white" type="Black" size={20}>{title}</NotoSans>
      <Space width={10} />
      <PriceTag />
    </FlexHorizontal>
  )

  const onPressPreview = () => {
    if (category === "skin") {
      navigation.navigate("Popup_SkinPreview", {
        skin: name
      })
    }
  };

  return (
    <ItemBoxContainer>
      <View>
        <ItemProfileContainer>
          {renderProductProfile()}
        </ItemProfileContainer>
        <Space height={10} />
        <PreviewButton onPress={onPressPreview}>
          <NotoSans color="white" size={13} type="Regular">미리보기</NotoSans>
        </PreviewButton>
      </View>
      <Space width={20} />
      <ItemDescriptionConatiner>
        <ItemTag />
        <View style={{flex: 1, margin: 5}}>
          <ItemDescriptionBubble>
            <ItemDescription/>
          </ItemDescriptionBubble>
        </View>
        <View style={{width: '100%', paddingBottom: 5}}>
          <PurchaseButton>
            <NotoSans color="white" size={18} type="Black">구매하기</NotoSans>
          </PurchaseButton>
        </View>
      </ItemDescriptionConatiner>
    </ItemBoxContainer>
  )
}

export default React.memo(ItemBox);
