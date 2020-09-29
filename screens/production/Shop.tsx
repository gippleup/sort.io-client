import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import Block from '../../components/Block';
import { skins } from '../../components/Block/skinMap';
import { RoundRectangleButton } from '../../components/EndGameInfo/_StyledComponents';
import PatternBackground from '../../components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans, Space } from '../../components/Generic/StyledComponents';
import GradientBlindScrollView from '../../components/GradientBlindScrollView';
import { Currency, Item, ItemCategory } from '../../components/ItemBox';
import ItemList from '../../components/ItemList';
import NativeRefBox from '../../components/NativeRefBox';
import expressions from '../../components/Profile/Expressions';
import SlideSelector from '../../components/SlideSelector';
import CatogorySelector, { CategoryFilter } from './Shop/CatogorySelector';

const backgroundImage = require('../../assets/BackgroundPattern.png');

const Background = (
  <PatternBackground
    source={backgroundImage}
    width={Dimensions.get('screen').width}
    height={Dimensions.get('screen').height}
    scale={0.5}
  />
)


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
    title: "베이직 스킨",
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
  ...Object.keys(expressions).map((key) => {
    return {
      category: "expression" as ItemCategory,
      name: key,
      title: key,
      price: 300,
      currency: "gold" as Currency,
      hasOwned: false,
    }
  })
]


const Shop = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>("skin");
  console.log(categoryFilter);
  return (
    <View style={{flex: 1}}>
      {Background}
      <ItemList categoryFilter={categoryFilter} data={items} />
      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <CatogorySelector onChange={(category: CategoryFilter) => setCategoryFilter(category)} />
      </View>
    </View>
  )
}

export default Shop
