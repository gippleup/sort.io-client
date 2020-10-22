import React, { Suspense } from 'react';
import { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryFilter } from '../../screens/production/Shop/CatogorySelector';
import { FlexHorizontal, Space } from '../Generic/StyledComponents';
import GradientBlindScrollView from '../GradientBlindScrollView';
import { Item } from './ItemBox';
import ItemBoxFallback from './ItemBoxFallback';


type ItemListProps = {
  data: Item[];
  categoryFilter: CategoryFilter;
  style?: ViewStyle;
}

const ItemListFallback: React.FC<ItemListProps> = (props) => {
  const { data, categoryFilter } = props;
  const selectedItems = categoryFilter === "all"
  ? data
  : data.filter((item) => item.category === categoryFilter)

  return (
    <ScrollView>
      {Array(selectedItems.length).fill(1).map((_, i) => (<ItemBoxFallback key={i} />))}
      <Space height={100}/>
    </ScrollView>
  )
}

export default ItemListFallback
