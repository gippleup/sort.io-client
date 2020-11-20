import React from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../../components/RankViewer';
import usePlayData from '../../../hooks/usePlayData';
import { FlexHorizontal, FullFlexCenter, Line, NotoSans, Space } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { prettyTime } from './utils';
import { getLevelString } from '../GameScreen/utils';
import Profile from '../../../components/Profile';
import useGlobal from '../../../hooks/useGlobal';
import TranslationPack from '../../../Language/translation';
import { trackUser } from '../../../api/analytics';
import { prettyPercent } from '../../../api/utils';
import { RawSingleRankData, getSinglePlayRankById } from '../../../api/rank';

const RecordContainer: typeof View = styled(View)`
  width: ${Dimensions.get('window').width - 60}px;
  max-width: 300px;
  border-width: 0.5px;
  padding: 20px;
  background-color: whitesmoke;
`;

const ProfileBox: typeof View = styled(View)`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  background-color: black;
`;

const SinglePlayRankPopup = () => {
  const playData = usePlayData();
  const [data, setData] = React.useState<RawSingleRankData | null>(null);
  const navigation = useNavigation();
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;

  const Content = () => {
    if (!playData.user.id) {
      return (
        <NotoSans type="Black">{translation.checkConnection}</NotoSans>
      )
    } else if (!data) {
      return (
        <NotoSans type="Black">{translation.noPlayData}</NotoSans>
      )
    } else {
      const {
        createdAt,
        difficulty,
        name,
        photo,
        rank,
        rate,
        id,
      } = data;
      const time = createdAt ? prettyTime(createdAt, "$YYYY.$MM.$DD($dd) $hh:$mm", {
        "0": translation.weekDay[0],
        "1": translation.weekDay[1],
        "2": translation.weekDay[2],
        "3": translation.weekDay[3],
        "4": translation.weekDay[4],
        "5": translation.weekDay[5],
        "6": translation.weekDay[6],
      }) : translation.noData;

      const percentage = Number(rate);

      React.useEffect(() => {
        trackUser("User closed rank report");
      })

      return (
        <RecordContainer>
          <FlexHorizontal>
            <NotoSans size={12} type="Bold">{translation.recentUpdate}</NotoSans>
            <Line height="90%" marginHorizontal={10} width={0.5} color="black" />
            <NotoSans size={12} type="Regular">{time}</NotoSans>
          </FlexHorizontal>
          <Space height={10} />
          <FlexHorizontal>
            <ProfileBox>
              <Profile
                size={60}
                backgroundColor="dodgerblue"
                iconColor="white"
                photoUri={photo}
              />
            </ProfileBox>
            <Space width={10} />
            <View style={{flex: 1}}>
              <NotoSans type="Bold">{translation.name}</NotoSans>
              <Line width="100%" height={1} color="black" />
              <NotoSans size={25} type="Thin">{name}</NotoSans>
            </View>
          </FlexHorizontal>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">{translation.lastClearDifficulty}</NotoSans>
            <Line width="100%" height={1} color="black" />
            <NotoSans size={30} type="Thin">{getLevelString(Number(difficulty))}</NotoSans>
          </View>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">{translation.rank}</NotoSans>
            <Line width="100%" height={1} color="black" />
            <FlexHorizontal>
              <NotoSans size={30} type="Thin">{translation.top} </NotoSans>
              <NotoSans size={30} type="Black">{translation.rankText(Number(rank))}</NotoSans>
            </FlexHorizontal>
          </View>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">{translation.percentile}</NotoSans>
            <Line width="100%" height={1} color="black" />
            <NotoSans size={30} type="Black">{prettyPercent(percentage)}%</NotoSans>
          </View>
          <Space height={10} />
          <NotoSans type="Light" size={10}>*For Last 24 Hour</NotoSans>
        </RecordContainer>
      )
    }
  }

  React.useEffect(() => {
    if (playData.user.id && !data) {
      getSinglePlayRankById(playData.user.id, 1)
      .then((rankData) => {
        if (rankData !== undefined && rankData !== null) {
          setData(rankData);
        }
      })
    }
  })

  const buttons: PopupButton[] = [
    {
      text: '닫기',
      onPress: navigation.goBack,
    }
  ]
  
  return (
    <View style={{flex: 1}}>
      <BasicPopup
        backgroundColor="white"
        title={translation.singlePlayPerformance}
        buttons={buttons}
      >
        <Content/>
      </BasicPopup>
    </View>
  )
}

export default SinglePlayRankPopup
