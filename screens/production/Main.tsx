import React from 'react'
import { View, Dimensions } from 'react-native'
import Logo from '../../components/Logo'
import VolumeControl from '../../components/Main/VolumeControl'
import MoneyIndicator from '../../components/Main/MoneyIndicator'
import MainButton from '../../components/Main/MainButton'
import PatternBackground from '../../components/GameScene/PatternBackground'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
const backgroundImage = require('../../assets/BackgroundPattern.png');

const ButtonIcon: typeof Icon = styled(Icon)`
  position: absolute;
  left: 20px;
  font-size: 30px;
`;

const Main = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
      <View style={{position: 'absolute', left: 10, top: 10}}>
        <VolumeControl/>
      </View>
      <View style={{ position: 'absolute', right: 10, top: 10 }}>
        <MoneyIndicator value={10000000} />
      </View>
      <View style={{alignItems: 'center', marginTop: 120, marginBottom: 40}}>
        <Logo fontSize={60} strokeWidth={2} color="white" strokeColor="rgba(0,0,0,0.2)" />
      </View>
      <View style={{alignItems: 'center'}}>
        <MainButton
          preComponent={<ButtonIcon name="gamepad" color="tomato" />}
          text="싱글 플레이"
          onPress={() => { }}
        />
        <MainButton
          preComponent={<ButtonIcon name="users" color="mediumseagreen" />}
          text="멀티 플레이"
          onPress={() => { }}
        />
        <MainButton
          preComponent={<ButtonIcon name="shopping-basket" color="cornflowerblue" />}
          text="상점"
          onPress={() => { }}
        />
        <MainButton
          preComponent={<ButtonIcon name="trophy" color="goldenrod" />}
          text="리더보드"
          onPress={() => { }}
        />
      </View>
    </View>
  )
}

export default Main
