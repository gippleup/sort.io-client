import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import usePlayData from '../hooks/usePlayData'
import { signInWithGoogle, signOutWithGoogle } from '../redux/actions/playData/thunk'
import CustomGoogleSignin from './CustomGoogleSignin'
import { FlexHorizontal, NotoSans, Space } from './Generic/StyledComponents'

const IconContainer: typeof View = styled(View)`
  width: 50px;
  height: 50px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const GoogleSigninController = () => {
  const playData = usePlayData();
  const {user} = playData;
  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(signInWithGoogle());
  }

  const onSignOut = () => {
    dispatch(signOutWithGoogle());
  }

  return (
    <View style={{alignItems: 'center'}}>
      <IconContainer>
        <CustomGoogleSignin onSignOut={onSignOut} onSignIn={onSignIn} size={40} />
      </IconContainer>
      <FlexHorizontal>
        <NotoSans type="Thin">
          Logged
        </NotoSans>
        <Space width={5} />
        <NotoSans type="Medium">
          {user.googleId ? 'IN' : 'OUT'}
        </NotoSans>
      </FlexHorizontal>
    </View>
  )
}

export default GoogleSigninController
