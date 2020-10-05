import React, { Suspense } from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { CategoryFilter } from '../screens/production/Shop/CatogorySelector';
import PatternBackground from './GameScene/PatternBackground';
import { FlexHorizontal, Space } from './Generic/StyledComponents';
import GradientBlindScrollView from './GradientBlindScrollView';
import { Item, ItemCategory } from './ItemList/ItemBox';
import ItemBoxFallback from './ItemList/ItemBoxFallback';

type ItemListProps = {
  data: Item[];
  categoryFilter: CategoryFilter;
  style?: ViewStyle;
}

const ItemList: React.FC<ItemListProps> = (props) => {
  const ItemBox = React.lazy(() => import('./ItemList/ItemBox'))
  const { data, categoryFilter } = props;
  const selectedItems = categoryFilter === "all"
  ? data
  : data.filter((item) => item.category === categoryFilter)

  return (
    <GradientBlindScrollView
      blindColor="black"
      blindHeight={100}
      blindTransitionHeight={200}
      style={props.style}>
      <FlexHorizontal style={{flexWrap: 'wrap'}}>
        {selectedItems.map((item, i) => (
          <Suspense key={i} fallback={(<ItemBoxFallback/>)}>
            <ItemBox {...item} />
          </Suspense>
        ))}
      </FlexHorizontal>
      <Space height={100}/>
    </GradientBlindScrollView>
  )
}

export default ItemList
