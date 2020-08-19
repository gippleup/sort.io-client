import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans } from '../../../components/Generic/StyledComponents';
import usePopup from '../../../hooks/usePopup';
import { useNavigation } from '@react-navigation/native';
import usePlayData from '../../../hooks/usePlayData';

type StartChallengePopupProps = {
  onPressStart: () => any;
}

const StartChallengePopup = (props: StartChallengePopupProps) => {
  const popup = usePopup();
  const navigation = useNavigation();
  const playData = usePlayData();
  const lastSinglePlayData = playData.single[playData.single.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const diffToChallenge = lastPlayedDifficulty + 1;
  const diffToChallengeStr = getLevelString(diffToChallenge);

  const startSingleGame = (subType: 'challenge' | 'training') => {
    navigation.navigate('PD_GameScene', {
      mode: 'single',
      subType,
      level: 0,
      leftTrial: 2,
    })
  }

  return (
    <BasicPopup
      title="챌린지"
      content={(
        <AskPopupContentContainer>
          <SubTitleText>도전할 랭크: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">티켓을 하나 소모하여 더 높은 난이도에 도전합니다.</NotoSans>
          <View style={{alignItems: 'center'}}>
          </View>
        </AskPopupContentContainer>
      )}
      buttons={[
        {
          text: '시작하기',
          onPress: () => {
            popup.hide();
            if (props.onPressStart) {
              props.onPressStart();
            }
          },
          style: {
            backgroundColor: 'palegreen',
            elevation: 5,
          }
        },
        {
          text: '취소하기',
          onPress: popup.hide,
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
