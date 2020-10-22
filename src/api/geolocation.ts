import Geolocation, { GeolocationError, GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { getPermssion } from './permissions';

Geolocation.setRNConfiguration({
  authorizationLevel: "always",
  skipPermissionRequests: false
});

export const getPlayerLocation = async (): Promise<GeolocationResponse> => {
  let permitted = false;
  if (Platform.OS === "android") {
    permitted = await getPermssion(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
  } else if (Platform.OS === "ios") {
    permitted = await getPermssion(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }

  return new Promise((resolve, reject) => {
    if (permitted) {
      const onSuccess = (info: GeolocationResponse) => resolve(info);
      const onError = (err: GeolocationError) => reject(err);
      const option: GeolocationOptions = {
        timeout: 10000,
      }
      return Geolocation.getCurrentPosition(onSuccess, onError, option);
    } else {
      reject(null);
    }
  })
}