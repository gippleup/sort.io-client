import React from 'react'
import { View, Text } from 'react-native'
import { NotoSans } from './Generic/StyledComponents';
import expressions, { SupportedExpression } from './Profile/Expressions';

export type Currency = "gold" | "cube";
export type ItemCategory = "skin" | "expression" | "etc";

export type Item = {
  category: ItemCategory;
  name: string;
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

  const renderProductProfile = () => {
    if (category === "skin") {

    } else if (category === "expression") {
      return expressions[name as SupportedExpression]
    }
  }

  return (
    <View>
      {renderProductProfile()}
      <NotoSans type="Black">{title}</NotoSans>
    </View>
  )
}

export default ItemBox
