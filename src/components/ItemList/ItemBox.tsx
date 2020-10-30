import { NavigationProp, useNavigation } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react'
import { View } from 'react-native'
import TranslationPack from '../../Language/translation';
import { SupportedLanguage } from '../../redux/actions/global/types';
import { RootStackParamList } from '../../router/routes';
import { SupportedSkin } from '../Block/skinMap';
import { FlexHorizontal, NotoSans, Space } from '../Generic/StyledComponents';
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
  isInUse?: boolean;
}


const mainButtonText = {
  hasPurchased: "적용하기",
  hasApplied: "사용중",
  notPurchased: "구매하기"
}

const mainButtonColor = {
  hasPurchased: "lightseagreen",
  hasApplied: "crimson",
  notPurchased: "black"
}

type ItemBoxProps = Item & {
  lan: SupportedLanguage;
  navigation: NavigationProp<RootStackParamList>
}

class ItemBox extends React.PureComponent<ItemBoxProps> {
  constructor(props: Readonly<ItemBoxProps>) {
    super(props);
  }
  render() {
    const {
      category,
      currency,
      hasOwned,
      name,
      price,
      isInUse,
      lan,
      navigation,
    } = this.props;
    // const navigation = useNavigation();
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
        return <ScoreIcon skin={name as SupportedSkin} scale={1} type={hasOwned ? isInUse ? 2 : 8 : 49} />
      } else if (category === "expression") {
        return expressions[name as SupportedExpression](hasOwned);
      }
    }
  
    const ItemTag = () => (
      <FlexHorizontal>
        <Space width={10} />
        <NotoSans color="white" type="Black" size={15}>{title}</NotoSans>
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
        navigation.navigate(target as keyof RootStackParamList, param);
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
        isInUse,
      })
    }
  
    const buttonText = hasOwned
      ? isInUse
        ? mainButtonText.hasApplied
        : mainButtonText.hasPurchased
      : mainButtonText.notPurchased
  
    const buttonColor = hasOwned
      ? isInUse
        ? mainButtonColor.hasApplied
        : mainButtonColor.hasPurchased
      : mainButtonColor.notPurchased
    return (
      <ItemBoxContainer>
        <View>
          <ItemProfileContainer style={{backgroundColor: chroma(buttonColor).alpha(0.3).hex()}}>
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
            <PurchaseButton style={{ backgroundColor: buttonColor }} onPress={onPressPurchase}>
              <NotoSans color="white" size={18} type="Black">{buttonText}</NotoSans>
            </PurchaseButton>
          </View>
        </ItemDescriptionConatiner>
      </ItemBoxContainer>
    )
  }
}


export default ItemBox;
