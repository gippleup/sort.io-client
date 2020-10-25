import React from 'react'
import { View, Text } from 'react-native'
import Block from '../../components/Block'
import { blockTypeCount } from '../../components/Block/Colors'
import { SupportedSkin } from '../../components/Block/skinMap'

const ColorTester = () => {
  const skin: SupportedSkin = "basic"
  const hasGradient = false;
  const length = blockTypeCount;
  return (
    <View>
      <Block
        skin={skin}
        part="top"
        type={0}
        scale={1}
        noGradient={!hasGradient}
        />
      {Array(length).fill(1).map((_, i) => {
        return (
          <Block
            key={i}
            part="piece"
            skin={skin}
            type={i}
            scale={1}
            noGradient={!hasGradient}
          />
        )
      })}
      <Block
        skin={skin}
        part="bottom"
        type={length - 1}
        scale={1}
        noGradient={!hasGradient}
        />
    </View>
  )
}

export default ColorTester
