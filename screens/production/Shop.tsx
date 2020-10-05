import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '../../api/icon';
import skinMap, { skins } from '../../components/Block/skinMap';
import PatternBackground from '../../components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans, Space } from '../../components/Generic/StyledComponents';
import { Currency, Item, ItemCategory } from '../../components/ItemList/ItemBox';
import ItemList from '../../components/ItemList';
import MoneyIndicator from '../../components/Main/MoneyIndicator';
import expressions, { SupportedExpression } from '../../components/Profile/Expressions';
import useGlobal from '../../hooks/useGlobal';
import usePlayData from '../../hooks/usePlayData';
import translation from '../../Language/translation';
import CatogorySelector, { CategoryFilter } from './Shop/CatogorySelector';

const items: Item[] = [
  ...Object.keys(skinMap).map((key) => {
    return {
      category: "skin" as ItemCategory,
      name: key as skins,
      title: translation.ko.skin[key as skins].title,
      price: 1300,
      currency: "gold" as Currency,
      hasOwned: false,
    }
  }),
  ...Object.keys(expressions).map((key) => {
    return {
      category: "expression" as ItemCategory,
      name: key as SupportedExpression,
      title: key,
      price: 300,
      currency: "gold" as Currency,
      hasOwned: false,
    }
  })
]


const Shop = () => {
  const playdata = usePlayData();
  const global = useGlobal();
  const {language: lan} = global;
  const navigation = useNavigation();
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>("skin");
  return (
    <View
      style={{
        flex: 1
      }}>
      <View
        style={{
          height: Dimensions.get('screen').height - 150,
          width: '100%',
        }}
      >
        <PatternBackground source={require('../../assets/BackgroundPattern.png')} />
        <View
          style={{
            backgroundColor: 'dodgerblue',
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
          }}
        >
          <FlexHorizontal>
            <TouchableOpacity onPress={navigation.goBack}>
              {getIcon("fontAwesome", "arrow-left", {color: "white", size: 30})}
            </TouchableOpacity>
            <Space width={10} />
            <NotoSans type="Black" color="white" size={40}>{translation[lan].category[categoryFilter]}</NotoSans>
          </FlexHorizontal>
          <MoneyIndicator style={{height: 50, backgroundColor: 'rgba(0,0,0,0.5)'}} value={playdata.user.gold} />
        </View>
        <View style={{flex: 1}}>
          <ItemList style={{paddingVertical: 10}} categoryFilter={categoryFilter} data={items} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          borderTopWidth: 1,
        }}>
        <CatogorySelector onChange={(category: CategoryFilter) => setCategoryFilter(category)} />
      </View>
    </View>
  )
}

export default Shop
