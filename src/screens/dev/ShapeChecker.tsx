import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import skinMap, { SupportedSkin } from '../../components/Block/skinMap'
import RefBlockBoard from '../../components/NativeRefBlockBoard'

const ShapeChecker = () => {
  return (
    <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
      {Object.keys(skinMap).map((skin) => {
        return (
          <View key={skin} style={{backgroundColor: "royalblue"}}>
            <Text>{skin}</Text>
            <RefBlockBoard
              onComplete={undefined}
              skin={skin as SupportedSkin}
              initialMap={[[1,1,1,-1,-1]]}
              width={80}
              height={200}
            />
          </View>
        )
      })}
    </ScrollView>
  )
}

export default ShapeChecker
