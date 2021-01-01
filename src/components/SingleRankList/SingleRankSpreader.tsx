import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { getSinglePlayDataByUserId, SinglePlay } from '@api/playData'
import { RawSingleRankData } from '@api/rank'
import { prettyPercent } from '@api/utils'
import TranslationPack from '@Language/translation'
import { SupportedLanguage } from '@redux/actions/global/types'
import { FlexHorizontal, Line, NotoSans } from '@components/Generic/StyledComponents'
import Spreader from '@components/Spreader'
import SingleRankGraph from './SingleRankGraph'

const SpreaderContentContainer = styled(View)`
  background-color: lightgrey;
  padding-bottom: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-width: 0.5px;
  align-items: center;
`;

type SingleRankSpreaderProps = {
  visible?: boolean;
  userData: RawSingleRankData;
  lan?: SupportedLanguage;
}

const SingleRankSpreader = (props: SingleRankSpreaderProps) => {
  const {visible, userData, lan = SupportedLanguage.en} = props;
  const spreaderRef = React.useRef<Spreader>(null);
  const [graphData, setGraphData] = React.useState<SinglePlay[]>();
  const {
    createdAt,
    difficulty,
    id,
    name,
    photo,
    rank,
    rate,
  } = userData;
  const translation = TranslationPack[lan].screens.LeaderBoard;

  React.useEffect(() => {
    if (visible && !graphData) {
      getSinglePlayDataByUserId(id)
      .then((data) => setGraphData(data));
    }
    if (visible && graphData) {
      spreaderRef.current?.setSpread("unfold");
    }
    if (!visible && graphData) {
      spreaderRef.current?.setSpread("fold");
    }  
  })

  if (!userData) return <></>;
  if (!visible && !graphData) return <></>;
  if (visible && !graphData) return <></>;

  return (
    <Spreader
      foldDuration={300}
      ref={spreaderRef}
    >
      <SpreaderContentContainer>
        <SingleRankGraph lan={lan} graphData={graphData} />
        <View style={{marginTop: 20}}>
          <FlexHorizontal>
            <NotoSans color="dodgerblue" size={20}>{translation.place}</NotoSans>
            <Line color="dodgerblue" width={3} height={18} marginHorizontal={10} />
            <NotoSans size={18}>{translation.rankText(Number(rank))}</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans color="crimson" size={20}>{translation.percentile}</NotoSans>
            <Line color="crimson" width={3} height={18} marginHorizontal={10} />
            <NotoSans size={18}>{translation.top} {prettyPercent(Number(rate))}%</NotoSans>
          </FlexHorizontal>
        </View>
      </SpreaderContentContainer>
    </Spreader>
  )
}

export default SingleRankSpreader
