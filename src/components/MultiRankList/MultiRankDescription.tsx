import * as d3 from 'd3'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import Svg, { G, LinearGradient, Path, Stop, Text } from 'react-native-svg'
import styled from 'styled-components'
import { RawMultiRankData } from '../../api/rank'
import { prettyPercent } from '../../api/utils'
import useGlobal from '../../hooks/useGlobal'
import TranslationPack from '../../Language/translation'
import { FlexHorizontal, Line, NotoSans, Space } from '../Generic/StyledComponents'
import PieChart from '../PieChart'
import MultiRankScoreGraph from './MultiRankScoreGraph'

const DescriptionContainer = styled(View)`
`;

type MultiRankDescriptionProps = {
  data: RawMultiRankData;
}

const MultiRankDescription = (props: MultiRankDescriptionProps) => {
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.MultiPlay;
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
              <NotoSans type="Medium" color="tomato" size={20}>승률 </NotoSans>
              <Line color="tomato" height={1} width={80} />
              <NotoSans color="white" type="Bold">{prettyPercent(winningRate)}% </NotoSans>
            </View>
            <Space height={15} />
            <View style={{alignItems: "center"}}>
              <NotoSans type="Medium" color="mediumseagreen" size={20}>백분율 </NotoSans>
              <Line color="mediumseagreen" height={1} width={80} />
              <NotoSans color="white" type="Bold">상위 {prettyPercent(Number(rate))}% </NotoSans>
            </View>
          </View>
        </FlexHorizontal>
        <View>
          <FlexHorizontal style={{marginTop: 20}}>
            <NotoSans color="dodgerblue" size={20}>전적</NotoSans>
            <Line height={16} width={2} marginHorizontal={10} color="royalblue" />
            <NotoSans color="white" size={16}>{total}전 </NotoSans>
            <NotoSans color="white" size={16}>{win}승 </NotoSans>
            <NotoSans color="white" size={16}>{lose}패 </NotoSans>
            <NotoSans color="white" size={16}>{draw}무</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans color="dodgerblue" size={20}>KBI*</NotoSans>
            <Line height={16} width={2} marginHorizontal={10} color="royalblue" />
            <NotoSans color="white" size={16}>{KBI} {translation.point}</NotoSans>
          </FlexHorizontal>
          <FlexHorizontal>
            <NotoSans size={10} type="Thin" color="white">*KBI(King Block Index): </NotoSans>
            <NotoSans size={10} type="Thin" color="white">log2(승부 수 + 1) X (승률) X 100</NotoSans>
          </FlexHorizontal>
        </View>
      </View>
    </DescriptionContainer>
  )
}

export default MultiRankDescription
