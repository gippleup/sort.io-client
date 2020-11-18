import React from 'react'
import { View, Text } from 'react-native'
import { getSinglePlayRankFromTo, RawSingleRankData } from '../../../api/rank'
import SingleRankList from '../../../components/SingleRankList'
import NoDataFallback from '../../../components/NoDataFallback'
import { LeaderBoardContainer } from './_Styled'

type SingleRankBoardProps = {
  span?: number;
  length?: number;
}

const SingleRankBoard = (props: SingleRankBoardProps) => {
  const {span = 1, length = 20} = props;
  const [singleRankData, setSingleRankData] = React.useState<RawSingleRankData[] | null>(null);

  React.useEffect(() => {
    getSinglePlayRankFromTo(0, length, span).then((data) => setSingleRankData(data));
  }, [span])

  return (
    <LeaderBoardContainer>
      <SingleRankList
        fallback={<NoDataFallback/>}
        data={singleRankData || undefined}
      />
    </LeaderBoardContainer>
  )
}

export default SingleRankBoard
