import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space } from '../../../components/Generic/StyledComponents';
import usePlayData from '../../../hooks/usePlayData';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTicket } from '../../../redux/actions/playData/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import TranslationPack from '../../../Language/translation';
import { modifyToTargetRoutes, slimNavigate } from '../../../api/navigation';
import { RootStackParamList } from '../../../router/routes';

type StartTrainingProps = {
  onPressStart: () => any;
}

const StartTrainingPopup = (props: StartTrainingProps) => {
  const {global, playData} = useSelector((state: AppState) => state);
  const translation = TranslationPack[global.language].screens.SelectStage;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {singlePlay=[]} = playData;
  const dispatch = useDispatch();
  const lastSinglePlayData = singlePlay[singlePlay.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const diffToChallenge = lastPlayedDifficulty;
  const diffToChallengeStr = getLevelString(diffToChallenge);

  const startSingleGame = () => {
    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "GameScene", params: {
        mode: 'single',
        subType: 'training',
        level: lastPlayedDifficulty,
        leftTrial: 2,
        successiveWin: 0,
        results: [],  
      }}
    ])
  }

  return (
    <BasicPopup
      title={translation.practice}
      content={(
        <AskPopupContentContainer>
          <SubTitleText>{translation.rankToPractice}: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">{translation.practiceDes}</NotoSans>
          <Space height={10} />
          <View>
            <NotoSans size={16} style={{ color: 'orange' }} type="Bold">{translation.practiceReward}</NotoSans>
            <NotoSans style={{ color: 'tomato' }} type="Regular">{translation.practiceRewardDes}</NotoSans>
            <NotoSans size={13} type="Light">{translation.practiceRewardEx1}</NotoSans>
            <NotoSans size={13} type="Light">{translation.practiceRewardEx1}</NotoSans>
            <NotoSans size={13} type="Light">{translation.practiceRewardEx1}</NotoSans>
            <NotoSans size={15} type="Black">{'\n'}{translation.practiceRewardTotal}</NotoSans>
          </View>
        </AskPopupContentContainer>
      )}
      buttons={[
        {
          text: translation.start,
          onPress: startSingleGame,
          style: {
            backgroundColor: 'palegreen',
            elevation: 5,
          }
        },
        {
          text: translation.cancel,
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

export default StartTrainingPopup;
