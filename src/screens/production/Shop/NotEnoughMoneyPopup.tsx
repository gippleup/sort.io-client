import React from 'react'
import { View, Text, Modal } from 'react-native'
import chroma from 'chroma-js'
import Flickery from '../../../components/Flickery'
import { RoundPaddingCenter, NotoSans } from '../../../components/Generic/StyledComponents'
import { CommonActions, useNavigation } from '@react-navigation/native'

const NotEnoughMoneyPopup = () => {
  const naviagtion = useNavigation();
  const flickerRef = React.createRef<Flickery>();
  React.useEffect(() => {
    flickerRef.current?.flickerNTimes(3);
    const timeout = setTimeout(() => {
      naviagtion.dispatch((state) => {
        const routes = state.routes.filter((route) => route.name !== "Popup_NotEnoughMoney");
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        })
      })  
    }, 1500);
    return () => {
      clearTimeout(timeout);
    }
  })
  return (
    <View style={{flex: 1, backgroundColor: chroma('red').alpha(0.5).hex(), justifyContent: 'center'}}>
      <Flickery ref={flickerRef}>
        <RoundPaddingCenter>
          <NotoSans type="Black" size={20}>골드가 부족합니다</NotoSans>
        </RoundPaddingCenter>
      </Flickery>
    </View>
  )
}

export default NotEnoughMoneyPopup;
