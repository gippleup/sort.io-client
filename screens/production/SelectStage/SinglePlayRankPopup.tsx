import React from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../../components/RankViewer';
import { getSinglePlayRank, RankData, UserSingleRankData } from '../../../api/sortio';
import usePlayData from '../../../hooks/usePlayData';
import { NotoSans } from '../../../components/Generic/StyledComponents';
import { useNavigation } from '@react-navigation/native';

const SinglePlayRankPopup = () => {
  const playData = usePlayData();
  const [data, setData] = React.useState<RankViewerDataEntry[] | null>(null);
  const rankViewerRef = React.createRef<RankViewer>();
  const navigation = useNavigation();

  const renderContent = () => {
    if (!playData.user.id) {
      return (
        <NotoSans type="Black">인터넷 연결 상태를 확인해주세요.</NotoSans>
      )
    } else if (!data) {
      return (
        <NotoSans type="Black">플레이 데이터가 없습니다.</NotoSans>
      )
    } else {
      return (
        <RankViewer
          ref={rankViewerRef}
          style={{width: Dimensions.get('screen').width - 80, maxHeight: 240, maxWidth: 300}}
          blindColor="white"
          entryStyle={(entry, i, isEnd) => {
            const defaultContainerStyle: ViewStyle = {backgroundColor: 'transparent'}
            if (entry.id === playData.user.id) {
              return {
                containerStyle: {
                  backgroundColor: 'dodgerblue',
                },
                textStyle: {
                  color: 'white',
                  fontWeight: 'bold'
                }
              }
            }

            if (isEnd) {
              return {
                containerStyle: {
                  ...defaultContainerStyle,
                  borderBottomColor: 'transparent'
                }
              }
            }

            return {
              containerStyle: defaultContainerStyle,
            }
          }}
          data={data}
        />
      )
    }
  }

  React.useEffect(() => {
    if (playData.user.id && !data) {
      getSinglePlayRank(playData.user.id, 5)
      .then((rankData: RankData<UserSingleRankData>) => {
        if (!rankData) {
          return setData(rankData);
        }

        const mapEntry = (entry: UserSingleRankData) => {
          const mapped: RankViewerDataEntry = {
            rank: Number(entry.rank),
            rate: Number(entry.rate),
            name: entry.name,
            id: entry.userId,
            photo: entry.photo,
          }
          return mapped;
        };
        const beforeUser = rankData.beforeTargetUser.map(mapEntry);
        const afterUser = rankData.afterTargetUser.map(mapEntry);
        const user: RankViewerDataEntry = {
          ...mapEntry(rankData.targetUser),
          name: mapEntry(rankData.targetUser).name + ' (YOU)'
        };
        const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);
        setData(mappedData);
      })
    }

    if (rankViewerRef.current && data) {
      const $ = rankViewerRef.current
      let position = 1;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].id === playData.user.id) {
          position = i;
          break;
        }
      }
      $._blindScrollViewRef.current?._scrollViewRef.current?.scrollTo({
        y: 50 * position,
        animated: true
      });
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
      <BasicPopup title="싱글 플레이 순위" buttons={buttons}>
        {renderContent()}
      </BasicPopup>
    </View>
  )
}

export default SinglePlayRankPopup
