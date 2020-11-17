import React, { Fragment } from 'react'
import { View, ViewProps, Dimensions } from 'react-native'
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop, Text } from 'react-native-svg'
import { getMaxFromArr, getMinFromArr, interpolateNum } from '../api/utils';
import { drawSvgLine } from './LineGraph/utils';

type LineGraphProps<T> = {
  data: T[];
  xValueExtractor: (entry: T, i: number) => number;
  yValueExtractor: (entry: T, i: number) => number;
  xTagExtractor: (entry: T, i: number) => string | number;
  yTagExtractor: (entry: T, i: number) => string | number;
  xTagRenderer?: (entry: T, i: number) => JSX.Element;
  yTagRenderer?: (entry: T, i: number) => JSX.Element;
  pointRenderer?: (entry: T, i: number) => JSX.Element;
  pointCount?: number;
  style?: {
    width?: number;
    height?: number;
    pointSize?: number;
    yAxisWidth?: number;
    xAxisWidth?: number;
    padding?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingLeft?: number;
    paddingBottom?: number;
    graphPadding?: number;
    graphPaddingTop?: number;
    graphPaddingBottom?: number;
    graphPaddingLeft?: number;
    graphPaddingRight?: number;
    backgroundFill?: string;
    graphBackgroundFill?: string;
    lineWidth?: number;
    lineColor?: string;
    lineFill?: string;
    xAxisColor?: string;
    yAxisColor?: string;
    pointFill?: string;
  }
  defs?: JSX.Element;
}

const dimension = Dimensions.get("window");

const LineGraph: <T>(props: LineGraphProps<T>) => JSX.Element = (props) => {
  const {
    data,
    xTagExtractor,
    xValueExtractor,
    yTagExtractor,
    yValueExtractor,
    pointRenderer,
    xTagRenderer,
    yTagRenderer,
    style = {},
    pointCount = 5,
    defs = (
      <Defs>
        <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="backgroundGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="white" stopOpacity="1" />
          <Stop offset="1" stopColor="pink" stopOpacity="1" />
        </LinearGradient>
      </Defs>
    ),
  } = props;

  const {
    width = dimension.width - 50,
    height = 200,
    xAxisWidth = 1,
    yAxisWidth = 1,
    pointSize = 5,
    padding = 0,
    graphPadding = 0,
    lineWidth = 1,
    lineColor = "url(#grad2)",
    lineFill = "url(#grad1)",
    xAxisColor = "black",
    yAxisColor = "black",
    pointFill = "black"
  } = style;

  const {
    paddingBottom = padding || 30,
    paddingLeft = padding || 20,
    paddingRight = padding || 20,
    paddingTop = padding || 20,
    graphPaddingTop = graphPadding || 30,
    graphPaddingBottom = graphPadding || 10,
    graphPaddingLeft = graphPadding || 0,
    graphPaddingRight = graphPadding || 30,
    backgroundFill = "transparent",
    graphBackgroundFill = "url(#backgroundGrad)",
  } = style;

  const coordArr = data.map((entry, i) => ({
    x: xValueExtractor(entry, i),
    y: yValueExtractor(entry, i)
  }))

  const xArr = coordArr.map((entry) => entry.x);
  const yArr = coordArr.map((entry) => entry.y);

  const min = {
    x: getMinFromArr(xArr),
    y: getMinFromArr(yArr),
  };

  const max = {
    x: getMaxFromArr(xArr),
    y: getMaxFromArr(yArr),
  }

  const interpolatedCoordArr = coordArr.map((coord) => ({
    x: interpolateNum(coord.x)({
      input: [min.x, max.x],
      output: [paddingLeft + graphPaddingLeft, width - paddingRight - graphPaddingRight],
    }),
    y: interpolateNum(coord.y)({
      input: [min.y, max.y],
      output: [0 + paddingBottom + graphPaddingBottom, height - paddingTop - graphPaddingTop],
    })
  }))

  const targetPoint = Array(pointCount).fill(1)
    .map((_, j) => Math.floor((data.length - 1) / pointCount * (j + 1)));

  const points = interpolatedCoordArr
    .map((coord, i) => {
      const reason1 = data.length > Math.ceil(pointCount * 1.5);
      const reason2 = targetPoint.indexOf(i) !== -1;
      if (reason1 && reason2) {
        return {
          ...coord,
          tagX: xTagExtractor(data[i], i),
          tagY: yTagExtractor(data[i], i),
        }
      } 
      return null
    })

  return (
    <Svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{backgroundColor: "white"}}>
      {/* background */}
      <Rect
        width={width}
        height={height}
        fill={backgroundFill}
      />
      {/* graph background */}
      <Rect
        x={paddingLeft}
        y={paddingTop}
        width={width - paddingLeft - paddingRight}
        height={height - paddingTop - paddingBottom}
        fill={graphBackgroundFill}
      />
      {/* line fill */}
      <Path
        y={paddingTop + graphPaddingTop}
        d={`
          ${drawSvgLine(interpolatedCoordArr)}
          V ${height - paddingTop - graphPaddingTop - paddingBottom}
          H ${paddingLeft + graphPaddingLeft}
          V ${height - paddingTop - graphPaddingTop - paddingBottom - graphPaddingBottom}
        `}
        fill={lineFill}
      />
      {/* line */}
      <Path
        y={paddingTop + graphPaddingTop}
        d={drawSvgLine(interpolatedCoordArr)}
        strokeWidth={lineWidth}
        stroke={lineColor}
        strokeLinecap="round"
      />
      {/* yAxis */}
      <Path
        d={`
          M ${yAxisWidth / 2 + paddingLeft}, ${paddingTop}
          V ${height - paddingBottom}
        `}
        stroke={yAxisColor}
        strokeWidth={yAxisWidth}
      />
      {/* xAxis */}
      <Path
        d={`
          M ${paddingLeft}, ${height - xAxisWidth / 2 - paddingBottom}
          H ${width - paddingRight}
        `}
        stroke={xAxisColor}
        strokeWidth={xAxisWidth}
      />
      {points.map((coord, i) => {
        if (!coord) return <Fragment key={i}></Fragment>;
        const {x, y, tagX, tagY} = coord;
        const Point = () => {
          if (pointRenderer) return pointRenderer(data[i], i);
          return (
            <Circle x={coord.x} y={height - coord.y} r={pointSize / 2} fill={pointFill} />
          )
        }
        const TagX = () => {
          if (xTagRenderer) return xTagRenderer(data[i], i);
          return (
            <Text
              vectorEffect="none"
              fontSize="10"
              fill="black"
              fontFamily="NotoSansKR-Black"
              textAnchor="middle"
            >{tagX}</Text>
          )
        }
        const TagY = () => {
          if (yTagRenderer) return yTagRenderer(data[i], i);
          return (
            <Fragment>
              <Text
                fontSize="12"
                strokeWidth="3"
                fill="black"
                stroke="white"
                fontFamily="NotoSansKR-Bold"
                textAnchor="middle"
              >{tagY}</Text>
              <Text
                fontSize="12"
                strokeWidth="0"
                fill="black"
                stroke="white"
                fontFamily="NotoSansKR-Bold"
                textAnchor="middle"
              >{tagY}</Text>
            </Fragment>
          )
        }
        return (
          <Fragment key={i}>
            <Point/>
            <G x={x} y={height - paddingBottom + 15}><TagX/></G>
            <G x={x} y={height - y - 10}><TagY/></G>
          </Fragment>
        )
      })}
      {defs}
    </Svg>
  )
}

export default LineGraph
