import React from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import SlideSelector from '../../../components/SlideSelector'
import useGlobal from '../../../hooks/useGlobal'
import translation from '../../../Language/translation'

const categoryFilter = {
  all: 0,
  skin: 1,
  expression: 2,
  etc: 3,
}

export type CategoryFilter = keyof typeof categoryFilter;

type CategorySelectorProps = {
  onChange?: (category: CategoryFilter) => any;
  style?: ViewStyle;
}

const CatogorySelector = (props: CategorySelectorProps) => {
  const {onChange} = props;
  const global = useGlobal();
  const {language: lan} = global;
  const idleColor = 'grey';
  const activeColor = 'dodgerblue';
  return (
    <SlideSelector
      direction="horizontal"
      interval={10}
      style={props.style}
      size={Dimensions.get('screen').width - 150}
      data={Object.keys(categoryFilter)}
      initialCursor={1}
      entryRenderer={(str: CategoryFilter, selected) => {
        return (
          <View style={{ padding: 20, backgroundColor: selected ? activeColor : idleColor, borderRadius: 10 }}>
            <NotoSans color={selected ? 'white' : 'black'} type="Bold">{translation[lan].category[str]}</NotoSans>
          </View>
        )
      }}
      onChange={onChange}
    />
  )
}

export default CatogorySelector
