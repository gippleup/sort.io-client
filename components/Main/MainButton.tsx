import React from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import styled from 'styled-components'
import { FlexHorizontal } from '../../components/Generic/StyledComponents'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler'

const MainButtonText = styled(Text)`
  font-family: NotoSansKR-Bold;
  font-size: 20px;
  color: slateblue;
`;

const MainButtonShell: typeof View = styled(View)`
  min-width: 260px;
  border-color: rgba(0,0,0,0.2);
  border-width: 2px;
  border-radius: 10px;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const MainButtonContainer: typeof TouchableHighlight = styled(TouchableHighlight)`
  margin-bottom: 15px;
  border-radius: 15px;
`;

type MainButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
  text: string;
  preComponent?: React.ReactNode;
  postComponent?: React.ReactNode;
}

const MainButton = (props: MainButtonProps) => {
  return (
    <MainButtonContainer underlayColor="blue" onPress={props.onPress}>
      <FlexHorizontal>
        <MainButtonShell style={props.style}>
          {props.preComponent}
          <MainButtonText>
            {props.text}
          </MainButtonText>
          {props.postComponent}
        </MainButtonShell>
      </FlexHorizontal>
    </MainButtonContainer>
  )
}

export default MainButton
