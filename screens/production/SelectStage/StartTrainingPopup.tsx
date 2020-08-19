import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans } from '../../../components/Generic/StyledComponents';
import usePopup from '../../../hooks/usePopup';
import usePlayData from '../../../hooks/usePlayData';

type StartTrainingProps = {
  onPressStart: () => any;
}

const StartTrainingPopup = (props: StartTrainingProps) => {
  const playData = usePlayData();
  const popup = usePopup();
  const lastSinglePlayData = playData.single[playData.single.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const diffToChallenge = lastPlayedDifficulty + 1;
  const diffToChallengeStr = getLevelString(diffToChallenge);
  return (
    <BasicPopup
      title="연습하기"
      content={(
        <AskPopupContentContainer>
          <SubTitleText>연습할 랭크: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">연습을 통해 실력을 향상시키고 티켓을 획득합니다.</NotoSans>
          <View style={{ alignItems: 'center' }}>
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

export default StartTrainingPopup;
