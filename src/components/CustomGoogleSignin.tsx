import React, { Component } from 'react'
import {GoogleSignin as GoogleSigninModule, statusCodes, User} from '@react-native-community/google-signin'
import GoogleIcon from './GoogleSignIn/GoogleIcon'
import { NotoSans, FlexHorizontal, Space } from './Generic/StyledComponents'
import { View, Modal, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

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

GoogleSigninModule.configure({
  webClientId: '124695122817-a0rpoq7c79o10jef4hk8aphsq9a1ru5s.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
})

type CustomGoogleSignInProps = {
  onSignIn?: (user: User) => any;
  onSignOut?: () => any;
  size?: number;
}

type CustomGoogleSignInState = {
  userInfo: null | User;
  isSignedIn: boolean;
  modalVisible: boolean;
}

class CustomGoogleSignin extends Component<CustomGoogleSignInProps, CustomGoogleSignInState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userInfo: null,
      isSignedIn: false,
      modalVisible: false,
    }
    this._checkIfSignedIn = this._checkIfSignedIn.bind(this);
    this._signInIfNotSignedIn = this._signInIfNotSignedIn.bind(this);
    this._checkIfSignedIn((signedIn) => {
      this.setState({
        ...this.state,
        isSignedIn: signedIn,
      })
    })
  }
  _signIn = async () => {
    const {props} = this;
    try {
      await GoogleSigninModule.hasPlayServices()
      const userInfo = await GoogleSigninModule.signIn()
      this.setState({...this.state, userInfo, isSignedIn: true});
      if (props.onSignIn) props.onSignIn(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  componentDidUpdate() {
  }
  _checkIfSignedIn = async (callback?: (signedIn: boolean) => void) => {
    const isSignedIn = await GoogleSigninModule.isSignedIn();
    if (callback) {
      callback(isSignedIn);
    }
  }
  _signInIfNotSignedIn() {
    this._checkIfSignedIn((signedIn) => {
      if (!signedIn) {
        this._signIn();
      }
    });
  }
  _signOut = async () => {
    try {
      await GoogleSigninModule.hasPlayServices();
      await GoogleSigninModule.signOut();
      this.setState({isSignedIn: false, userInfo: null, modalVisible: false})
      if (this.props.onSignOut) this.props.onSignOut();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {state, props} = this;
    const setModalVisible = (bool: boolean) => {
      this.setState({
        ...state,
        modalVisible: bool,
      })
    }
    const onPress = () => {
      if (!state.isSignedIn) {
        this._signIn();
      } else {
        setModalVisible(true);
      }
    }
    return (
      <>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={onPress}>
          <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            <GoogleIcon size={props.size} active={state.isSignedIn} />
          </View>
        </TouchableOpacity>
        <Modal transparent visible={state.modalVisible}>
          <PopupContainer>
            <PopupMessageContainer>
              <NotoSans size={20} type="Black">로그아웃 하시겠습니까?</NotoSans>
            </PopupMessageContainer>
            <Space height={10} />
            <FlexHorizontal style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={this._signOut}>
                <PopupButton tomato>
                  <NotoSans size={16} style={{ color: 'white' }} type="Black">예</NotoSans>
                </PopupButton>
              </TouchableOpacity>
              <Space width={10} />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <PopupButton>
                  <NotoSans size={16} type="Black">아니요</NotoSans>
                </PopupButton>
              </TouchableOpacity>
            </FlexHorizontal>
          </PopupContainer>
        </Modal>
      </>
    )
  }
}

export default CustomGoogleSignin
