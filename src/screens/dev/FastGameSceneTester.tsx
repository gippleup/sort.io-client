import React from 'react'
import { View, Text } from 'react-native'
import generateMap from '../../algo/generateMap';
import FastGameScene from '../../components/FastGameScene'

const option = {
  blockStackCount: 21,
  colorCount: 18,
  maxScore: 20,
  stackLengthMax: 8,
  stackLengthMin: 2,
  shuffleCount: 100,
}

const map = generateMap(option);

const FastGameSceneTester = () => {
  return (
    <View style={{flex: 1}}>
      <FastGameScene
        map={map.question}
        maxScore={option.maxScore}
        mode="single"
        timeLimit={120}
        title="SINGLE"
      />
    </View>
  )
}

export default FastGameSceneTester
