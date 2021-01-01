import React from 'react'
import { View, Text } from 'react-native'
import { getMultiPlayRankById, getMultiPlayRankFromTo, RawMultiRankData } from '@api/rank';
import MultiRankList from '@components/MultiRankList';
import NoDataFallback from '@components/NoDataFallback';
import useGlobal from '@hooks/useGlobal';
import usePlayData from '@hooks/usePlayData';
import TranslationPack from '@Language/translation';
import { LeaderBoardContainer } from '@screens/production/LeaderBoard/_Styled'

type MultiRankBoardProps = {
  span?: number;
  length?: number;
  interestedOn?: boolean;
}

const MultiRankBoard = (props: MultiRankBoardProps) => {
  const {user} = usePlayData();
  const {span = 1, length = 20, interestedOn} = props;
  const [multiRankData, setMultiRankData] = React.useState<(RawMultiRankData | null)[] | null>(null);
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;

  const Fallback = () => (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <NoDataFallback text={translation.noRecord} />
    </View>
  )

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
      <View style={{display: interestedOn ? "flex" : "none", flex: 1}}>
        <MultiRankList
          fallback={<Fallback />}
          data={multiRankData || undefined}/>
      </View>
    </LeaderBoardContainer>
  )
}

export default MultiRankBoard;
