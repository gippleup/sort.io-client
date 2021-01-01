import React from 'react'
import { View, Text } from 'react-native'
import AnimatedNumber from '@components/AnimatedNumber'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FlexHorizontal, RoundPaddingCenter, NotoSans } from '@components/Generic/StyledComponents'

const AnimatedNumberTester = () => {
  const [number, setNumber] = React.useState(100);
  const renderAddButton = (amount: number) => (
    <TouchableOpacity onPress={() => requestAnimationFrame(() => {
      setNumber(number + amount)
    })}>
      <RoundPaddingCenter>
        <NotoSans type="Black">{amount}</NotoSans>
      </RoundPaddingCenter>
    </TouchableOpacity>
  )
  return (
    <View style={{flex: 1, backgroundColor: 'grey', alignItems: 'center'}}>
      <AnimatedNumber
        animationType="rain"
        style={{
          color: 'white',
          fontSize: 40,
          fontFamily: 'NotoSansKR-Black'
        }}
        value={number}
      />
      <FlexHorizontal style={{ justifyContent: 'space-around', width: '100%' }}>
        {renderAddButton(1234)}
        {renderAddButton(12345)}
        {renderAddButton(123456)}
        {renderAddButton(1234567)}
      </FlexHorizontal>
      <FlexHorizontal style={{ justifyContent: 'space-around', width: '100%' }}>
        {renderAddButton(-1234)}
        {renderAddButton(-12345)}
        {renderAddButton(-123456)}
        {renderAddButton(-1234567)}
      </FlexHorizontal>
    </View>
  )
}

export default AnimatedNumberTester
