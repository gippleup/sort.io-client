import { FirebaseAdMobTypes, InterstitialAd } from '@react-native-firebase/admob'
import React, { MutableRefObject, RefObject } from 'react'
import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getInterstial, getRewarded } from '@api/admob'
import { getIcon } from '@api/icon'
import useGlobal from '@hooks/useGlobal'
import TranslationPack from '@Language/translation'
import { depositGold } from '@redux/actions/playData/thunk'
import DynamicText from '@components/DynamicText'
import { FlexHorizontal, Space } from '@components/Generic/StyledComponents'
import { testLuck } from '@components/Generic/utils'
import RewardGuide from '@components/RewardButton/RewardGuide'
import StrokedNotoSans from '@components/StokedNotoSans'

const rewardAmount = {
  interstitial: 200,
  rewarded: 1000,
};

type RewardButtonProps = {
  disappearOnFulfilled?: boolean;
  chance?: number;
}

const MoneyIconContainer: typeof View = styled(View)`
  background-color: goldenrod;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-width: 5px;
  border-color: yellow;
`;

const RewardButton = (props: RewardButtonProps) => {
  const {disappearOnFulfilled, chance = 1} = props;
  const hasGoodLuck = testLuck(chance);
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;
  const [display, setDisplay] = React.useState<"flex" | "none" | undefined>("flex");
  const dispatch = useDispatch();
  const interstitialRef = React.useRef<FirebaseAdMobTypes.InterstitialAd | null>(null);
  const rewardedRef = React.useRef<FirebaseAdMobTypes.RewardedAd | null>(null);
  const textRef = React.useRef<DynamicText>(null);
  const [_, reset] = React.useState(false);

  const setText = (text: string | number) => {
    textRef.current?.setText(String(text) + translation.getGold);
  }

  const setupAd = (adType: "rewarded" | "interstitial", fallback?: Function) => {
    const ad = adType === "rewarded" ? rewardedRef : interstitialRef;
    const compensation = rewardAmount[adType];
    const getAd = adType === "rewarded" ? getRewarded : getInterstial;
    let hasGivenCompensation = false;
    const giveCompensation = () => {
      if (hasGivenCompensation) return;
      hasGivenCompensation = true;
      dispatch(depositGold(compensation));
    }
    
    ad.current = getAd();
    
    const adObject = ad.current;
    const unsubscribe = adObject.onAdEvent((type) => {
      if (type === "loaded" && adType === "interstitial") {
        setText(compensation);
      } else if (type === "rewarded_loaded" && adType === "rewarded") {
        setText(compensation);
      } else if (type === "rewarded_earned_reward") {
        giveCompensation();
        setText(0);
        if (disappearOnFulfilled) {
          setDisplay("none");
        }
      } else if (type === "closed") {
        ad.current = null;
        setText(0);
        unsubscribe();
        if (adType === "interstitial") {
          giveCompensation();
        }
        if (disappearOnFulfilled) {
          setDisplay("none");
        } else {
          reset(!_);
        }
      } else if (type === "error") {
        unsubscribe();
        if (fallback) {
          fallback();
        }
        ad.current = null;
      }
    })
  
    adObject.load();
    return unsubscribe;
  }  

  const requestAd = () => {
    if (rewardedRef.current) {
      rewardedRef.current.show();
    } else if (interstitialRef.current) {
      interstitialRef.current.show();
    }
  }
  
  React.useEffect(() => {
    let deleteInterstital: Function | undefined;
    let deleteRewarded: Function | undefined;

    const readyInterstitial = () => {
      deleteInterstital = setupAd("interstitial", () => {
        textRef.current?.setText(translation.cantLoadAd);
      });
    }

    if (!rewardedRef.current) {
      deleteRewarded = setupAd("rewarded", readyInterstitial);
    }

    return () => {
      if (deleteInterstital) deleteInterstital();
      if (deleteRewarded) deleteRewarded();
    }
  })

  if (!hasGoodLuck) return <RewardGuide/>;

  if (display === "none") {
    return <></>;
  }

  return (
    <FlexHorizontal style={{justifyContent: 'center'}}>
      <MoneyIconContainer>
        {getIcon("fontAwesome5", "coins", {
          color: "yellow",
          size: 30,
        })}
      </MoneyIconContainer>
      <Space width={10} />
      <TouchableOpacity onPress={requestAd}>
          <FlexHorizontal>
            <DynamicText ref={textRef} renderer={(text) => {
              return (
                <View style={{backgroundColor: 'goldenrod', padding: 5, borderRadius: 10}}>
                  <StrokedNotoSans
                    text={text}
                    type="Black"
                    color="yellow"
                    strokeColor="green"
                    size={20}
                    // width={220}
                  />
                </View>
              )
            }} initialValue={translation.loadingAd}/>
          </FlexHorizontal>
      </TouchableOpacity>
    </FlexHorizontal>
  )
}

export default RewardButton
