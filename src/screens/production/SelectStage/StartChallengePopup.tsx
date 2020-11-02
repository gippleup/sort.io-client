import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import usePlayData from '../../../hooks/usePlayData';
import { useTicket } from '../../../redux/actions/playData/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import TranslationPack from '../../../Language/translation';

const StartChallengePopup = () => {
  const navigation = useNavigation();
  const {playData, global} = useSelector((state: AppState) => state);
  const translation = TranslationPack[global.language].screens.SelectStage;
  const {singlePlay=[]} = playData;
  const dispatch = useDispatch();
  const lastSinglePlayData = singlePlay[singlePlay.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty + 1 : 0;
  const diffToChallenge = lastPlayedDifficulty;
  const diffToChallengeStr = getLevelString(diffToChallenge);

  const startSingleGame = () => {
    navigation.goBack();
    if (playData.user.ticket < 1) {
      return navigation.navigate('Popup_NotEnoughTicket')
    } else {
      dispatch(useTicket(1));
    }

    navigation.navigate('GameScene', {
      mode: 'single',
      subType: 'challenge',
      level: lastPlayedDifficulty,
      leftTrial: 2,
      successiveWin: 0,
      results: [],
    })
  }

  return (
    <BasicPopup
      title={translation.challenge}
      content={(
        <AskPopupContentContainer>
          <SubTitleText>{translation.rankToChallenge}: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">{translation.challengeDes}</NotoSans>
          <Space height={10}/>
          <View>
            <NotoSans size={16} style={{color: 'orange'}} type="Bold">{translation.challengeReward}</NotoSans>
            <NotoSans style={{color: 'tomato'}} type="Regular">{translation.challengeRewardDes}</NotoSans>
            <NotoSans size={13} type="Light">{translation.challengeRewardEx1}</NotoSans>
            <NotoSans size={13} type="Light">{translation.challengeRewardEx2}</NotoSans>
            <NotoSans size={13} type="Light">{translation.challengeRewardEx3}</NotoSans>
            <NotoSans size={15} type="Black">{'\n'}{translation.rewardTotal}</NotoSans>
          </View>
        </AskPopupContentContainer>
      )}
      buttons={[
        {
          text: '시작하기',
          onPress: startSingleGame,
          style: {
            backgroundColor: 'palegreen',
            elevation: 5,
          }
        },
        {
          text: '취소하기',
          onPress: navigation.goBack,
          style: {
            backgroundColor: 'lightgrey',
            elevation: 5,
          }
        }
      ]}
      buttonAlign="horizontal"
    />
  )
}

export default StartChallengePopup
