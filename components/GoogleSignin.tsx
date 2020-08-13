import React, { Component } from 'react'
import {GoogleSignin as GoogleSigninModule, statusCodes} from '@react-native-community/google-signin'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GoogleIcon from './GoogleSignIn/GoogleIcon'

GoogleSigninModule.configure({
  webClientId: '139458839925-bqm86mnndgcd2d3e47b5i3ljplovff57.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
})

type GoogleSignInState = {
  userInfo: null | any;
  isSignedIn: boolean;
}

export class GoogleSignin extends Component<any, GoogleSignInState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userInfo: null,
      isSignedIn: false,
    }
    this._checkIfSignedIn = this._checkIfSignedIn.bind(this);
    this._signInIfNotSignedIn = this._signInIfNotSignedIn.bind(this);
  }
  _signIn = async () => {
    try {
      await GoogleSigninModule.hasPlayServices()
      const userInfo = await GoogleSigninModule.signIn()
      this.setState({userInfo, isSignedIn: true})
      console.log(userInfo);
    } catch (error) {
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
  componentDidMount() {
    this._getSignedInUserInfo();
    this._signInIfNotSignedIn();
  }
  componentDidUpdate() {
  }
  _checkIfSignedIn = async (callback: (signedIn: boolean) => void) => {
    const isSignedIn = await GoogleSigninModule.isSignedIn();
    callback(isSignedIn);
  }
  _getSignedInUserInfo = async () => {
    const userInfo = await GoogleSigninModule.getCurrentUser();
    return userInfo;
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
      this.setState({isSignedIn: false})
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={this.state.isSignedIn ? this._signOut : this._signIn}>
        <GoogleIcon/>
      </TouchableOpacity>
    )
  }
}

export default GoogleSignin
