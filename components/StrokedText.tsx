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
}

const StrokedText = (props: StrokedTextProps) => {
  return (
    <View style={{backgroundColor: props.test ? 'white' : 'transparent'}}>
      <Svg width={props.width} height={props.height}>
        <Text
          fill="none"
          stroke={props.strokeColor}
          fontFamily={props.fontFamily}
          fontSize={props.fontSize} x="50%" y={props.height / 2}
          dy={props.fontSize * props.dyMultiplier}
          strokeWidth={props.strokeWidth}
          strokeLinejoin="round"
          textAnchor="middle"
        >
          {props.text}
        </Text>
        <Text
          fill={props.fillColor}
          fontFamily={props.fontFamily}
          fontSize={props.fontSize} x="50%" y={props.height / 2}
          dy={props.fontSize * props.dyMultiplier}
          textAnchor="middle"
        >
          {props.text}
        </Text>
      </Svg>
    </View>
  )
}

export default StrokedText
