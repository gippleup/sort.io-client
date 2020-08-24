import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space } from '../../../components/Generic/StyledComponents';
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
  const diffToChallenge = lastPlayedDifficulty;
  const diffToChallengeStr = getLevelString(diffToChallenge);
  return (
    <BasicPopup
      title="연습하기"
      content={(
        <AskPopupContentContainer>
          <SubTitleText>연습할 랭크: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">연습을 통해 실력을 향상시키고 티켓을 획득합니다.</NotoSans>
          <Space height={10} />
          <View>
            <NotoSans size={16} style={{ color: 'orange' }} type="Bold">연습모드 보상</NotoSans>
            <NotoSans style={{ color: 'tomato' }} type="Regular">: 10골드 + 10골드 * (0 + ...연승횟수)</NotoSans>
            <NotoSans size={13} type="Light">예) 1승: 10골드 + 10골드(0 + 1) = 20골드</NotoSans>
            <NotoSans size={13} type="Light">예) 2연승: 10골드 + 10골드(0 + 1 + 2) = 40골드</NotoSans>
            <NotoSans size={13} type="Light">예) 3연승: 10골드 + 10골드(0 + 1 + 2 + 3) = 70골드</NotoSans>
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
