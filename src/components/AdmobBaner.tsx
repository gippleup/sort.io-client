import React from 'react'
import { View, Text } from 'react-native'
import { InterstitialAd, RewardedAd, BannerAd, TestIds } from '@react-native-firebase/admob';
import { adUnitId } from '../api/admob';

type AdmobBannerProps = {
  availableSpace?: {
    width: number;
    height: number;
  };
}

const AdmobBanner = (props: AdmobBannerProps) => {
  const {availableSpace} = props;

  if (!availableSpace) return <></>;
  const roundedWidth = Math.round(availableSpace.width);
  const roundedHeight = Math.round(availableSpace.height);
  
  return (
    <View>
      <BannerAd        
        onAdClosed={()=>{}}
        onAdFailedToLoad={() => {}}
        onAdLeftApplication={() => {}}
        onAdLoaded={() => {}}
        onAdOpened={() => {}}
        size={`${roundedWidth}x${roundedHeight}`}
        unitId={adUnitId.banner}
      />
    </View>
  )
}

export default AdmobBanner
