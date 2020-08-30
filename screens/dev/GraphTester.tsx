import React from 'react'
import { View, Text } from 'react-native'
import Graph from '../../components/Graph'
import { getLocalPlayData, SinglePlayData } from '../../api/local'
import { scale } from 'chroma-js'
import { getLevelString } from '../production/GameScreen/utils'
import { NotoSans } from '../../components/Generic/StyledComponents'

const GraphTester = () => {
  const [data, setData] = React.useState<SinglePlayData[] | null>(null);
  if (!data) {
    getLocalPlayData().then((data) => setData(data.single))
    return <></>;
  }
  
  return (
    <View>
      <Graph 
        data={data.slice(0, 8)}
        xExtractor={(_, i: number) => i}
        yExtractor={(entry: SinglePlayData) => entry.difficulty}
        xAxisMapper={(_, i) => i + 1}
        yAxisMapper={(entry: SinglePlayData, i) => getLevelString(entry.difficulty).replace(/[aeiou]/g, '')}
        width={300}
      />
    </View>
  )
}

export default GraphTester
