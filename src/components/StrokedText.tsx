import React from 'react'
import {Svg, Text} from 'react-native-svg'
import { View } from 'react-native'

type StrokedTextProps = {
  strokeColor: string;
  fillColor: string;
  fontSize: number;
  fontFamily: string;
  strokeWidth: number;
  text: string;
  width: number;
  height: number;
  test?: boolean;
  dyMultiplier: number;
  strokeOffsetX?: number;
  strokeOffsetY?: number;
}

const StrokedText: React.FC<StrokedTextProps> = (props) => {
  const {
    dyMultiplier,
    fillColor,
    fontFamily,
    fontSize,
    height,
    strokeColor,
    strokeWidth,
    text,
    width,
    children,
    strokeOffsetX = 0,
    strokeOffsetY = 0,
    test,
  } = props;
  return (
    <View style={{backgroundColor: test ? 'white' : 'transparent'}}>
      <Svg width={width} height={height}>
        <Text
          fill="none"
          stroke={strokeColor}
          fontFamily={fontFamily}
          fontSize={fontSize} x="50%" y={height / 2}
          dy={fontSize * dyMultiplier + strokeOffsetY}
          dx={strokeOffsetX}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          textAnchor="middle"
        >
          {text || children}
        </Text>
        <Text
          fill={fillColor}
          fontFamily={fontFamily}
          fontSize={fontSize} x="50%" y={height / 2}
          dy={fontSize * dyMultiplier}
          textAnchor="middle"
        >
          {text}
        </Text>
      </Svg>
    </View>
  )
}

export default StrokedText
