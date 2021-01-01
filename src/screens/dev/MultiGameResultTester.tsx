import React from 'react'
import { View, Text } from 'react-native'
import { Space } from '@components/Generic/StyledComponents'
import MultiGameResult from '@components/MultiGameResult'

const MultiGameResultTester = () => {
  return (
    <View style={{padding: 20}}>
      <MultiGameResult userId={127} />
      <Space height={10} />
      <MultiGameResult isMine userId={62} />
    </View>
  )
}

export default MultiGameResultTester
