import * as d3 from 'd3'
import React, { Fragment } from 'react'
import Svg, { Defs, G, LinearGradient, Path, Rect, Stop, Text } from 'react-native-svg'
import { prettyPercent } from '../api/utils';

type PieChartData = {[index: string]: number};

type PieChartProps<T extends PieChartData> = {
  data: T;
  size?: number;
  style?: {
    innerRadius?: number;
    outerRadius?: number;
    padAngle?: number;
    strokeWidth?: number;
    strokeColor?: string;
    tagStrokeColor?: string;
    tagSize?: number;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    backgroundFill?: string;
  }
  pieColorTheme?: {
    [key in keyof T]: string;
  };
  tagColorTheme?: {
    [key in keyof T]: string;
  };
  strokeColorTheme?: {
    [key in keyof T]: string;
  }
  defs?: JSX.Element;
  percentVisible?: boolean;
}

const PieChart: <T extends PieChartData>(props: PieChartProps<T>) => JSX.Element = (props) => {
  const {
    data,
    size = 200,
    style = {},
    pieColorTheme,
    tagColorTheme,
    strokeColorTheme,
    defs,
    percentVisible,
  } = props;
  const {
    innerRadius = size / 4,
    outerRadius = size / 2,
    padAngle = 0.05,
    strokeWidth = 1,
    tagSize = 15,
    strokeColor = "white",
    tagStrokeColor = "white",
    padding = 10,
    backgroundFill = "transparent",
  } = style;
  const {
    paddingLeft = style.paddingLeft || padding,
    paddingRight = style.paddingRight || padding,
    paddingTop = style.paddingTop || padding,
    paddingBottom = style.paddingBottom || padding,
  } = style;
  const pieColorRange = pieColorTheme 
    ? Object.keys(data).map((key) => pieColorTheme[key])
    : d3.schemeSet1;
  const tagColorRange = tagColorTheme
    ? Object.keys(data).map((key) => tagColorTheme[key])
    : pieColorRange;
  const strokeColorRange = strokeColorTheme
    ? Object.keys(data).map((key) => strokeColorTheme[key])
    : pieColorRange;
  const pieData = d3.entries(data);
  const total = pieData.reduce((acc, ele) => acc + ele.value, 0);
  const pieEntries = pieData.filter((d) => d.value !== 0);
  const pieColorInterpolator = d3.scaleOrdinal<string>()
    .domain(pieData.map((d) => d.key))
    .range(pieColorRange);
  const tagColorInterpolator = d3.scaleOrdinal<string>()
    .domain(pieData.map((d) => d.key))
    .range(tagColorRange);
  const strokeColorInterpolator = d3.scaleOrdinal<string>()
    .domain(pieData.map((d) => d.key))
    .range(strokeColorRange);
  const pieDesc = d3.pie<void, typeof pieEntries[number]>().value((d) => Number(d.value))(pieEntries);
  const arcGenerator = d3.arc<d3.PieArcDatum<typeof pieEntries[number]>>()
  .outerRadius(outerRadius)
  .padAngle(padAngle)
  .innerRadius(innerRadius)

  const Percentage = (props: {desc: typeof pieDesc[number]}) => percentVisible ? (
    <Fragment>
      <Text
        fontFamily="NotoSansKR-Bold"
        fontSize={tagSize * 0.8}
        stroke={tagStrokeColor}
        strokeWidth={3}
        dy={tagSize}
        textAnchor="middle"
      >
        {props.desc.data.value + ` (${prettyPercent(props.desc.data.value/total)}%)`}
      </Text>
      <Text
        fontFamily="NotoSansKR-Bold"
        fontSize={tagSize * 0.8}
        fill={tagColorInterpolator(props.desc.data.key)}
        dy={tagSize}
        textAnchor="middle"
      >
        {props.desc.data.value + ` (${prettyPercent(props.desc.data.value/total)}%)`}
      </Text>
    </Fragment>
  ) : <Fragment/>

  return (
    <Svg
      width={size + strokeWidth + paddingLeft + paddingRight}
      height={size + strokeWidth + paddingTop + paddingBottom}
    >
      <Rect
        width={size + strokeWidth + paddingLeft + paddingRight}
        height={size + strokeWidth + paddingTop + paddingBottom}
        fill={backgroundFill}
      />
      <G x={size/2 + strokeWidth / 2 + paddingLeft} y={size/2 + strokeWidth / 2 + paddingTop}>
        {pieDesc.map((desc, i) => {
          return (
            <Path
              key={`piePiece${i}`}
              d={arcGenerator(desc) || ""}
              stroke={strokeColorInterpolator(desc.data.key) || strokeColor}
              strokeWidth={strokeWidth}
              fill={pieColorInterpolator(desc.data.key)}
            />
          )
        })}
        {pieDesc.map((desc, i) => {
          const [x, y] = arcGenerator.centroid(desc);
          return (
            <G x={x} y={y} key={`pieTag${i}`}>
              <Text
                fontFamily="NotoSansKR-Bold"
                fontSize={tagSize}
                stroke={tagStrokeColor}
                strokeWidth={3}
                textAnchor="middle"
              >
                {desc.data.key}
              </Text>
              <Text
                fontFamily="NotoSansKR-Bold"
                fontSize={tagSize}
                textAnchor="middle"
                fill={tagColorInterpolator(desc.data.key)}
              >
                {desc.data.key}
              </Text>
              <Percentage desc={desc} />
            </G>
          )
        })}
      </G>
      <Defs>
        {defs}
      </Defs>
    </Svg>
  )
}

export default PieChart
