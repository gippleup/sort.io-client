import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { FlexHorizontal, Space, NotoSans, Line } from '@components/Generic/StyledComponents'
import Profile from '@components/Profile'

const ResultContainer: typeof View = styled(View)`
  border-radius: 5px;
  border-width: 0.5px;
  padding: 10px;
  background-color: rgba(0,0,0,0.5);
`;

const InfoContainer: typeof View = styled(View)`
  flex-direction: row;
  margin-top: 5px;
  border-radius: 5px;
  border-width: 0.5px;
  padding: 5px;
  padding-left: 10px;
`;

const Fallback = () => {
  return (
    <ResultContainer>
      <FlexHorizontal>
        <Profile
          backgroundColor="white"
          iconColor={"grey"}
        />
        <Space width={5}/>
        <View>
          <FlexHorizontal>
            <NotoSans type="Bold">LOADING </NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans size={12} type="Light">LOADING</NotoSans>
          </FlexHorizontal>
        </View>
      </FlexHorizontal>
      <InfoContainer>
        <View>
          <NotoSans color="white" type="Thin">Scores</NotoSans>
          <NotoSans color="white" type="Thin">KBI</NotoSans>
        </View>
        <View>
          <FlexHorizontal>
            <Line height="50%" width={0.5} marginHorizontal={5} />
            <NotoSans color="white" type="Medium">LOADING </NotoSans>
            <NotoSans color="white" type="Thin">(LOADING)</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <Line height="50%" width={0.5} marginHorizontal={5} />
            <NotoSans color="white" type="Bold">LOADING</NotoSans>
          </FlexHorizontal>
        </View>
      </InfoContainer>
    </ResultContainer>
  )
}

export default Fallback
