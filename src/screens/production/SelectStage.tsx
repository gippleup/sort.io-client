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
import useGlobal from '../../hooks/useGlobal';
import TranslationPack from '../../Language/translation';
import styled from 'styled-components';
import AdmobBanner from '../../components/AdmobBaner';

const BannerAdSpace: typeof View = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: 10px;
  transform: scale(0.8);
`;

const backgroundImage = require('../../assets/BackgroundPattern.png');

const SelectStage = () => {
  const navigation = useNavigation();
  const playData = usePlayData();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;
  const {singlePlay = []} = playData;
  const lastSinglePlayData = singlePlay[singlePlay.length - 1];
  const lastPlayedDifficulty = lastSinglePlayData ? lastSinglePlayData.difficulty : 0;
  const lastPlayedDiffStr = getLevelString(lastPlayedDifficulty);
  const [bannerAdSpace, setBannerAdSpace] = React.useState<{width: number; height: number;} | undefined>();

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
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Division>
            <RecordEntryContainer>
              <FlexHorizontal>
                <RecordTitle>{translation.currentRank}</RecordTitle>
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
                  {translation.singlePlayPerformance}
                </NotoSans>
              </TouchableOpacity>
            </RecordEntryContainer>
            <BannerAdSpace onLayout={(e) => setBannerAdSpace(e.nativeEvent.layout)}>
              <AdmobBanner availableSpace={bannerAdSpace} />
            </BannerAdSpace>
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
                    <CustomText dark small>{translation.ticketPurchase}</CustomText>
                  </CustomTextContainer>
                </TouchableOpacity>
              </FlexHorizontal>
              <Space height={10} />
              {/* <View>
                <RewardButton chance={0.1} disappearOnFulfilled/>
              </View> */}
              <Space height={10} />
              <TouchableOpacity onPress={onPressChallenge}>
                <CustomTextContainer border full>
                  <TicketIcon hasBackground/>
                  <Space width={10} />
                    <CustomText large dark>{translation.challenge}</CustomText>
                </CustomTextContainer>
              </TouchableOpacity>
              <Space height={10} />
              <TouchableOpacity onPress={onPressTraining}>
                <CustomTextContainer border full>
                  <CustomText large dark>{translation.practice}</CustomText>
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
