import React from 'react'
import { View, Text } from 'react-native'
import { StackHeaderProps } from '@react-navigation/stack'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MoneyIndicator from '../../../components/Main/MoneyIndicator'
import { FlexHorizontal } from '../../../components/Generic/StyledComponents'
import { useNavigation } from '@react-navigation/native'
import usePlayData from '../../../hooks/usePlayData'

const HeaderContainer = styled(View)`
  background-color: rgba(255,255,255,0.2);
  width: 100%;
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
`;

const NavigationButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: 15px;
  padding-horizontal: 20px;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: NotoSansKR-Bold;
  font-size: 20px;
`;

const SelectStageHeader = () => {
 const navigation = useNavigation();
const playData = usePlayData();
  return (
    <HeaderContainer>
      <FlexHorizontal>
        <NavigationButton onPress={navigation.goBack}>
          <Icon name="arrow-left" color="white" size={20} />
        </NavigationButton>
        <HeaderText>싱글 플레이</HeaderText>
      </FlexHorizontal>
      <MoneyIndicator value={playData.loaded ? playData?.user.gold : 0} />
    </HeaderContainer>
  )
}

export default SelectStageHeader
