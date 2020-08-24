import React from 'react'
import { View, Dimensions, Text, Modal, BackHandler } from 'react-native'
import PatternBackground from '../../components/GameScene/PatternBackground'
import SelectStageHeader from './SelectStage/SelectStageHeader';
import { FlexHorizontal, Space, SubTitleText, NotoSans } from '../../components/Generic/StyledComponents';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useBackButton } from '@react-navigation/native';
import {
  CustomText,
  CustomTextContainer,
  Division,
  GraphButton,
  GraphIcon,
  RecordEntryContainer,
  RecordTitle,
  TicketIcon,
} from './SelectStage/_StyledComponents'
import usePlayData from '../../hooks/usePlayData';
import usePopup from '../../hooks/usePopup';
import { getLevelString } from './GameScreen/utils';
import StartChallengePopup from './SelectStage/StartChallengePopup';
import StartTrainingPopup from './SelectStage/StartTrainingPopup';
import RankGraphPopup from './SelectStage/RankGraphPopup';
import TicketPurchasePopup from './SelectStage/TicketPurchasePopup';
import { useTicket } from '../../api/local';
import NotEnoughTicketPopup from './SelectStage/NotEnoughTicketPopup';

const backgroundImage = require('../../assets/BackgroundPattern.png');

const SelectStage = () => {
  const popup = usePopup();
  const navigation = useNavigation();
  const playData = usePlayData();
  const lastSinglePlayData = playData.single[playData.single.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const lastPlayedDiffStr = getLevelString(lastPlayedDifficulty)

  const startSingleGame = async (subType: 'challenge' | 'training') => {
    if (subType === 'challenge') {
      if (playData.user.ticket < 1) {
        return popup.show(() => {
          return (
            <NotEnoughTicketPopup />
          )
        })
      } else {
        await useTicket(1);
      }
    }

    navigation.navigate('PD_GameScene', {
      mode: 'single',
      subType,
      level: lastPlayedDifficulty,
      leftTrial: 2,
      successiveWin: 0,
    })
  }

  const onPressChallenge = () => {
    popup.show(() => {
      return (
        <StartChallengePopup
          onPressStart={() => startSingleGame('challenge')}
        />
      )
    })
  }

  const onPressTraining = () => {
    popup.show(() => {
      return (
        <StartTrainingPopup
          onPressStart={() => startSingleGame('training')}
        />
      )
    })
  }

  const onPressCurrentRankGraphIcon = () => {
    popup.show(() => {
      return (
        <RankGraphPopup/>
      )
    })
  }

  const onPressSinglePlayRankGraphIcon = () => {
    popup.show(() => {
      return (
        <></>
      );
    })
  }

  const onPressTicketPurchase = () => {
    popup.show(() => {
      return (
        <TicketPurchasePopup/>
      )
    })
  }

  return (
    <View>
      <PatternBackground
        source={backgroundImage}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
        scale={0.5}
      />
      <ScrollView>
        <SelectStageHeader />
        <Division>
          <RecordEntryContainer>
            <FlexHorizontal>
              <RecordTitle>현재 랭크</RecordTitle>
            </FlexHorizontal>
            <FlexHorizontal>
              <TouchableOpacity>
                <CustomTextContainer dark>
                  <CustomText>{lastSinglePlayData ? lastPlayedDiffStr : '-'}</CustomText>
                </CustomTextContainer>
              </TouchableOpacity>
              <GraphButton onPress={onPressCurrentRankGraphIcon}>
                <GraphIcon name="graph"/>
              </GraphButton>
            </FlexHorizontal>
          </RecordEntryContainer>
          <RecordEntryContainer>
            <RecordTitle>싱글 플레이 순위</RecordTitle>
            <FlexHorizontal>
              <TouchableOpacity>
                <CustomTextContainer dark>
                  <CustomText>124561위</CustomText>
                  <CustomText small> (15.8%)</CustomText>
                </CustomTextContainer>
              </TouchableOpacity>
              <GraphButton onPress={onPressSinglePlayRankGraphIcon}>
                <GraphIcon name="graph" />
              </GraphButton>
            </FlexHorizontal>
          </RecordEntryContainer>
        </Division>
        <Space height={100} />
        <Division>
          <View style={{width: Dimensions.get('screen').width - 100}}>
            <FlexHorizontal style={{alignSelf:'flex-end'}}>
              <TicketIcon small/>
              <CustomTextContainer dark fit>
              <CustomText small>{playData.user.ticket}</CustomText>
              </CustomTextContainer>
              <Space width={10} />
              <TouchableOpacity onPress={onPressTicketPurchase}>
                <CustomTextContainer fit>
                  <CustomText dark small>티켓 구매</CustomText>
                </CustomTextContainer>
              </TouchableOpacity>
            </FlexHorizontal>
            <Space height={10} />
            <TouchableOpacity onPress={onPressChallenge}>
              <CustomTextContainer border full>
                <TicketIcon hasBackground/>
                <Space width={10} />
                <CustomText large dark>챌린지</CustomText>
              </CustomTextContainer>
            </TouchableOpacity>
            <Space height={10} />
            <TouchableOpacity onPress={onPressTraining}>
              <CustomTextContainer border full>
                <CustomText large dark>연습하기</CustomText>
              </CustomTextContainer>
            </TouchableOpacity>
          </View>
        </Division>
      </ScrollView>
      {popup.component}
    </View>
  )
}

export default SelectStage
