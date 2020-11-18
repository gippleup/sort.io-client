import React from 'react'
import { View, Text } from 'react-native'
import { getIcon } from '../api/icon'
import useGlobal from '../hooks/useGlobal'
import TranslationPack from '../Language/translation'
import Block from './Block'
import { NotoSans } from './Generic/StyledComponents'

type NoDataFallBackProps = {
  text?: string;
}

const NoDataFallback = (props: NoDataFallBackProps) => {
  const {text = "NO DATA"} = props;
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
        {text}
      </NotoSans>
    </View>
  )
}

export default NoDataFallback
