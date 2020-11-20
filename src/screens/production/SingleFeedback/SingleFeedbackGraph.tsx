import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { LinearGradient, Stop } from 'react-native-svg';
import styled from 'styled-components'
import { getLocalPlayData } from '../../../api/local';
import { getSinglePlayDataByUserId, SinglePlay } from '../../../api/playData';
import useGlobal from '../../../hooks/useGlobal';
import usePlayData from '../../../hooks/usePlayData';
import translation from '../../../Language/ko/screens/Main';
import TranslationPack from '../../../Language/translation';
import { getLevelString } from '../GameScreen/utils';
import { NotoSans, Space } from '../../../components/Generic/StyledComponents';
import LineGraph from '../../../components/LineGraph';
import NoDataFallback from '../../../components/NoDataFallback';
import TimerBar from '../../../components/TimerBar';

const dimension = Dimensions.get("window");

const GraphContainer = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  border-width: 1px;
`;

type SingleFeedbackGraphState = {
  graphData: SinglePlay[] | null;
}

const SingleFeedbackGraph = () => {
  const {user, singlePlay} = usePlayData();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;

  const renderGraph = () => {
    if (!singlePlay.length) {
      return (
        <NotoSans type="Black">{translation.noData}</NotoSans>
      );
    }
    return (
      <LineGraph
        data={singlePlay}
        xValueExtractor={(entry, i) => i}
        yValueExtractor={(entry, i) => entry.difficulty}
        xTagExtractor={(entry, i) => i}
        yTagExtractor={(entry, i) => getLevelString(entry.difficulty).replace(/aeiou/g, "")}
        fallback={<NoDataFallback/>}
        defs={(
          <Fragment>
            <LinearGradient id="line" x1={0} y1={0} x2={0} y2={1}>
              <Stop offset={0} stopColor="red" />
              <Stop offset={1} stopColor="violet" />
            </LinearGradient>
            <LinearGradient id="linefill" x1={0} y1={0} x2={0} y2={1}>
              <Stop offset={0} stopColor="blue" />
              <Stop offset={1} stopColor="firebrick" />
            </LinearGradient>
          </Fragment>
        )}
        style={{
          paddingLeft: 40,
          paddingRight: 30,
          graphPaddingRight: 20,
          graphPaddingTop: 30,
          graphBackgroundFill: "transparent",
          xAxisColor: "dodgerblue",
          yAxisColor: "dodgerblue",
          lineWidth: 2,
          lineColor: "url(#line)",
          graphFill: "url(#linefill)",
          pointFill: "white",
          pointSize: 6,
          xTagColor: "dodgerblue",
          height: 200,
          width: Dimensions.get("window").width - 80,
          xAxisWidth: 2,
          yAxisWidth: 2,
        }}
      />
    )
  }

  return (
    <View style={{alignItems: "center"}}>
      <NotoSans color="white" size={25}>{translation.rankChangeProgess}</NotoSans>
      <Space height={10}/>
      <GraphContainer>
        {renderGraph()}
      </GraphContainer>
    </View>
  )
}

export default SingleFeedbackGraph
