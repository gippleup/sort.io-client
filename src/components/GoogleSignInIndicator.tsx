import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import translation from '../Language/ko/screens/Main'
import { NotoSans, Space, FlexHorizontal } from './Generic/StyledComponents'
import GoogleIcon from './GoogleSignInIndicator/GoogleIcon'

const PopupContainer = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
`;

const PopupMessageContainer = styled(View)`
  padding: 25px;
  align-self: center;
  background-color: white;
  border-radius: 20px;
  elevation: 10;
`;

const PopupButton: typeof View | React.FC<{tomato?: boolean}> = styled(View)<{tomato: boolean}>`
  padding: 15px;
  background-color: ${(props) => props.tomato ? 'tomato' : 'lightgrey'};
  border-radius: 15px;
  width: 100px;
  align-items: center;
`;

type GoogleSignInIndicatorProps = {
  onPress?: Function;
  size?: number;
  isSignedIn?: boolean;
}

const GoogleSignInIndicator = (props: GoogleSignInIndicatorProps) => {
  const {isSignedIn, size} = props;

  const onPress = () => {
    if (props.onPress) props.onPress();
  }

  return (
    <TouchableOpacity style={{alignSelf: 'center'}} onPress={onPress}>
      <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
        <GoogleIcon size={size} active={isSignedIn} />
      </View>
    </TouchableOpacity>
  )
}

export default GoogleSignInIndicator
