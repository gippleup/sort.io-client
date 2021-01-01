import React from 'react'
import { View } from 'react-native'
import StarIcon from '@assets/star.svg'
import { FlexHorizontal } from '@components/Generic/StyledComponents'

type MoneyIconProps = {
  size: number;
}

const MoneyIcon: React.FC<MoneyIconProps> = (props) => {
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

MoneyIcon.defaultProps = {
  size: 20,
}

export default MoneyIcon
