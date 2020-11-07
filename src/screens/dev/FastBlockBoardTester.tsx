import chroma from 'chroma-js';
import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styled from 'styled-components';
import generateMap from '../../algo/generateMap';
import FastBlockBoard from '../../components/FastBlockBoard'

const option = {
  blockStackCount: 21,
  colorCount: 18,
  maxScore: 20,
  stackLengthMax: 8,
  stackLengthMin: 2,
  shuffleCount: 100,
}

const map = generateMap(option);

const FastBlockBoardTester = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
      <View style={{backgroundColor: 'grey'}}>
        <FastBlockBoard
          initialMap={map.question}
          height={Dimensions.get('window').height - 200}
          width={Dimensions.get('window').width - 100}
          skin="basic"
        />
      </View>
    </View>
  )
}

export default FastBlockBoardTester
