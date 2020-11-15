import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space, FlexHorizontal } from '../../../components/Generic/StyledComponents';
import usePlayData from '../../../hooks/usePlayData';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTicket } from '../../../redux/actions/playData/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import TranslationPack from '../../../Language/translation';
import { modifyToTargetRoutes, slimNavigate } from '../../../api/navigation';
import { RootStackParamList } from '../../../router/routes';
import AnimatedCheckbox from '../../../components/AnimatedCheckbox';
import MoneyIcon from '../../../components/Main/MoneyIcon';

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
            <View style={{padding: 5, borderWidth: 1, borderRadius: 10, margin: 5, borderColor: "grey"}}>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false}/>
                <AnimatedCheckbox size={30} animated={false}/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">20</NotoSans>
                <MoneyIcon size={10} />
              </FlexHorizontal>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false}/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">60</NotoSans>
                <MoneyIcon size={10} />
              </FlexHorizontal>
              <FlexHorizontal>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <AnimatedCheckbox size={30} animated={false} checked/>
                <NotoSans size={16} type="Bold"> = </NotoSans>
                <NotoSans size={16} color="goldenrod" type="Bold">130</NotoSans>
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
