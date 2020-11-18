import React, { Suspense } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { SinglePlayData, getLocalPlayData } from '../../../api/local'
import { getLevelString } from '../GameScreen/utils'
import styled from 'styled-components'
import BasicPopup from '../../../components/Generic/BasicPopup'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import { useNavigation } from '@react-navigation/native'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'
import { trackUser } from '../../../api/analytics'
import LineGraph from '../../../components/LineGraph'
import NoDataFallback from '../../../components/NoDataFallback'

const GraphContainer = styled(View)`
  padding-bottom: 5px;
  min-width: 200px;
  align-items: center;
`;

const RankGraphPopup = () => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.SelectStage;
  const [data, setData] = React.useState<SinglePlayData[] | null>(null);
  const navigation = useNavigation();
  if (!data) {
    getLocalPlayData().then((data) => {
      if (data) {
        setData(data.singlePlay)
      }
    })
  }

  React.useEffect(() => {
    trackUser("User closed rank graph popup");
  })

  const renderGraph = () => {
    if (!data) {
      return (
        <NotoSans type="Black">{translation.loadingData}...</NotoSans>
      );
    } else {
      return (
        <LineGraph
          data={data}
          xValueExtractor={(entry, i) => i}
          yValueExtractor={(entry, i) => entry.difficulty}
          xTagExtractor={(entry, i) => i}
          yTagExtractor={(entry, i) => getLevelString(entry.difficulty).replace(/aeiou/g, "")}
          fallback={<NoDataFallback/>}
          style={{
            graphBackgroundFill: "black",
            xAxisColor: "blue",
            yAxisColor: "blue",
            backgroundFill: "black",
            lineWidth: 5,
            lineColor: "blue",
            pointFill: "white",
            pointSize: 5,
            xTagColor: "mediumseagreen",
          }}
        />
      )
    }
  }
  return (
    <BasicPopup
      buttonAlign="vertical"
      buttons={[{text: translation.close, onPress: navigation.goBack}]}
      title={translation.rankChangeProgess}>
      <GraphContainer>
        {renderGraph()}
      </GraphContainer>
    </BasicPopup>
  )
}

export default RankGraphPopup
