import React, { Suspense } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Graph from '../../../components/Graph'
import { SinglePlayData, getLocalPlayData } from '../../../api/local'
import { getLevelString } from '../GameScreen/utils'
import styled from 'styled-components'
import BasicPopup from '../../../components/Generic/BasicPopup'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import { useNavigation } from '@react-navigation/native'

const GraphContainer = styled(View)`
  padding-bottom: 5px;
  min-width: 200px;
  align-items: center;
`;

const RankGraphPopup = () => {
  const [data, setData] = React.useState<SinglePlayData[] | null>(null);
  const navigation = useNavigation();
  if (!data) {
    getLocalPlayData().then((data) => {
      if (data) {
        setData(data.singlePlay)
      }
    })
  }

  const renderGraph = () => {
    if (!data) {
      return (
        <NotoSans type="Black">데이터 로딩중...</NotoSans>
      );
    } else {
      return (
        <Graph
          data={data}
          xExtractor={(_, i: number) => i}
          yExtractor={(entry: SinglePlayData) => entry.difficulty}
          xAxisMapper={(_, i) => i + 1}
          yAxisMapper={(entry: SinglePlayData, i) => getLevelString(entry.difficulty).replace(/[aeiou]/g, '')}
          width={Dimensions.get('screen').width - 80}
        />
      )
    }
  }
  return (
    <BasicPopup
      buttonAlign="vertical"
      buttons={[{text: '닫기', onPress: navigation.goBack}]}
      title="랭크 변화 추이">
      <GraphContainer>
        {renderGraph()}
      </GraphContainer>
    </BasicPopup>
  )
}

export default RankGraphPopup
