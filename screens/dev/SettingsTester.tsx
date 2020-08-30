import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { ScrollView } from 'react-native-gesture-handler';
import { FlexHorizontal } from '../../components/Generic/StyledComponents';
import Block from '../../components/Block';
import TopBase from '../../components/Block/TopBase';
import SpikyTop from '../../components/Block/Spiky/SpikyTop';
import PieceBase from '../../components/Block/PieceBase';
import SpikyPiece from '../../components/Block/Spiky/SpikyPiece';
import BottomBase from '../../components/Block/BottomBase';
import SpikyBottom from '../../components/Block/Spiky/SpikyBottom';

const SettingsTester = () => {
  const blockCount = 18;
  return (
    <ScrollView>
      {Array(blockCount).fill(1).map((_, i) => {
        return (
          <View key={i}>
            <Block base={TopBase} shape={SpikyTop} scale={1} type={i} />
            <Block base={PieceBase} shape={SpikyPiece} scale={1} type={i} />
            <Block base={BottomBase} shape={SpikyBottom} scale={1} type={i} />
          </View>
        )
      })}
    </ScrollView>
  )
}

export default SettingsTester
