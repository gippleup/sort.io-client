import React from 'react'
import { View } from 'react-native'
import { getLevelString } from '../GameScreen/utils';
import BasicPopup from '../../../components/Generic/BasicPopup';
import { AskPopupContentContainer } from './_StyledComponents';
import { SubTitleText, NotoSans, Space } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import usePlayData from '../../../hooks/usePlayData';
import { useTicket } from '../../../redux/actions/playData/thunk';
import { useDispatch } from 'react-redux';

const StartChallengePopup = () => {
  const navigation = useNavigation();
  const playData = usePlayData();
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
      title="챌린지"
      content={(
        <AskPopupContentContainer>
          <SubTitleText>도전할 랭크: {lastSinglePlayData ? diffToChallengeStr : getLevelString(0)}</SubTitleText>
          <NotoSans type="Light">티켓을 하나 소모하여 더 높은 난이도에 도전합니다.</NotoSans>
          <Space height={10}/>
          <View>
            <NotoSans size={16} style={{color: 'orange'}} type="Bold">챌린지모드 보상</NotoSans>
            <NotoSans style={{color: 'tomato'}} type="Regular">: 10골드 + 10골드 * (0 + ...연승횟수) * 2</NotoSans>
            <NotoSans size={13} type="Light">예) 1승: 10골드 + 10골드(0 + 1) * 2 = 30골드</NotoSans>
            <NotoSans size={13} type="Light">예) 2연승: 10골드 + 10골드(0 + 1 + 2) * 2 = 70골드</NotoSans>
            <NotoSans size={13} type="Light">예) 3연승: 10골드 + 10골드(0 + 1 + 2 + 3) * 2 = 130골드</NotoSans>
            <NotoSans size={15} type="Black">{'\n'}3연승 시 획득 골드 총합: 230골드</NotoSans>
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
