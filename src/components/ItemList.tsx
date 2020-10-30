import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { ViewStyle, FlatList } from 'react-native'
import { SupportedLanguage } from '../redux/actions/global/types';
import { RootStackParamList } from '../router/routes';
import { CategoryFilter } from '../screens/production/Shop/CatogorySelector';
import ItemBox, { Item } from './ItemList/ItemBox';

type ItemListProps = {
  data: Item[];
  categoryFilter: CategoryFilter;
  style?: ViewStyle;
  lan?: SupportedLanguage;
  navigation: NavigationProp<RootStackParamList>
}

const ItemList: React.FC<ItemListProps> = (props) => {
  const { data, categoryFilter, lan = SupportedLanguage.ko, navigation } = props;
  const selectedItems = categoryFilter === "all"
  ? data
  : data.filter((item) => item.category === categoryFilter)

  return (
    <FlatList
      data={selectedItems}
      renderItem={(instance) => (
        <ItemBox
          lan={lan}
          {...instance.item}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, i) => `${item.name}${String(i)}`}
    />
  )
}

export default ItemList
