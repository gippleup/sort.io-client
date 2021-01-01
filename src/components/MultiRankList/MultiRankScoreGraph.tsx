import chroma from 'chroma-js'
import React, { Fragment } from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import { LinearGradient, Stop } from 'react-native-svg'
import PieChart from '@components/PieChart'

type MultiRankScoreGraphProps = {
  data: Record<"win" | "lose" | "draw", number>;
  style?: ViewStyle;
}

const MultiRankScoreGraph = (props: MultiRankScoreGraphProps) => {
  const {data, style} = props;
  return (
    <View style={{...style, overflow: "hidden"}}>
      <PieChart
        data={data}
        defs={(
          <Fragment>
            <LinearGradient id="win" x1={0} y1={0} x2={1} y2={1}>
              <Stop offset={0} stopColor="cyan"/>
              <Stop offset={1} stopColor="yellow"/>
            </LinearGradient>
            <LinearGradient id="lose" x1={1} y1={1} x2={0} y2={0}>
              <Stop offset={0} stopColor="red"/>
              <Stop offset={1} stopColor="blue"/>
            </LinearGradient>
            <LinearGradient id="draw" x1={0} y1={0} x2={1} y2={1}>
              <Stop offset={0} stopColor="lightgrey"/>
              <Stop offset={1} stopColor="grey"/>
            </LinearGradient>
            <LinearGradient id="winStroke" x1={0} y1={0} x2={1} y2={1}>
              <Stop offset={0} stopColor="royalblue"/>
              <Stop offset={1} stopColor="violet"/>
            </LinearGradient>
            <LinearGradient id="loseStroke" x1={0} y1={0} x2={1} y2={1}>
              <Stop offset={0} stopColor="violet"/>
              <Stop offset={1} stopColor="pink"/>
            </LinearGradient>
            <LinearGradient id="drawStroke" x1={0} y1={0} x2={1} y2={1}>
              <Stop offset={0} stopColor="grey"/>
              <Stop offset={1} stopColor="lightgrey"/>
            </LinearGradient>
            <LinearGradient id="background" x1={0} y1={0} x2={0} y2={1}>
              <Stop offset={0} stopColor="black" stopOpacity={0} />
              <Stop offset={1} stopColor="royalblue" />
            </LinearGradient>
          </Fragment>
        )}
        size={Math.max(Dimensions.get("window").width - 280, 120)}
        style={{
          strokeColor: "grey",
          tagSize: 12,
          padding: 20,
          tagStrokeColor: "black",
          backgroundFill: "url(#background)"
        }}
        pieColorTheme={{
          draw: "url(#draw)",
          lose: "url(#lose)",
          win: "url(#win)"
        }}
        tagColorTheme={{
          draw: "lightgrey",
          lose: chroma("tomato").alpha(1).hex(),
          win: chroma("cyan").alpha(1).hex()
        }}
        strokeColorTheme={{
          draw: "url(#drawStroke)",
          lose: "url(#loseStroke)",
          win: "url(#winStroke)"
        }}
        percentVisible={true}
      />
    </View>
  )
}

export default MultiRankScoreGraph
