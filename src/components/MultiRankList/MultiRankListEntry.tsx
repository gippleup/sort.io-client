import chroma from 'chroma-js'
import React, { Fragment } from 'react'
import { View, Text, Dimensions, Easing, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg'
import styled from 'styled-components'
import { getIcon } from '../../api/icon'
import { MultiPlayData } from '../../api/local'
import { getMultiPlayDataByUserId, MultiPlay } from '../../api/playData'
import { RawMultiRankData } from '../../api/rank'
import useGlobal from '../../hooks/useGlobal'
import TranslationPack from '../../Language/translation'
import { getLevelColor, getLevelString } from '../../screens/production/GameScreen/utils'
import DynamicText from '../DynamicText'
import { FlexHorizontal, NotoSans, Space } from '../Generic/StyledComponents'
import LineGraph from '../LineGraph'
import Profile from '../Profile'
import Spreader from '../Spreader'
import MultiRankGraph from './MultiRankGraph'
import MultiRankSpreader from './MultiRankSpreader'

const MultiRankEntryContainer: typeof View = styled(View)`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.2);
`;

const KingSymbolContainer = styled(View)`
  width: 25px;
  height: 25px;
  background-color: goldenrod;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 5px;
`;

const topPlayerColor = {
  1: "royalblue",
  2: "dodgerblue",
  3: "teal",
  4: "mediumseagreen",
  5: "tomato",
}

type MultiRankListEntryProps = {
  data: RawMultiRankData;
  spread?: boolean;
  onPressSpread?: () => any;
  isMine?: boolean;
}

const MultiRankListEntry = (props: MultiRankListEntryProps) => {
  const {data, onPressSpread, spread, isMine = false} = props;
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

  const entryBackground = isMine ? "springgreen" : "white";
  const chevronRef = React.useRef<DynamicText>(null);
  const spreaderRef = React.useRef<Spreader>(null);
  const isTopPlayer = Number(rank) <= 5;
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const numColor = isTopPlayer ? topPlayerColor[rank as "1" | "2" | "3" | "4" | "5"] : "transparent";
  const profileBg = isTopPlayer ? topPlayerColor[rank as "1" | "2" | "3" | "4" | "5"] : "grey";
  const scale = isTopPlayer ? 1.3 : 1;
  const nameLengthMax = 10;
  const slicedName = name.length >= nameLengthMax ? name.slice(0, nameLengthMax) + "..." : name;

  const KingSymbol = () => {
    if (rank !== "1") return <></>;
    return (
      <KingSymbolContainer>
        {getIcon("fontAwesome5", "crown", {
          color: "white",
          size: 13,
        })}
      </KingSymbolContainer>
    )
  }

  const onPressChevron = () => {
    if (onPressSpread) onPressSpread();
    if (chevronRef.current?.state.text === "up") {
      chevronRef.current?.setText("down");
      spreaderRef.current?.setSpread("fold");
    } else {
      chevronRef.current?.setText("up");
      spreaderRef.current?.setSpread("unfold");
    }
  }

  React.useEffect(() => {
    if (spread) {
      chevronRef.current?.setText("up")
    } else {
      chevronRef.current?.setText("down")
    }
  })

  return (
    <MultiRankEntryContainer style={{backgroundColor: entryBackground}}>
      <FlexHorizontal style={{justifyContent: "space-between", marginHorizontal: 5, flex: 1}}>
        <FlexHorizontal style={{flex: 1}}>
          <View>
            <Profile photoUri={photo} backgroundColor={profileBg} iconColor="white" />
            <NotoSans
              style={{
                backgroundColor: numColor,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 5,
              }}
              color={isTopPlayer ? "white" : "grey"}
              size={10 * scale}
              type="Bold">
                {translation.rankText(Number(rank))}
            </NotoSans>
          </View>
          <View style={{marginLeft: 10}}>
            <FlexHorizontal>
              <KingSymbol/>
              <NotoSans style={{marginBottom: 5}} size={15 * scale} type="Black">{slicedName}</NotoSans>
              <NotoSans>{isMine ? " (YOU)" : ""}</NotoSans>
            </FlexHorizontal>
            <FlexHorizontal>
              <NotoSans
                style={{marginRight: 5 * scale}}
                color={isTopPlayer ? numColor : "black"}
                size={11 * scale} 
                type="Black">
                KBI
              </NotoSans>
              <NotoSans
                style={{
                  backgroundColor: numColor,
                  paddingHorizontal: isTopPlayer ? 8 * scale : 0,
                  borderRadius: 10 * scale,
                }}
                color={isTopPlayer ? "white" : "grey"}
                size={10 * scale}
                type="Bold">
                {KBI} {translation.point}
              </NotoSans>
            </FlexHorizontal>
          </View>
        </FlexHorizontal>
        <View>
          <TouchableOpacity onPress={onPressChevron}>
          <View style={{backgroundColor: "lightgrey", padding: 10, borderRadius: 10, borderWidth: 0.5}}>
            <DynamicText
              ref={chevronRef}
              initialValue="down"
              renderer={(text) => {
                return getIcon("fontAwesome", `chevron-${text}`, {
                  color: "black",
                  size: 20,
                })
              }}
            />
          </View>
          </TouchableOpacity>
        </View>
      </FlexHorizontal>
      <MultiRankSpreader userData={data} visible={spread} />
    </MultiRankEntryContainer>
  )
}

export default React.memo(MultiRankListEntry, (prevProps, nextProps) => {
  // const reasons = [
  //   prevProps.index === nextProps.index,
  //   prevProps.data.id === nextProps.data.id,
  //   prevProps.data.rank === nextProps.data.rank,
  //   prevProps.data.difficulty === nextProps.data.difficulty,
  // ]
  // if (reasons.filter((bool) => !bool).length) return true;
  return false;
});
