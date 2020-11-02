import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import styled from 'styled-components'
import { getMultiPlayRank } from '../api/sortio'
import TranslationPack from '../Language/translation'
import { SupportedLanguage } from '../redux/actions/global/types'
import { prettyPercent } from './EndGameInfo/utils'
import { FlexHorizontal, Line, NotoSans, Space } from './Generic/StyledComponents'
import { lazify } from './Generic/utils'
import Profile from './Profile'

const ResultContainer: typeof View = styled(View)`
  border-radius: 5px;
  border-width: 0.5px;
  padding: 10px;
`;

const InfoContainer: typeof View = styled(View)`
  flex-direction: row;
  margin-top: 5px;
  border-radius: 5px;
  border-width: 0.5px;
  padding: 5px;
  padding-left: 10px;
`;

type MultiGameResultProps = {
  userId: number;
  isMine?: boolean;
  style?: ViewStyle;
  infoContainerStyle?: ViewStyle;
  color?: string;
  iconBackground?: string;
  modifier?: string;
  lan?: SupportedLanguage;
}

const MultiGameResult = (props: MultiGameResultProps) => {
  const {
    userId,
    isMine,
    style,
    infoContainerStyle,
    color,
    iconBackground,
    modifier,
    lan = SupportedLanguage.en,
  } = props;
  const translation = TranslationPack[lan].screens.MultiPlay;
  const Result = lazify(new Promise(async (resolve) => {
    const rankData = await getMultiPlayRank(userId, 0);
    const {
      KBI,
      createdAt,
      id,
      lose = '0',
      win = '0',
      draw = '0',
      name,
      photo,
      rank,
      rate,
      total = Number(lose) + Number(win) + Number(draw),
      winningRate
    } = rankData.targetUser;

    resolve(
      <ResultContainer style={style}>
        <FlexHorizontal>
          <Profile
            backgroundColor={iconBackground}
            iconColor={isMine ? "dodgerblue" : "tomato"}
            photoUri={photo}
          />
          <Space width={5}/>
          <View>
            <FlexHorizontal>
              <NotoSans color={color} type="Bold">{name} </NotoSans>
              <NotoSans size={12} color={color} type="Thin">{modifier}</NotoSans>
            </FlexHorizontal>
            <FlexHorizontal>
              <NotoSans color={color} size={12} type="Light">{translation.rankText(Number(rank), rankData.total)}</NotoSans>
              <NotoSans color={color} size={12} type="Bold"> ({translation.top} {prettyPercent(Number(rate))}%)</NotoSans>
            </FlexHorizontal>
          </View>
        </FlexHorizontal>
        <InfoContainer style={infoContainerStyle}>
          <View>
            <NotoSans color={color} type="Thin">{translation.score}</NotoSans>
            <NotoSans color={color} type="Thin">KBI</NotoSans>
          </View>
          <View>
            <FlexHorizontal>
              <Line height="50%" width={0.5} marginHorizontal={5} />
              <NotoSans color={color} type="Medium">{translation.scoreText(Number(win), Number(lose), Number(draw))} </NotoSans>
              <NotoSans color={color} type="Thin">({translation.winningRate}: {prettyPercent(Number(winningRate))}%)</NotoSans>
            </FlexHorizontal>
            <FlexHorizontal>
              <Line height="50%" width={0.5} marginHorizontal={5} />
              <NotoSans color={color} type="Bold">{KBI} {translation.point}</NotoSans>
            </FlexHorizontal>
          </View>
        </InfoContainer>
      </ResultContainer>
    )
  }))
  return (
    <React.Suspense fallback={<></>}>
      <Result/>
    </React.Suspense>
  )
}

export default MultiGameResult
