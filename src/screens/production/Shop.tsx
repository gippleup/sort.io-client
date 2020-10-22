import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '../../api/icon';
import PatternBackground from '../../components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans, Space } from '../../components/Generic/StyledComponents';
import ItemList from '../../components/ItemList';
import MoneyIndicator from '../../components/Main/MoneyIndicator';
import translation from '../../Language/translation';
import CatogorySelector, { CategoryFilter } from './Shop/CatogorySelector';
import { getItemList } from '../../api/sortio';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemList } from '../../redux/actions/items/cretor';
import { AppState } from '../../redux/store';
import { fetchItemList } from '../../redux/actions/items/thunk';
import { checkUsageOfItems } from '../../redux/actions/items/utils';

const LazyItemList = React.lazy(() => import('../../components/ItemList'));

const Shop = () => {
  const {playData, global, items} = useSelector((state: AppState) => state)
  const dispatch = useDispatch();
  const {language: lan} = global;
  const navigation = useNavigation();
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>("skin");
  const loadedInitialList = React.useRef(false);
  const hasItems = Array.isArray(items) ? items.length > 0 : items;

  if (!hasItems && !loadedInitialList.current) {
    loadedInitialList.current = true;
    setTimeout(() => {
      dispatch(fetchItemList());
    })
  }

  const listCheckedUsage = items ? checkUsageOfItems(items, global) : [];

  const onCategoryChange = (category: CategoryFilter) => {
    setCategoryFilter(category);
  }
  
  const onPressGoback = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter((route) => route.name !== "Shop")
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      })
    })
  }

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
              <View style={{padding: 15}}>
                {getIcon("fontAwesome", "arrow-left", {color: "white", size: 20})}
              </View>
            </TouchableOpacity>
            <NotoSans type="Black" color="white" size={20}>{translation[lan].category[categoryFilter]}</NotoSans>
          </FlexHorizontal>
          <MoneyIndicator style={{height: 50, backgroundColor: 'rgba(0,0,0,0.5)'}} value={playData.user.gold} />
        </View>
        <View style={{flex: 1}}>
          {!hasItems
            ? <></>
            : (
              <React.Suspense
                fallback={(
                  // <ItemListFallback
                  //   style={{paddingVertical: 10}}
                  //   categoryFilter={categoryFilter}
                  //   data={listCheckedUsage}
                  // />
                  <></>
                )}
              >
                <LazyItemList
                  style={{ paddingVertical: 10 }}
                  categoryFilter={categoryFilter}
                  data={listCheckedUsage}
                />
              </React.Suspense>
            )
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
