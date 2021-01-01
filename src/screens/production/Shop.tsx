import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon } from '@api/icon';
import PatternBackground from '@components/GameScene/PatternBackground';
import { FlexHorizontal, NotoSans } from '@components/Generic/StyledComponents';
import ItemList from '@components/ItemList';
import MoneyIndicator from '@components/Main/MoneyIndicator';
import translation from '@Language/translation';
import CatogorySelector, { CategoryFilter } from '@screens/production/Shop/CatogorySelector';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@redux/store';
import { fetchItemList } from '@redux/actions/items/thunk';
import { checkUsageOfItems } from '@redux/actions/items/utils';
import { RootStackParamList } from '@router/routes';
import TranslationPack from '@Language/translation';
import {
  CategorySelectorContainer,
  Flex,
  Header,
  IconContainer,
  StyledMoneyIndicator,
} from '@screens/production/Shop/_StyledComponents';
import PreparingItem from '@screens/production/Shop/PreparingItem';
import { removeTargetRoute } from '@api/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type ShopProps = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">;
}

export type ShopParams = {
  initialCategory?: CategoryFilter;
}

const Shop = (props: ShopProps) => {
  const {navigation, route} = props;
  const {params} = route;
  const initialCategory = (params && params.initialCategory) ? params.initialCategory : "skin";
  const {playData, global, items} = useSelector((state: AppState) => state)
  const dispatch = useDispatch();
  const {language: lan} = global;
  const translation = TranslationPack[lan].screens.Shop;
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilter>(initialCategory);
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
    setImmediate(() => {
      setCategoryFilter(category);
    })
  }
  
  const onPressGoback = () => removeTargetRoute(navigation, "Shop");

  const ArrowIcon = () => getIcon("fontAwesome", "arrow-left", {color: "white", size: 20});
  const NavTitle = () => <NotoSans type="Black" color="white" size={20}>{translation.navTitle}</NotoSans>;

  return (
    <Flex>
      <Flex>
        <PatternBackground source={require('@assets/BackgroundPattern.png')} />

        <Header>
          <FlexHorizontal>
            <TouchableOpacity onPress={onPressGoback}>
              <IconContainer>
                <ArrowIcon/>
              </IconContainer>
            </TouchableOpacity>
            <NavTitle/>
          </FlexHorizontal>
          <StyledMoneyIndicator value={playData.user.gold} />
        </Header>

        <Flex>
          <ItemList
            style={{ paddingVertical: 10 }}
            categoryFilter={categoryFilter}
            data={listCheckedUsage}
            lan={lan}
            navigation={navigation}
            fallback={<PreparingItem/>}
          />
        </Flex>

      </Flex>
      <CategorySelectorContainer>
        <CatogorySelector initialCategory={initialCategory} onChange={onCategoryChange} />
      </CategorySelectorContainer>
    </Flex>
  )
}

export default Shop
