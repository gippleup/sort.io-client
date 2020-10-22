import React from 'react'
import { View } from 'react-native'
import { Svg, Text } from 'react-native-svg'

type LogoProps = {
  fontSize: number;
  strokeWidth?: number;
  strokeColor?: string;
  color?: string;
}

const Logo = (props: LogoProps) => {
  const {fontSize, strokeColor, strokeWidth, color} = props;
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <Svg width={fontSize * (230 / 60)} height={fontSize * (80 / 60)}>
        <Text
          fontFamily="NotoSansKR-Thin"
          alignmentBaseline="center"
          textAnchor="start"
          stroke={strokeColor || 'pink'}
          strokeWidth={strokeWidth ? strokeWidth * 2 : 0}
          x={fontSize * (27 / 60) - 2}
          y={0 + 2}
          fontSize={fontSize}>
            Sort.io
        </Text>
        <Text
          fontFamily="NotoSansKR-Thin"
          alignmentBaseline="center"
          textAnchor="start"
          x={fontSize * (27 / 60)}
          y={0}
          fill={color || "black"}
          fontSize={fontSize}>
            Sort.io
        </Text>
      </Svg>
    </View>
  )
}

export default Logo
