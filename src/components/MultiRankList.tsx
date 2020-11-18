import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { RawMultiRankData } from '../api/rank'
import MultiRankListEntry from './MultiRankList/MultiRankListEntry'

type MultiRankListProps = {
  data?: RawMultiRankData[];
  fallback?: JSX.Element;
}

const MultiRankList = (props: MultiRankListProps) => {
  const [interestTarget, setInterestTarget] = React.useState<number | null>(null);
  const {data, fallback = <></>} = props;
  if (!data) return <></>;
  if (!data.length) return fallback;
  return (
    <FlatList
      data={data}
      renderItem={(itemData) => {
        const {index, item, separators} = itemData;
        return (
          <MultiRankListEntry
            data={item}
            spread={item.id === interestTarget}
            index={index}
            onPressSpread={() => {
              if (item.id === interestTarget) {
                setInterestTarget(null);
              } else {
                setInterestTarget(item.id);
              }
            }}
          />
        )
      }}
      keyExtractor={(item, index) => `user${item.id}`}
    />
  )
}

export default MultiRankList
