import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import SlideSelector from '../../../components/SlideSelector'

const categoryFilter = {
  all: 0,
  skin: 1,
  expression: 2,
  etc: 3,
}

export type CategoryFilter = keyof typeof categoryFilter;

const translation = {
  kor: {
    all: '전체',
    skin: '스킨',
    expression: '감정표현',
    etc: '기타',
  }
}

type CategorySelectorProps = {
  onChange?: (category: CategoryFilter) => any;
}

const CatogorySelector = (props: CategorySelectorProps) => {
  const {onChange} = props;
  const lan = "kor";
  return (
    <SlideSelector
      direction="horizontal"
      interval={10}
      size={Dimensions.get('screen').width - 150}
      data={Object.keys(categoryFilter)}
      initialCursor={1}
      entryRenderer={(str: CategoryFilter, selected) => {
        return (
          <View style={{ padding: 20, backgroundColor: selected ? 'black' : 'white', borderRadius: 10 }}>
            <NotoSans color={selected ? 'white' : 'black'} type="Bold">{translation[lan][str]}</NotoSans>
          </View>
        )
      }}
      onChange={onChange}
    />
  )
}

export default CatogorySelector
