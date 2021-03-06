import React, { Fragment } from 'react'
import { View, Dimensions } from 'react-native'
import { LinearGradient, Stop } from 'react-native-svg';
import { MultiPlay } from '@api/playData';
import { NotoSans, FlexHorizontal } from '@components/Generic/StyledComponents';
import LineGraph from '@components/LineGraph';

type MultiRankGraphProps = {
  graphData?: MultiPlay[];
}

const MultiRankGraph = (props: MultiRankGraphProps) => {
  const {graphData} = props;
  if (!graphData) return <></>;
  return (
    <View style={{marginTop: 10, justifyContent: "center", alignItems: "center"}}>
      <NotoSans style={{marginBottom: 5, marginLeft: 10}} type="Bold">플레이 시간</NotoSans>
      <FlexHorizontal>
        <View style={{borderRadius: 5, overflow: "hidden"}}>
          <LineGraph
            data={graphData}
            xValueExtractor={(_, i: number) => i}
            yValueExtractor={(entry: MultiPlay) => entry.timeConsumed}
            xTagExtractor={(_, i) => i + 1}
            yTagExtractor={(entry: MultiPlay, i) => entry.timeConsumed + "초"}
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

export default MultiRankGraph
