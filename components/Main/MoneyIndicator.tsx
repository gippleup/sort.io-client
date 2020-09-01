import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { FlexHorizontal } from '../Generic/StyledComponents'
import MoneyIcon from './MoneyIcon'
import styled from 'styled-components'
import AnimatedNumber from '../AnimatedNumber'

const IndicatorShell = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.2);
  border-color: rgba(255,255,255,0.5);
  border-width: 2px;
  width: 160px;
  border-radius: 50px;
  flex-direction: row;
`;

const MoneyText: typeof AnimatedNumber = styled(AnimatedNumber)`
  font-family: NotoSansKR-Black;
  color: gold;
  margin-left: 5px;
  font-size: 15px;
  padding: 0;
`;

type MoneyIndicatorProps = {
  value: number;
}

const MoneyIndicator = (props: MoneyIndicatorProps) => {
  return (
    <IndicatorShell>
      <View style={{marginLeft: 8}}>
        <MoneyIcon size={15} />
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 25, flex: 1}}>
        <MoneyText value={props.value} animationType="rain" />
      </View>
    </IndicatorShell>
  )
}

export default MoneyIndicator
