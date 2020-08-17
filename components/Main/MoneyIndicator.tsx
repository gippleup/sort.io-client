import React from 'react'
import { View, Text } from 'react-native'
import { FlexHorizontal } from '../Generic/StyledComponents'
import MoneyIcon from './MoneyIcon'
import styled from 'styled-components'

const IndicatorShell = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: dodgerblue;
  border-color: rgba(255,255,255,0.7);
  border-width: 2px;
  width: 160px;
  border-radius: 50px;
  flex-direction: row;
`;

const MoneyText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Black;
  color: gold;
  margin-left: 5px;
  font-size: 15px;
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
        <MoneyText>
          {props.value}
        </MoneyText>
      </View>
    </IndicatorShell>
  )
}

export default MoneyIndicator