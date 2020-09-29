import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryFilter } from '../screens/production/Shop/CatogorySelector';
import ItemBox, { Item, ItemCategory } from './ItemBox';

type ItemListProps = {
  data: Item[];
  categoryFilter: CategoryFilter;
}

const ItemList: React.FC<ItemListProps> = (props) => {
  const { data, categoryFilter } = props;
  const selectedItems = categoryFilter === "all"
  ? data
  : data.filter((item) => item.category === categoryFilter)

  return (
    <ScrollView>
      {selectedItems.map((item, i) => <ItemBox key={i} {...item} />)}
    </ScrollView>
  )
}

export default ItemList
