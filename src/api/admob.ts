import admob, { InterstitialAd, MaxAdContentRating, RewardedAd, TestIds } from '@react-native-firebase/admob';
import BuildConfig from 'react-native-config';

const {BUILD_ENV} = BuildConfig;

export const adUnitId = {
  banner: BUILD_ENV === "RELEASE" ? "ca-app-pub-1726878540330527/3652806997" : TestIds.BANNER,
  interstitial: BUILD_ENV === "RELEASE" ? "ca-app-pub-1726878540330527/7400480312" : TestIds.INTERSTITIAL,
  rewarded: BUILD_ENV === "RELEASE" ? "ca-app-pub-1726878540330527/1581355031" : TestIds.REWARDED,
}

admob()
  .setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.G,
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    console.log('configred successfully')
  })


export const getInterstial = () => {
  const interstial = InterstitialAd.createForAdRequest(adUnitId.interstitial);
  // const unsubscribe = interstial.onAdEvent((type) => {
  //   if (type === "loaded") {
  //     interstial.show();
  //     unsubscribe();
  //   }
  // })
  // interstial.load();
  return interstial;
}

export const getRewarded = () => {
  const rewarded = RewardedAd.createForAdRequest(adUnitId.rewarded);
  // const unsubscribe = rewarded.onAdEvent((type) => {
  //   if (type === "rewarded_loaded") {
  //     rewarded.show();
  //     unsubscribe();
  //   }
  // })
  // rewarded.load();
  return rewarded;
}
