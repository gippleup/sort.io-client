import React from 'react'
import { View } from 'react-native'
import StarIcon from '../../assets/star.svg'
import { FlexHorizontal } from '../Generic/StyledComponents'

type MoneyIconProps = {
  size: number;
}

const MoneyIcon = (props: MoneyIconProps) => {
  const {size} = props;
  return (
    <FlexHorizontal>
      <View style={{
        backgroundColor: 'goldenrod',
        borderRadius: 30,
        borderWidth: (4 / 20) * size,
        borderColor: 'gold',
        width: size * 2,
        height: size * 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <StarIcon width={size} height={size} />
      </View>
    </FlexHorizontal>
  )
}

export default MoneyIcon
