import * as d3 from 'd3'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { RawMultiRankData } from '@api/rank'
import { prettyPercent } from '@api/utils'
import useGlobal from '@hooks/useGlobal'
import TranslationPack from '@Language/translation'
import { FlexHorizontal, Line, NotoSans, Space } from '@components/Generic/StyledComponents'
import MultiRankScoreGraph from './MultiRankScoreGraph'

const DescriptionContainer = styled(View)`
`;

type MultiRankDescriptionProps = {
  data: RawMultiRankData;
}

const MultiRankDescription = (props: MultiRankDescriptionProps) => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const {data} = props;
  const {
    KBI,
    createdAt,
    draw,
    gameCreatedAt,
    id,
    lose,
    name,
    photo,
    rank,
    rate,
    total,
    win,
    winningRate,
  } = data;
  const pieData = {
    win: Number(win),
    lose: Number(lose),
    draw: Number(draw),
  }

  return (
    <DescriptionContainer>
      <View style={{padding: 20, alignItems: "center"}}>
        <FlexHorizontal>
          <MultiRankScoreGraph
            style={{borderRadius: 20}}
            data={pieData}
          />
          <View style={{marginLeft: 10}}>
            <View style={{alignItems: "center"}}>
              <NotoSans type="Medium" color="tomato" size={20}>{translation.winningRate} </NotoSans>
              <Line color="tomato" height={1} width={80} />
              <NotoSans color="white" type="Bold">{prettyPercent(winningRate)}% </NotoSans>
            </View>
            <Space height={15} />
            <View style={{alignItems: "center"}}>
              <NotoSans type="Medium" color="mediumseagreen" size={20}>{translation.percentile} </NotoSans>
              <Line color="mediumseagreen" height={1} width={80} />
              <NotoSans color="white" type="Bold">{translation.top} {prettyPercent(Number(rate))}% </NotoSans>
            </View>
          </View>
        </FlexHorizontal>
        <View>
          <FlexHorizontal style={{marginTop: 20}}>
            <NotoSans color="dodgerblue" size={20}>{translation.score}</NotoSans>
            <Line height={16} width={2} marginHorizontal={10} color="royalblue" />
            <NotoSans color="white" size={16}>{translation.scoreText(Number(win), Number(lose), Number(draw))}</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans color="dodgerblue" size={20}>KBI*</NotoSans>
            <Line height={16} width={2} marginHorizontal={10} color="royalblue" />
            <NotoSans color="white" size={16}>{KBI} {translation.point}</NotoSans>
          </FlexHorizontal>
          <View>
            <NotoSans size={10} type="Thin" color="white">*KBI(King Block Index)</NotoSans>
            <Line width={100} height={0.5} marginVertical={1} color="white" />
            <NotoSans size={10} type="Thin" color="white">log2({translation.matchCount} + 1) X ({translation.winningRate}) X 100</NotoSans>
          </View>
        </View>
      </View>
    </DescriptionContainer>
  )
}

export default MultiRankDescription
