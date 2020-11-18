import React from 'react'
import { View, Text } from 'react-native'
import { getMultiPlayRankById, getMultiPlayRankFromTo, RawMultiRankData } from '../../../api/rank';
import Block from '../../../components/Block';
import { NotoSans } from '../../../components/Generic/StyledComponents';
import MultiRankList from '../../../components/MultiRankList';
import NoDataFallback from '../../../components/NoDataFallback';
import usePlayData from '../../../hooks/usePlayData';
import { LeaderBoardContainer } from './_Styled'

type MultiRankBoardProps = {
  span?: number;
  length?: number;
}

const MultiRankBoard = (props: MultiRankBoardProps) => {
  const {user} = usePlayData();
  const {span = 1, length = 20} = props;
  const [multiRankData, setMultiRankData] = React.useState<(RawMultiRankData | null)[] | null>(null);
  
  React.useEffect(() => {
    getMultiPlayRankById(user.id, span).then((playerData) => {
      getMultiPlayRankFromTo(0, length, span).then((data) => {
        if (!playerData && data) {
          setMultiRankData(data)
        } else if (playerData && data) {
          const mappedPlayerData = {...playerData, isMine: true}
          const isPlayerOnTheList = data.find((data) => data.id === mappedPlayerData.id);
          if (isPlayerOnTheList) {
            const mappedData = data.map((entry) => entry.id === mappedPlayerData.id ? mappedPlayerData : entry);
            setMultiRankData(mappedData);
          } else {
            setMultiRankData([...data, null, mappedPlayerData]);
          }
        }
      })
    })
  }, [span])

  return (
    <LeaderBoardContainer>
      <MultiRankList fallback={<NoDataFallback />} data={multiRankData || undefined}/>
    </LeaderBoardContainer>
  )
}

export default MultiRankBoard
