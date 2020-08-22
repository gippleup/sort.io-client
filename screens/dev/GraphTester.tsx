import React from 'react'
import { View, Text } from 'react-native'
import Graph from '../../components/Graph'
import { getPlayData, SinglePlayData } from '../../api/local'
import { scale } from 'chroma-js'
import { getLevelString } from '../production/GameScreen/utils'

const GraphTester = () => {
  const [data, setData] = React.useState<SinglePlayData[]>([]);
  if (!data.length) {
    getPlayData().then((data) => setData(data.single))
  }
  return (
    <View>
      <Graph 
        data={data}
        xExtractor={(_, i: number) => i * 50}
        yExtractor={(entry: SinglePlayData) => entry.difficulty * 50}
        xAxisMapper={(_, i) => i + 1}
        yAxisMapper={(entry: SinglePlayData, i) => getLevelString(entry.difficulty).replace(/[aeiou]/g, '')}
        width={300}
        height={200}
      />
    </View>
  )
}

export default GraphTester
