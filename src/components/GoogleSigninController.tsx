import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import usePlayData from '@hooks/usePlayData'
import { signInWithGoogle, signOutWithGoogle } from '@redux/actions/playData/thunk'
import { FlexHorizontal, NotoSans, Space } from './Generic/StyledComponents'
import LogoutModal from './GoogleSigninController/LogoutModal'
import GoogleSignInIndicator from './GoogleSignInIndicator'

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
  const [modalVisible, setModalVisibility] = React.useState(false);

  const signIn = () => dispatch(signInWithGoogle());
  const signOut = () => dispatch(signOutWithGoogle());

  const isSignedIn = (() => {
    if (user && user.googleId) {
      return true;
    } else {
      return false;
    }
  })();

  const onPress = () => {
    if (isSignedIn) {
      setModalVisibility(true);
    } else {
      signIn();
    }
  }

  const onSignOut = () => {
    signOut();
    setModalVisibility(false);
  }

  const closeModal = () => {
    setModalVisibility(false);
  }

  const statusText = isSignedIn ? "IN" : "OUT";

  return (
    <View onStartShouldSetResponderCapture={() => false}>
      <View style={{alignItems: 'center'}}>
        <IconContainer>
          <GoogleSignInIndicator isSignedIn={isSignedIn} onPress={onPress} size={40} />
        </IconContainer>
        <FlexHorizontal>
          <NotoSans color="white" size={12} type="Thin">
            Logged
          </NotoSans>
          <Space width={5} />
          <NotoSans color="white" size={12} type="Medium">
            {statusText}
          </NotoSans>
        </FlexHorizontal>
      </View>
      <LogoutModal
        onPressYes={onSignOut}
        onPressNo={closeModal}
        visible={modalVisible}
      />
    </View>
  )
}

export default GoogleSigninController
