import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { FlexHorizontal } from '../Generic/StyledComponents'
import MoneyIcon from './MoneyIcon'
import styled from 'styled-components'

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

const MoneyText: typeof TextInput = styled(TextInput)`
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
  const [prevValue, setPrevValue] = React.useState(props.value);
  React.useEffect(() => {
    if (props.value !== prevValue) {
      console.log('여기에서 돈 바뀌는 거 애니메이션으로 보여줘야 됨')
    }
  })
  return (
    <IndicatorShell>
      <View style={{marginLeft: 8}}>
        <MoneyIcon size={15} />
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 25, flex: 1}}>
        <MoneyText value={`${prevValue}`} />
      </View>
    </IndicatorShell>
  )
}

export default MoneyIndicator
