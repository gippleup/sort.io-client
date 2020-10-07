import { useNavigation } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGlobal from '../../hooks/useGlobal';
import usePlayData from '../../hooks/usePlayData';
import TranslationPack from '../../Language/translation';
import { SupportedSkin } from '../Block/skinMap';
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '../Generic/StyledComponents';
import MoneyIcon from '../Main/MoneyIcon';
import expressions, { SupportedExpression } from '../Profile/Expressions';
import ScoreIcon from '../ScoreChecker/ScoreIcon';
import { ItemBoxContainer, ItemDescriptionBubble, ItemDescriptionConatiner, ItemProfileContainer, PreviewButton, PriceTagContainer, PurchaseButton } from './ItemBox/_StyledComponent';
import PriceTag from './PriceTag';

export type Currency = "gold" | "cube";
export type ItemCategory = "skin" | "expression" | "etc";

export type Item = {
  category: ItemCategory;
  name: SupportedSkin | SupportedExpression;
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
  } = props;
  const global = useGlobal();
  const {language: lan} = global;
  const navigation = useNavigation();
  let title = '';
  let description = '';

  if (category === "skin") {
    title = TranslationPack[lan].skin[name as SupportedSkin].title;
    description = TranslationPack[lan].skin[name as SupportedSkin].description;
  } else if (category === "expression") {
    title = TranslationPack[lan].expression[name as SupportedExpression].title;
    description = TranslationPack[lan].expression[name as SupportedExpression].description;
  }

  const ItemDescription = () => {
    return (
      <NotoSans size={10} type="Regular">
        {description || '여기 상품 설명 채워야 됨'}
      </NotoSans>
    )
  }

  const renderProductProfile = () => {
    if (category === "skin") {
      return <ScoreIcon skin={name as SupportedSkin} scale={1} type={49} />
    } else if (category === "expression") {
      return expressions[name as SupportedExpression]
    }
  }

  const ItemTag = () => (
    <FlexHorizontal>
      <Space width={10} />
      <NotoSans color="white" type="Black" size={20}>{title}</NotoSans>
      <Space width={10} />
      <PriceTag value={price} />
    </FlexHorizontal>
  )

  const onPressPreview = () => {
    const navigationOption = {
      skin: {
        target: "Popup_SkinPreview",
        param: {
          skin: name,
        }
      },
      expression: {
        target: "Popup_ExpressionPreview",
        param: {
          expression: name,
        }
      }
    }

    if (category === "skin" || category === "expression") {
      const { target, param } = navigationOption[category];
      navigation.navigate(target, param);
    }
  };

  const onPressPurchase = () => {
    navigation.navigate("Popup_ItemPurchase", {
      category: category,
      item: name,
      title,
      description,
      hasOwned,
      price,
    })
  }

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
          <PurchaseButton onPress={onPressPurchase}>
            <NotoSans color="white" size={18} type="Black">구매하기</NotoSans>
          </PurchaseButton>
        </View>
      </ItemDescriptionConatiner>
    </ItemBoxContainer>
  )
}

export default React.memo(ItemBox);
