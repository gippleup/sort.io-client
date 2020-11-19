import React from 'react'
import { View, Text } from 'react-native'
import { getSinglePlayRankById, getSinglePlayRankFromTo, RawSingleRankData } from '../../../api/rank'
import SingleRankList from '../../../components/SingleRankList'
import NoDataFallback from '../../../components/NoDataFallback'
import { LeaderBoardContainer } from './_Styled'
import SingleRankListEntry from '../../../components/SingleRankList/SingleRankListEntry'
import usePlayData from '../../../hooks/usePlayData'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'

type SingleRankBoardProps = {
  span?: number;
  length?: number;
  interestedOn?: boolean;
}

const SingleRankBoard = (props: SingleRankBoardProps) => {
  const {user} = usePlayData();
  const {span = 1, length = 20, interestedOn = false} = props;
  const [singleRankData, setSingleRankData] = React.useState<(RawSingleRankData | null)[] | null>(null);
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;

  const Fallback = () => (
    <View style={{flex: 1}}>
      <NoDataFallback text={translation.noRecord} />
    </View>
  )

  React.useEffect(() => {
    getSinglePlayRankById(user.id, span).then((playerData) => {
      getSinglePlayRankFromTo(0, length, span).then((data) => {
        if (!playerData && data) {
          setSingleRankData(data)
        } else if (playerData && data) {
          const mappedPlayerData = {...playerData, isMine: true}
          const isPlayerOnTheList = data.find((data) => data.id === mappedPlayerData.id);
          if (isPlayerOnTheList) {
            const mappedData = data.map((entry) => entry.id === mappedPlayerData.id ? mappedPlayerData : entry);
            setSingleRankData(mappedData);
          } else {
            setSingleRankData([...data, null, mappedPlayerData]);
          }
        }
      })
    })
  }, [span])
  
  return (
    <LeaderBoardContainer>
      <View style={{display: interestedOn ? "flex" : "none"}}>
        <SingleRankList
          fallback={<Fallback/>}
          data={singleRankData || undefined}
        />
      </View>
    </LeaderBoardContainer>
  )
}

export default SingleRankBoard;
