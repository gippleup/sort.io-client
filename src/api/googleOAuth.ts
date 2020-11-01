import { GoogleSignin, statusCodes, User } from "@react-native-community/google-signin";

GoogleSignin.configure({
  webClientId: '124695122817-a0rpoq7c79o10jef4hk8aphsq9a1ru5s.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
})

export const googleSignIn = async (): Promise<User | undefined> => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
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

export const googleSignOut = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }
}

export const getLoggedUser = async () => {
  const user = await GoogleSignin.getCurrentUser()
  return user;
}