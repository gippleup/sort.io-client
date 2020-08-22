import React, { Fragment } from 'react'
import { View } from 'react-native'
import {Svg, Path, Rect, G, Line, Defs, LinearGradient, Stop, Text, Circle} from 'react-native-svg';
import * as d3 from 'd3';

type GraphProps = {
  data: any[];
  yExtractor: (entry: any, i: number) => number;
  xExtractor: (entry: any, i: number) => number;
  xAxisMapper: (entry: any, i: number) => number | string;
  yAxisMapper: (entry: any, i: number) => number | string;
  width: number;
  height: number;
}

const lineGenerator = (data: [number, number][]): string => {
  if (!data.length) {
    return '';
  }
  const yMax = data.map((entry) => entry[1]).reduce((acc, ele) => acc < ele ? ele : acc);
  const result = d3.line()
    .curve(d3.curveCardinal)
    .x(d => d[0])
    .y(d => yMax - d[1]);
  return result(data) || '';
}

const Graph = (props: GraphProps) => {
  const {data, xExtractor, yExtractor, width, height, xAxisMapper, yAxisMapper} = props;
  const points: [number, number][] = data
    .map((entry, i) => [xExtractor(entry, i), yExtractor(entry, i)]);
  if (data.length === 0) return <></>;
  const yMax = points.map((entry) => entry[1]).reduce((acc, ele) => acc < ele ? ele : acc);
  const yMin = points.map((entry) => entry[1]).reduce((acc, ele) => acc < ele ? acc : ele);
  const xMax = points.map((entry) => entry[0]).reduce((acc, ele) => acc < ele ? ele : acc);
  const xMin = points.map((entry) => entry[0]).reduce((acc, ele) => acc < ele ? acc : ele);
  const path = lineGenerator(points);
  return (
    <Svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <Rect x={20} y={20} width={width - 40} height={height - 40} fill="url(#backgroundGrad)" />
      <G x="20" y="60" scaleX={(width - 40) / (xMax - xMin)} scaleY={(height - 80) / (yMax - yMin)}>
        <Path d={path + `L ${xMax} ${yMax - 100} z`} stroke="url(#grad)" fill="url(#grad)" />
      </G>
      <G x="20" y="20">
        <Line x1="0" y1="0" x2="0" y2={height - 40} stroke="black" />
        <Line x1="0" y1={height - 40} x2={width - 40} y2={height - 40} stroke="black" />
      </G>
      <G x="20" y="60" scaleX={(width - 40) / (xMax - xMin)} scaleY={(height - 80) / (yMax - yMin)}>
        {points.map((point, i) => {
          const x = point[0];
          const y = yMax - point[1];
          return (
            <Fragment key={i}>
              <Circle cx={x} cy={y} r="3" fill="black" stroke="white" />
              <Text
                x={x}
                y={y - 10}
                fontSize="15"
                strokeWidth="3"
                fill="black"
                stroke="white"
                fontFamily="NotoSansKR-Black"
                textAnchor="middle"
              >{yAxisMapper(data[i], i)}</Text>
              <Text
                x={x}
                y={y - 10}
                fontSize="15"
                strokeWidth="0"
                fill="black"
                stroke="white"
                fontFamily="NotoSansKR-Black"
                textAnchor="middle"
              >{yAxisMapper(data[i], i)}</Text>
              <Text
                vectorEffect="none"
                x={x}
                y={yMax - 80}
                fontSize="15"
                fill="grey"
                fontFamily="NotoSansKR-Black"
                textAnchor="middle"
              >{xAxisMapper(data[i], i)}</Text>
            </Fragment>
          )
        })}
      </G>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor="red" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="backgroundGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="white" stopOpacity="1" />
          <Stop offset="1" stopColor="pink" stopOpacity="1" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default Graph
