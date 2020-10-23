import React from 'react'
import { View, Dimensions } from 'react-native'
import PatternBackground from '../../components/GameScene/PatternBackground'
import SelectStageHeader from './SelectStage/SelectStageHeader';
import { FlexHorizontal, NotoSans, Space } from '../../components/Generic/StyledComponents';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  CustomText,
  CustomTextContainer,
  Division,
  GraphButton,
  PaddedSLIcon,
  RecordEntryContainer,
  RecordTitle,
  TicketIcon,
} from './SelectStage/_StyledComponents'
import usePlayData from '../../hooks/usePlayData';
import { getLevelString } from './GameScreen/utils';
import { getSinglePlayRank, UserSingleRankData } from '../../api/sortio';
import { prettyPercent } from '../../components/EndGameInfo/utils';
import { getIcon } from '../../api/icon';
import RewardButton from '../../components/RewardButton';

const backgroundImage = require('../../assets/BackgroundPattern.png');

const SelectStage = () => {
  const navigation = useNavigation();
  const playData = usePlayData();
  const {singlePlay} = playData;
  const lastSinglePlayData = singlePlay[singlePlay.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const lastPlayedDiffStr = getLevelString(lastPlayedDifficulty);

  const onPressChallenge = () => navigation.navigate('Popup_StartChallenge');
  const onPressTraining = () => navigation.navigate('Popup_StartTraining');
  const onPressCurrentRankGraphIcon = () => navigation.navigate('Popup_RankGraph');
  const onPressSinglePlayRank = () => navigation.navigate('Popup_SinglePlayRank');
  const onPressTicketPurchase = () => navigation.navigate('Popup_TicketPurchase');

  return (
    <View style={{flex: 1}}>
      <PatternBackground source={backgroundImage}/>
      <View style={{flex: 1}}>
        <SelectStageHeader />
        <View style={{justifyContent: 'space-between', flex: 1, paddingBottom: 50}}>
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
                  <PaddedSLIcon name="graph"/>
                </GraphButton>
              </FlexHorizontal>
            </RecordEntryContainer>
            <Space height={20}/>
            <RecordEntryContainer>
              <TouchableOpacity onPress={onPressSinglePlayRank}>
                <NotoSans
                  style={{
                    padding: 20,
                    paddingHorizontal: 40,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    borderWidth: 3,
                  }}
                  size={20}
                  type="Bold"
                  color="goldenrod"
                >
                  {getIcon('simpleLineIcons', 'trophy', {
                    color: 'goldenrod',
                    size: 20,
                  })}
                  <Space width={10} />
                  싱글 플레이 성적
                </NotoSans>
              </TouchableOpacity>
            </RecordEntryContainer>
          </Division>
          <Division>
            <View style={{width: Dimensions.get('window').width - 100}}>
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
              <View>
                <RewardButton chance={0.1} disappearOnFulfilled/>
              </View>
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
        </View>
      </View>
    </View>
  )
}

export default SelectStage
