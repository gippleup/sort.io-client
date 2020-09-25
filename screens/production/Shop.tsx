import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Block from '../../components/Block';
import PatternBackground from '../../components/GameScene/PatternBackground';

const backgroundImage = require('../../assets/BackgroundPattern.png');

type Currency = "gold" | "cube";
type ItemCategory = "skin" | "expression";

type Item = {
  category: ItemCategory;
  name: string;
  title: string;
  price: number;
  currency: Currency;
  hasOwned: boolean;
  productImg?: JSX.Element;
}

const items: Item[] = [
  {
    category: "skin",
    name: "spiky",
    title: "스파이키 스킨",
    price: 1300,
    currency: "gold",
    hasOwned: false,
  },
  {
    category: "skin",
    name: "basic",
    title: "스파이키 스킨",
    price: 1300,
    currency: "gold",
    hasOwned: false,
  },
  {
    category: "skin",
    name: "spiky",
    title: "스파이키 스킨",
    price: 1300,
    currency: "gold",
    hasOwned: false,
  },

]

const Shop = () => {
  return (
    <View>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
    </View>
  )
}

export default Shop
