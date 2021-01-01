import React from 'react'
import { View, Text } from 'react-native'
import { Space, NotoSans } from '@components/Generic/StyledComponents'
import MoneyIcon from '@components/Main/MoneyIcon'
import { PriceTagContainer } from './ItemBox/_StyledComponent'

type PriceTagProps = {
  value: number;
}

const PriceTag = (props: PriceTagProps) => {
  const {value} = props;
  return (
    <PriceTagContainer>
      <MoneyIcon size={8} />
      <Space width={5} />
      <NotoSans color="white" type="Black" size={12}>{value}</NotoSans>
    </PriceTagContainer>
  )
}

export default PriceTag
