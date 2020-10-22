import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Block from '../../components/Block';

const SettingsTester = () => {
  const blockCount = 18;
  return (
    <ScrollView>
      {Array(blockCount).fill(1).map((_, i) => {
        return (
          <View key={i}>
            <Block skin="basic" part="top" scale={1} type={i} />
            <Block skin="basic" part="piece" scale={1} type={i} />
            <Block skin="basic" part="bottom" scale={1} type={i} />
          </View>
        )
      })}
    </ScrollView>
  )
}

export default SettingsTester
