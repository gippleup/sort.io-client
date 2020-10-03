import React from 'react'
import { View, Text } from 'react-native'
import Block from '../../components/Block'
import { skins } from '../../components/Block/skinMap'

const ColorTester = () => {
  const skin: skins = "horizon"
  return (
    <View>
      <Block
        skin={skin}
        part="top"
        type={0}
        scale={1}
      />
      {Array(24).fill(1).map((_, i) => {
        return (
          <Block
            key={i}
            part="piece"
            skin={skin}
            type={i}
            scale={1}
          />
        )
      })}
      <Block
        skin={skin}
        part="bottom"
        type={23}
        scale={1}
      />
    </View>
  )
}

export default ColorTester
