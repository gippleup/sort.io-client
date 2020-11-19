import React, { Fragment, Suspense } from 'react'
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
import { LinearGradient, Stop } from 'react-native-svg'

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
          defs={(
            <Fragment>
              <LinearGradient id="line" x1={0} y1={0} x2={0} y2={1}>
                <Stop offset={0} stopColor="red" />
                <Stop offset={1} stopColor="violet" />
              </LinearGradient>
              <LinearGradient id="linefill" x1={0} y1={0} x2={0} y2={1}>
                <Stop offset={0} stopColor="blue" />
                <Stop offset={1} stopColor="firebrick" />
              </LinearGradient>
            </Fragment>
          )}
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            graphPaddingRight: 0,
            graphBackgroundFill: "black",
            xAxisColor: "dodgerblue",
            yAxisColor: "dodgerblue",
            backgroundFill: "black",
            lineWidth: 1,
            lineColor: "url(#line)",
            graphFill: "url(#linefill)",
            pointFill: "white",
            pointSize: 5,
            xTagColor: "dodgerblue",
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
