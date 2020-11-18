import React from 'react'
import { View, Text } from 'react-native'
import { getMultiPlayRankFromTo, RawMultiRankData } from '../../../api/rank';
import Block from '../../../components/Block';
import { NotoSans } from '../../../components/Generic/StyledComponents';
import MultiRankList from '../../../components/MultiRankList';
import RankListFallback from './RankListFallback';
import { LeaderBoardContainer } from './_Styled'

type MultiRankBoardProps = {
  span?: number;
  length?: number;
}

const MultiRankBoard = (props: MultiRankBoardProps) => {
  const {span = 1, length = 20} = props;
  const [multiRankData, setMultiRankData] = React.useState<RawMultiRankData[] | null>(null);
  
  React.useEffect(() => {
    getMultiPlayRankFromTo(0, length, span).then((data) => setMultiRankData(data));
  }, [span])

  return (
    <LeaderBoardContainer>
      <MultiRankList fallback={<RankListFallback />} data={multiRankData || undefined}/>
    </LeaderBoardContainer>
  )
}

export default MultiRankBoard
