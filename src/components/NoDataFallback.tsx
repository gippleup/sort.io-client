import React from 'react'
import { View, Text } from 'react-native'
import { getIcon } from '@api/icon'
import Block from '@components/Block'
import { NotoSans } from '@components/Generic/StyledComponents'

type NoDataFallBackProps = {
  text?: string;
}

const NoDataFallback = (props: NoDataFallBackProps) => {
  const {text = "NO DATA"} = props;
  return (
    <View style={{
      opacity: 0.5,
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
        {text}
      </NotoSans>
    </View>
  )
}

export default NoDataFallback
