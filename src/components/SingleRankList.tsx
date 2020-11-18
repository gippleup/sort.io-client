import React from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import Svg, { G, Path } from 'react-native-svg'
import { RawSingleRankData } from '../api/rank'
import { Line, NotoSans } from './Generic/StyledComponents'
import SingleRankListEntry from './SingleRankList/SingleRankListEntry'

type OwnerCheckedSingleRankData = RawSingleRankData & {
  isMine?: boolean;
}

type SingleRankListProps = {
  data?: (null | OwnerCheckedSingleRankData)[];
  fallback?: JSX.Element;
}

const SingleRankList = (props: SingleRankListProps) => {
  const [interestTarget, setInterestTarget] = React.useState<number | null>(null);
  const {data, fallback = <></>} = props;
  if (!data) return <></>;
  if (!data.length) return fallback;
  return (
    <FlatList
      data={data}
      renderItem={(itemData) => {
        const {index, item, separators} = itemData;
        if (item === null) return (
          <View style={{height: 30, justifyContent: "center", alignItems: "center", backgroundColor: "grey"}}>
            <Svg width={Dimensions.get("window").width - 100} height={30}>
              <Path
                x={25}
                y={15}
                strokeWidth="3"
                stroke="lightgrey"
                d={`M 0 0 H ${Dimensions.get("window").width - 150}`}
                strokeDasharray="8 1"
              />
            </Svg>
          </View>
        )
        return (
          <SingleRankListEntry
            data={item}
            spread={item.id === interestTarget}
            isMine={item.isMine}
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
      keyExtractor={(item, index) => item ? `user${item.id}` : `space${index}`}
    />
  )
}

export default SingleRankList
