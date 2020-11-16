import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space, FlexHorizontal } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import usePlayData from '../../../hooks/usePlayData';
import { useTicket } from '../../../redux/actions/playData/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import TranslationPack from '../../../Language/translation';
import { modifyToTargetRoutes } from '../../../api/navigation';
import AnimatedCheckbox from '../../../components/AnimatedCheckbox';
import { getIcon } from '../../../api/icon';
import MoneyIcon from '../../../components/Main/MoneyIcon';
import { trackUser } from '../../../api/analytics';

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
    trackUser("User started single play challenge")
    if (playData.user.ticket < 1) {
      return navigation.navigate('Popup_NotEnoughTicket')
    } else {
      dispatch(useTicket(1));
    }

    modifyToTargetRoutes(navigation, [
      {name: "LoadingScreen"},
      {name: "GameScene", params: {
        mode: 'single',
        subType: 'challenge',
        level: lastPlayedDifficulty,
        leftTrial: 2,
        successiveWin: 0,
        results: [],
      }}
    ])
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
            <View style={{padding: 5, borderWidth: 1, borderRadius: 10, margin: 5, borderColor: "grey"}}>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false}/>
                <AnimatedCheckbox size={30} animated={false}/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">30</NotoSans>
                <MoneyIcon size={10} />
              </FlexHorizontal>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false}/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">100</NotoSans>
                <MoneyIcon size={10} />
              </FlexHorizontal>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">230</NotoSans>
                <MoneyIcon size={10} />
              </FlexHorizontal>
            </View>
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
          onPress: () => {
            trackUser("User closed challenge popup");
            navigation.goBack();
          },
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
