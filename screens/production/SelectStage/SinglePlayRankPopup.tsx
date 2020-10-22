import React from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../../components/RankViewer';
import { getSinglePlayRank, RankData, UserSingleRankData } from '../../../api/sortio';
import usePlayData from '../../../hooks/usePlayData';
import { FlexHorizontal, FullFlexCenter, Line, NotoSans, Space } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { prettyTime } from './utils';
import { getLevelString } from '../GameScreen/utils';
import { prettyPercent } from '../../../components/EndGameInfo/utils';
import Profile from '../../../components/Profile';

const RecordContainer: typeof View = styled(View)`
  width: ${Dimensions.get('window').width - 120}px;
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
  const [data, setData] = React.useState<UserSingleRankData | null>(null);
  const navigation = useNavigation();

  const Content = () => {
    if (!playData.user.id) {
      return (
        <NotoSans type="Black">인터넷 연결 상태를 확인해주세요.</NotoSans>
      )
    } else if (!data) {
      return (
        <NotoSans type="Black">플레이 데이터가 없습니다.</NotoSans>
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
      const time = prettyTime(createdAt, "$YYYY.$MM.$DD($dd) $hh:$mm", {
        "0": "일",
        "1": "월",
        "2": "화",
        "3": "수",
        "4": "목",
        "5": "금",
        "6": "토",
      });

      const percentage = (1 - Number(rate)) * 100;

      return (
        <RecordContainer>
          <FlexHorizontal>
            <NotoSans size={12} type="Bold">최근 업데이트 날짜</NotoSans>
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
              <NotoSans type="Bold">이름</NotoSans>
              <Line width="100%" height={1} color="black" />
              <NotoSans size={30} type="Thin">{name}</NotoSans>
            </View>
          </FlexHorizontal>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">최종 클리어 난이도</NotoSans>
            <Line width="100%" height={1} color="black" />
            <NotoSans size={30} type="Thin">{getLevelString(difficulty)}</NotoSans>
          </View>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">순위</NotoSans>
            <Line width="100%" height={1} color="black" />
            <FlexHorizontal>
              <NotoSans size={30} type="Thin">앞에서 </NotoSans>
              <NotoSans size={30} type="Black">{rank}위</NotoSans>
            </FlexHorizontal>
          </View>
          <Space height={10} />
          <View>
            <NotoSans type="Bold">백분위</NotoSans>
            <Line width="100%" height={1} color="black" />
            <NotoSans size={30} type="Black">{prettyPercent(percentage)}%</NotoSans>
          </View>
          <Space height={10} />
        </RecordContainer>
      )
    }
  }

  React.useEffect(() => {
    if (playData.user.id && !data) {
      getSinglePlayRank(playData.user.id, 0)
      .then((rankData: RankData<UserSingleRankData>) => {
        setData(rankData.targetUser);
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
        title="싱글 플레이 성적"
        buttons={buttons}
      >
        <Content/>
      </BasicPopup>
    </View>
  )
}

export default SinglePlayRankPopup
