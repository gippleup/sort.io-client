import { Platform } from 'react-native';
import Permissions, {AndroidPermission, IOSPermission} from 'react-native-permissions';

const {
  PERMISSIONS,
  RESULTS,
  check,
  checkMultiple,
  checkNotifications,
  openSettings,
  request,
  requestMultiple,
  requestNotifications
} = Permissions;

export const getPermssion = async (
  targetPermission: AndroidPermission | IOSPermission
) => {
  try {
    const alreadyPermitted = (await check(targetPermission)) === RESULTS.GRANTED;
    if (alreadyPermitted) {
      return true;
    } else {
      const permitted = (await request(targetPermission)) === RESULTS.GRANTED;
      return permitted;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}