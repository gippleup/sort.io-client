import React from 'react'
import { View, Text } from 'react-native'

type BlockBaseProps = {
  scale?: number;
  width: number;
  height: number;
}

const BlockBase: React.FC<BlockBaseProps> = (props) => {
  const {height, width, scale = 1} = props;
  return (
    <View style={{width: width * scale, height: height * scale}}/>
  )
}

export default BlockBase
