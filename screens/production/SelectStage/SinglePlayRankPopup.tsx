import React from 'react'
import { View, Text, ViewStyle, Dimensions } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import RankViewer, { RankViewerDataEntry, RankViewerData } from '../../../components/RankViewer';
import { getRank, UserRankData } from '../../../api/sortio';
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
          entryStyle={(entry, i, isEnd) => {
            const defaultContainerStyle: ViewStyle = {backgroundColor: 'transparent'}
            if (isEnd) {
              return {
                containerStyle: {
                  ...defaultContainerStyle,
                  borderBottomColor: 'transparent'
                }
              }
            }

            if (entry.userId === playData.user.id) {
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
      getRank(playData.user.id, 10)
      .then((rankData) => {
        if (!rankData) {
          return setData(rankData);
        }

        const mapEntry = (entry: UserRankData) => {
          const mapped: RankViewerDataEntry = {
            rank: Number(entry.rank),
            rate: Number(entry.rate),
            username: entry.name,
            userId: entry.userId,
          }
          return mapped;
        };
        const beforeUser = rankData.beforeTargetUser.map(mapEntry);
        const afterUser = rankData.afterTargetUser.map(mapEntry);
        const user: RankViewerDataEntry = {
          ...mapEntry(rankData.targetUser),
          username: mapEntry(rankData.targetUser).username + ' (YOU)'
        };
        const mappedData: RankViewerData = beforeUser.concat(user).concat(afterUser);
        setData(mappedData);
      })
    }

    if (rankViewerRef.current && data) {
      const $ = rankViewerRef.current
      let position = 1;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].userId === playData.user.id) {
          position = i;
          break;
        }
      }
      $._scrollViewRef.current?.scrollTo({
        y: 26 * position - 20,
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