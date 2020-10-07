import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '../../api/icon';
import skinMap, { SupportedSkin } from '../../components/Block/skinMap';
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
      name: key as SupportedSkin,
      price: 1300,
      currency: "gold" as Currency,
      hasOwned: false,
    }
  }),
  ...Object.keys(expressions).map((key) => {
    return {
      category: "expression" as ItemCategory,
      name: key as SupportedExpression,
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
  const [rendered, setRendered] = React.useState(false);

  const onCategoryChange = (category: CategoryFilter) => {
    setCategoryFilter(category);
  }
  
  const onPressGoback = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name !== "PD_Shop")
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }

  React.useEffect(() => {
    if (!rendered) {
      setRendered(true)
    }
  })

  return (
    <View
      style={{
        flex: 1
      }}>
      <View
        style={{
          flex: 1,
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
            <TouchableOpacity onPress={onPressGoback}>
              {getIcon("fontAwesome", "arrow-left", {color: "white", size: 20})}
            </TouchableOpacity>
            <Space width={10} />
            <NotoSans type="Black" color="white" size={20}>{translation[lan].category[categoryFilter]}</NotoSans>
          </FlexHorizontal>
          <MoneyIndicator style={{height: 50, backgroundColor: 'rgba(0,0,0,0.5)'}} value={playdata.user.gold} />
        </View>
        <View style={{flex: 1}}>
          {!rendered
            ? <></>
            : <ItemList style={{ paddingVertical: 10 }} categoryFilter={categoryFilter} data={items} />
          }
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          height: 100,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
        }}>
        <CatogorySelector onChange={onCategoryChange} />
      </View>
    </View>
  )
}

export default Shop
