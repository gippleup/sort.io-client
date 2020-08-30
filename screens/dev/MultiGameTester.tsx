import React from 'react'
import { View, Text } from 'react-native'
import MultiGame from '../../components/MutiGame';

const option = {
  blockStackCount: 10,
  colorCount: 5,
  maxScore: 8,
  stackLengthMax: 8,
  stackLengthMin: 2,
  shuffleCount: 100,
}

const MultiGameTester = () => {
  return (
    <View style={{flex: 1}}>
      <MultiGame mapOption={option} />
    </View>
  )
}

export default MultiGameTester
