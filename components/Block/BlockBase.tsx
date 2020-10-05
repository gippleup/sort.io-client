import React from 'react'
import { View, Text } from 'react-native'

type BlockBaseProps = {
  scale?: number;
  width: number;
  height: number;
  color?: string;
  borderWidth?: number;
}

const BlockBase: React.FC<BlockBaseProps> = (props) => {
  const {height, width, scale = 1, color, borderWidth} = props;
  return (
    <View
      style={{
        width: width * scale,
        height: height * scale,
        backgroundColor: color,
        borderWidth
      }}
    />
  )
}

export default BlockBase
