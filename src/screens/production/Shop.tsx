import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '../../api/icon';
import PatternBackground from '../../components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans } from '../../components/Generic/StyledComponents';
import ItemList from '../../components/ItemList';
import MoneyIndicator from '../../components/Main/MoneyIndicator';
import translation from '../../Language/translation';
import CatogorySelector, { CategoryFilter } from './Shop/CatogorySelector';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { fetchItemList } from '../../redux/actions/items/thunk';
import { checkUsageOfItems } from '../../redux/actions/items/utils';
import { RootStackParamList } from '../../router/routes';

const Shop = () => {
  const {playData, global, items} = useSelector((state: AppState) => state)
  const dispatch = useDispatch();
  const {language: lan} = global;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
            <NotoSans type="Black" color="white" size={20}>상점</NotoSans>
          </FlexHorizontal>
          <MoneyIndicator style={{height: 50, backgroundColor: 'rgba(0,0,0,0.5)'}} value={playData.user.gold} />
        </View>
        <View style={{flex: 1}}>
          <ItemList
            style={{ paddingVertical: 10 }}
            categoryFilter={categoryFilter}
            data={listCheckedUsage}
            lan={lan}
            navigation={navigation}
          />
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
