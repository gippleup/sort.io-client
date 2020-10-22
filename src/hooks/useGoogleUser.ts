import { GoogleSignin, User } from '@react-native-community/google-signin'
import React from 'react';

let userInfo: User | null = null;

export const useGoogleUser = () => {
  React.useEffect(() => {
    GoogleSignin.getCurrentUser()
    .then((user) => {
      if (!userInfo) {
        userInfo = user;       
      } else if (JSON.stringify(userInfo) !== JSON.stringify(user)) {
        userInfo = user;
      }
    })
  })

  return userInfo;
}