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
import TranslationPack from '../../Language/translation';
import {
  CategorySelectorContainer,
  Flex,
  Header,
  IconContainer,
  StyledMoneyIndicator,
} from './Shop/_StyledComponents';
import PreparingItem from './Shop/PreparingItem';
import { removeTargetRoute } from '../../api/navigation';

const Shop = () => {
  const {playData, global, items} = useSelector((state: AppState) => state)
  const dispatch = useDispatch();
  const {language: lan} = global;
  const translation = TranslationPack[lan].screens.Shop;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
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
        <PatternBackground source={require('../../assets/BackgroundPattern.png')} />

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
        <CatogorySelector onChange={onCategoryChange} />
      </CategorySelectorContainer>
    </Flex>
  )
}

export default Shop
