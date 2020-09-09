import React from 'react'
import { View, Text, Dimensions, ViewStyle } from 'react-native'
import StrokedText from '../../../components/StrokedText'
import { FullFlexCenter } from '../Main/MultiWaitingPopup/_StyledComponent'
import { RoundPaddingCenter, NotoSans, FlexHorizontal } from '../../../components/Generic/StyledComponents'
import chroma from 'chroma-js'
import RankViewer from '../../../components/RankViewer'
import usePlayData from '../../../hooks/usePlayData'
import { RoundRectangleButton } from '../../../components/EndGameInfo/_StyledComponents'

const data = [
  {
    username: '백만송이',
    rank: 14523,
    rate: 0.125,
  },
  {
    username: '천만송이',
    rank: 14524,
    rate: 0.125,
  },
  {
    username: '화산송이',
    rank: 14525,
    rate: 0.126,
  },
  {
    username: '버섯송이',
    rank: 14526,
    rate: 0.126,
    userId: 324
  },
  {
    username: '표고송이',
    rank: 14527,
    rate: 0.126,
  },
  {
    username: '미친송이',
    rank: 14528,
    rate: 0.126,
  },
];


const GameResultPopup = () => {
  const hasWon = false;
  const titleStrokeLightness = 0.3;
  const playData = usePlayData();
  const buttonFontSize = 20;
  const titleStyle = hasWon ?
    {
      fillColor: "dodgerblue",
      strokeColor: chroma('dodgerblue')
        .set('hsl.l', titleStrokeLightness)
        .hex(),
      text: "WIN",
    } : 
    {
      fillColor: "red",
      strokeColor: chroma('red')
        .set('hsl.l', titleStrokeLightness)
        .hex(),
      text: "LOSE",
    }

  const boardStyle: ViewStyle = hasWon ? 
    {
      backgroundColor: 'royalblue',
      borderWidth: 3,
      borderColor: chroma('royalblue')
        .set('hsl.l', 0.5)
        .hex(),
    } :
    {
      backgroundColor: 'tomato',
      borderWidth: 3,
      borderColor: chroma('tomato')
        .set('hsl.l', 0.8)
        .hex(),
    }

  const textColor = hasWon ? 'white' : 'black'

  const rankViewerRef = React.createRef<RankViewer>();
  return (
    <FullFlexCenter>
      <View style={{marginBottom: 10}}>
        <StrokedText
          dyMultiplier={0.33}
          fillColor={titleStyle.fillColor}
          fontFamily="NotoSansKR-Black"
          fontSize={50}
          height={60}
          strokeColor={titleStyle.strokeColor}
          strokeWidth={10}
          text={titleStyle.text}
          width={150}
        />
      </View>
      <RoundPaddingCenter style={boardStyle}>
        <View style={{paddingHorizontal: 10}}>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor} type="Bold">
              대전 기록
            </NotoSans>
            <NotoSans color={textColor} type="Bold">
              128전 82승 32패 10무
            </NotoSans>
          </FlexHorizontal>
          <FlexHorizontal style={{ justifyContent: 'space-between' }}>
            <NotoSans color={textColor} size={30} type="Black">
              승률
            </NotoSans>
            <NotoSans color={textColor} size={30} type="Black">
              87.5%
            </NotoSans>
          </FlexHorizontal>
        </View>
        <RankViewer
          ref={rankViewerRef}
          style={{
            width: Dimensions.get('screen').width - 80,
            maxHeight: 240, maxWidth: 300,
            marginVertical: 20
          }}
          blindColor={boardStyle.backgroundColor as string}
          entryStyle={(entry, i, isEnd) => {
            const defaultContainerStyle: ViewStyle = { backgroundColor: 'transparent' }
            if (isEnd) {
              return {
                containerStyle: {
                  ...defaultContainerStyle,
                  borderBottomColor: 'transparent'
                },
                textStyle: {
                  color: textColor
                }
              }
            }

            if (entry.userId === playData.user.id) {
              return {
                containerStyle: {
                  backgroundColor: hasWon ? 'white' : 'black',
                },
                textStyle: {
                  color: hasWon ? 'black' : 'white',
                  fontWeight: 'bold',
                }
              }
            }

            return {
              containerStyle: defaultContainerStyle,
              textStyle: {
                color: textColor
              }
            }
          }}
          data={data}
        />
        <FlexHorizontal>
          <RoundRectangleButton style={{marginRight: 10}} width={100}>
            <View>
              <NotoSans type="Bold" size={buttonFontSize}>홈</NotoSans>
            </View>
          </RoundRectangleButton>
          <View style={{flex: 1}}>
            <RoundRectangleButton>
              <View>
                <NotoSans type="Bold" size={buttonFontSize}>재대결</NotoSans>
              </View>
            </RoundRectangleButton>
          </View>
        </FlexHorizontal>
        <View style={{marginTop: 10}}>
          <RoundRectangleButton>
            <View>
              <NotoSans type="Bold" size={buttonFontSize}>한판 더 하기</NotoSans>
            </View>
          </RoundRectangleButton>
        </View>
      </RoundPaddingCenter>
    </FullFlexCenter>
  )
}

export default GameResultPopup
