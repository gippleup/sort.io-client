import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Block from '../../components/Block';
import { RoundRectangleButton } from '../../components/EndGameInfo/_StyledComponents';
import PatternBackground from '../../components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans } from '../../components/Generic/StyledComponents';
import SlideSelector from '../../components/SlideSelector';
import CatogorySelector, { CategoryFilter } from './Shop/CatogorySelector';

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

const Background = (
  <PatternBackground
    source={backgroundImage}
    width={Dimensions.get('screen').width}
    height={Dimensions.get('screen').height}
    scale={0.5}
  />
)

const Shop = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>("skins");

  return (
    <View style={{flex: 1}}>
      {Background}
      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <CatogorySelector onChange={(category: CategoryFilter) => setCategoryFilter(category)} />
      </View>
    </View>
  )
}

export default Shop
