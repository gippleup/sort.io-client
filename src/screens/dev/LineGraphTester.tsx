import React from 'react'
import { View, Text } from 'react-native'
import { getSinglePlayDataByUserId, SinglePlay } from '../../api/playData'
import LineGraph from '../../components/LineGraph'
import { getLevelString } from '../production/GameScreen/utils'

const LineGraphTester = () => {
  const [testData, setTestData] = React.useState<SinglePlay[] | null>(null);

  if (testData === null) {
    getSinglePlayDataByUserId(400)
    .then((data) => setTestData(data));
    return <></>;
  }

  return (
    <View style={{padding: 20, backgroundColor: "transparent"}}>
      <LineGraph
        data={testData}
        xValueExtractor={(entry, i) => i}
        yValueExtractor={(entry, i) => entry.difficulty}
        xTagExtractor={(entry, i) => i}
        yTagExtractor={(entry, i) => getLevelString(entry.difficulty).replace(/[aiueo]/g, "")}
      />
    </View>
  )
}

export default LineGraphTester
