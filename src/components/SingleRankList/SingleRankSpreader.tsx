import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { getSinglePlayDataByUserId, SinglePlay } from '../../api/playData'
import { RawSingleRankData } from '../../api/rank'
import { prettyPercent } from '../../api/utils'
import usePlayData from '../../hooks/usePlayData'
import { FlexHorizontal, Line, NotoSans } from '../Generic/StyledComponents'
import Spreader from '../Spreader'
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
}

const SingleRankSpreader = (props: SingleRankSpreaderProps) => {
  const {visible, userData} = props;
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
        <SingleRankGraph graphData={graphData} />
        <View style={{marginTop: 20}}>
          <FlexHorizontal>
            <NotoSans color="dodgerblue" size={20}>싱글플레이 랭킹</NotoSans>
            <Line color="dodgerblue" width={3} height={18} marginHorizontal={10} />
            <NotoSans size={18}>{rank}위</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans color="crimson" size={20}>백분율</NotoSans>
            <Line color="crimson" width={3} height={18} marginHorizontal={10} />
            <NotoSans size={18}>상위 {prettyPercent(Number(rate))}%</NotoSans>
          </FlexHorizontal>
        </View>
      </SpreaderContentContainer>
    </Spreader>
  )
}

export default SingleRankSpreader
