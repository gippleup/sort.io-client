import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { RawSingleRankData } from '../api/rank'
import SingleRankListEntry from './SingleRankList/SingleRankListEntry'

type SingleRankListProps = {
  data?: RawSingleRankData[];
}

const SingleRankList = (props: SingleRankListProps) => {
  const [interestTarget, setInterestTarget] = React.useState<number | null>(null);
  const {data} = props;
  if (!data) return <></>;
  return (
    <FlatList
      data={data}
      renderItem={(itemData) => {
        const {index, item, separators} = itemData;
        return (
          <SingleRankListEntry
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

export default SingleRankList