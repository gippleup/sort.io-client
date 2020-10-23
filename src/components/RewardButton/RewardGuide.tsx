import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { NotoSans } from '../Generic/StyledComponents'

const TextContainer: typeof View = styled(View)`
  background-color: darkgoldenrod;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border-width: 1px;
`;

const RewardGuide = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TextContainer>
        <NotoSans color="white" type="Thin">
          10% 확률로 광고가 나타납니다.
        </NotoSans>
      </TextContainer>
    </View>
  )
}

export default RewardGuide
