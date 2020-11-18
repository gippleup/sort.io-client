import React, { Fragment } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { LinearGradient, Stop } from 'react-native-svg';
import { SinglePlayData } from '../../api/local';
import { getSinglePlayDataByUserId, SinglePlay } from '../../api/playData';
import { getSinglePlayRankFromTo } from '../../api/rank';
import usePlayData from '../../hooks/usePlayData';
import { getLevelString } from '../../screens/production/GameScreen/utils';
import { NotoSans, FlexHorizontal } from '../Generic/StyledComponents';
import LineGraph from '../LineGraph';

type SingleRankGraphProps = {
  graphData?: SinglePlay[];
}

const SingleRankGraph = (props: SingleRankGraphProps) => {
  const {graphData} = props;
  if (!graphData) return <></>;
  return (
    <View style={{marginTop: 10, justifyContent: "center", alignItems: "center"}}>
      <NotoSans style={{marginBottom: 5, marginLeft: 10}} type="Bold">랭크 변화 추이</NotoSans>
      <FlexHorizontal>
        <View style={{borderRadius: 5, overflow: "hidden"}}>
          <LineGraph
            data={graphData}
            xValueExtractor={(_, i: number) => i}
            yValueExtractor={(entry: SinglePlayData) => entry.difficulty}
            xTagExtractor={(_, i) => i + 1}
            yTagExtractor={(entry: SinglePlayData, i) => getLevelString(entry.difficulty).replace(/[aeiou]/g, '')}
            style={{
              paddingRight: 30,
              paddingLeft: 20,
              graphPaddingRight: 0,
              graphBackgroundFill: "black",
              graphFill: "black",
              backgroundFill: "black",
              xTagColor: "dodgerblue",
              pointFill: "rgba(255,255,255,0.8)",
              pointSize: 5,
              width: Dimensions.get("window").width - 100,
              xAxisWidth: 0.5,
              yAxisWidth: 0.5,
              xAxisColor: "url(#background)",
              yAxisColor: "url(#background)",
            }}
            defs={(
              <Fragment>
                <LinearGradient id="background" x1={0} y1={0} x2={0} y2={1}>
                  <Stop offset={0.3} stopColor="violet" stopOpacity={1}/>
                  <Stop offset={1} stopColor="red" stopOpacity={1}/>
                </LinearGradient>
                <LinearGradient id="yTag" x1={0} y1={0} x2={0} y2={1}>
                  <Stop offset={0} stopColor="white" stopOpacity={1}/>
                  <Stop offset={1} stopColor="pink" stopOpacity={1}/>
                </LinearGradient>
              </Fragment>
            )}
          />
        </View>
      </FlexHorizontal>
    </View>
  )
}

export default SingleRankGraph
