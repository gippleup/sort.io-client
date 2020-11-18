import React from 'react'
import { View, Text } from 'react-native'
import { getSinglePlayDataByUserId, SinglePlay } from '../../api/playData'
import { RawSingleRankData } from '../../api/rank'
import usePlayData from '../../hooks/usePlayData'
import Spreader from '../Spreader'
import SingleRankGraph from './SingleRankGraph'

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
      <SingleRankGraph graphData={graphData} />
    </Spreader>
  )
}

export default SingleRankSpreader
