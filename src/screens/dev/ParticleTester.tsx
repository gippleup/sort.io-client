import React from 'react'
import { View, Text } from 'react-native'
import Particles from '../../components/Particles'
import styled from 'styled-components'

const DummyParticle: typeof View = styled(View)`
  width: 20px;
  height: 20px;
  /* background-color: red; */
`;

const ParticleTester = () => {
  return (
    <View style={{backgroundColor: 'lightgrey', flex: 1}}>
      <Particles particle={DummyParticle} />
    </View>
  )
}

export default ParticleTester
