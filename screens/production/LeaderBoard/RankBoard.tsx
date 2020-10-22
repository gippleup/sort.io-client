import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import { FullFlexCenter, NotoSans } from '../../../components/Generic/StyledComponents'
import { lazify } from '../../../components/Generic/utils'
import RankViewer, { RankViewerData, RankViewerDataEntry } from '../../../components/RankViewer'
import usePlayData from '../../../hooks/usePlayData'
import { getSinglePlayRankData, getMultiPlayRankData } from './RankBoard/utils'

type RankBoardProps = {
  mode?: "single" | "multi";
}

const RankBoard = (props: RankBoardProps) => {
  const {mode = "single"} = props;
  const playData = usePlayData();
  const rankViewerRef = React.useRef<RankViewer>(null);
  let userRow: null | number = null;

  const LazyBoard = lazify<never>(new Promise(async (resolve, reject) => {
    if (!playData.user.id) {
      return resolve(
        <FullFlexCenter>
          <NotoSans type="Black">인터넷 연결 상태를 확인해주세요.</NotoSans>
        </FullFlexCenter>
      );
    }

    const rankData = mode === "single" 
      ? await getSinglePlayRankData(playData.user.id, 15)
      : await getMultiPlayRankData(playData.user.id, 15);

    if (!rankData) {
      return resolve(
        <FullFlexCenter>
          <NotoSans type="Black">플레이 데이터가 없습니다.</NotoSans>
        </FullFlexCenter>
      );
    }

    for (let i = 0; i < rankData.length; i += 1) {
      if (rankData[i].id === playData.user.id) {
        userRow = i;
        break;
      }
    }

    return resolve(
      <RankViewer
        ref={rankViewerRef}
        style={{width: "99%", flex: 1, marginVertical: 5}}
        blindColor="white"
        entryStyle={(entry, i, isEnd) => {
          const defaultContainerStyle: ViewStyle = {backgroundColor: 'transparent'}
          if (entry.id === playData.user.id) {
            return {
              containerStyle: {
                backgroundColor: 'dodgerblue',
              },
              textStyle: {
                color: 'white',
                fontWeight: 'bold'
              }
            }
          }
  
          if (isEnd) {
            return {
              containerStyle: {
                ...defaultContainerStyle,
                borderBottomColor: 'transparent'
              }
            }
          }
  
          return {
            containerStyle: defaultContainerStyle,
          }
        }}
        data={rankData}
      />
    )
  }))

  React.useEffect(() => {
    if (rankViewerRef.current && userRow) {
      const $ = rankViewerRef.current
      $._blindScrollViewRef.current?._scrollViewRef.current?.scrollTo({
        y: 50 * userRow,
        animated: true
      });
    }
  })

  return (
    <React.Suspense fallback={<></>}>
      <LazyBoard/>
    </React.Suspense>
  )
}

export default RankBoard
