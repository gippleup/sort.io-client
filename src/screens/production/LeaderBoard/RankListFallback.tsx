import React from 'react'
import { View, Text } from 'react-native'
import { getIcon } from '../../../api/icon'
import Block from '../../../components/Block'
import { NotoSans } from '../../../components/Generic/StyledComponents'

const RankListFallback = () => {
  return (
    <View style={{
      opacity: 0.5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      {getIcon("fontAwesome", "exclamation", {
        color: "black",
        size: 40,
      })}
      <Block
        type={50}
        scale={2}
        part="top"
        skin="basic"
      />
      <Block
        type={50}
        scale={2}
        part="piece"
        skin="basic"
      />
      <Block
        type={50}
        scale={2}
        part="bottom"
        skin="basic"
      />
      <NotoSans style={{marginTop: 10}} size={20}>
        데이터가 없습니다
      </NotoSans>
    </View>
  )
}

export default RankListFallback
