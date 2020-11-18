import chroma from 'chroma-js'
import React, { Fragment } from 'react'
import { View, Text, Dimensions, Easing, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg'
import styled from 'styled-components'
import { getIcon } from '../../api/icon'
import { SinglePlayData } from '../../api/local'
import { getSinglePlayDataByUserId, SinglePlay } from '../../api/playData'
import { RawSingleRankData } from '../../api/rank'
import { getLevelColor, getLevelString } from '../../screens/production/GameScreen/utils'
import DynamicText from '../DynamicText'
import { FlexHorizontal, NotoSans, Space } from '../Generic/StyledComponents'
import LineGraph from '../LineGraph'
import Profile from '../Profile'
import Spreader from '../Spreader'
import SingleRankGraph from './SingleRankGraph'
import SingleRankSpreader from './SingleRankSpreader'

const SingleRankEntryContainer = styled(View)`
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

type SingleRankListEntryProps = {
  data: RawSingleRankData;
  index?: number;
  spread?: boolean;
  onPressSpread?: () => any;
}

const SingleRankListEntry = (props: SingleRankListEntryProps) => {
  const {data, onPressSpread, spread} = props;
  const {
    createdAt,
    difficulty,
    id,
    name,
    photo,
    rank,
    rate,
  } = data;
  const chevronRef = React.useRef<DynamicText>(null);
  const spreaderRef = React.useRef<Spreader>(null);

  const levelColor = getLevelColor(Number(difficulty));
  const brightColorMatch = chroma(levelColor).luminance() <= 0.4;
  const isTopPlayer = Number(rank) <= 5;
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

  return (
    <SingleRankEntryContainer>
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
                {data.rank}위
            </NotoSans>
          </View>
          <View style={{marginLeft: 10}}>
            <FlexHorizontal>
              <KingSymbol/>
              <NotoSans style={{marginBottom: 5}} size={15 * scale} type="Black">{slicedName}</NotoSans>
            </FlexHorizontal>
            <FlexHorizontal>
              <NotoSans
                color={brightColorMatch ? "white" : "black"}
                size={10 * scale}
                style={{
                  backgroundColor: levelColor,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                type="Black">{getLevelString(Number(data.difficulty))}
              </NotoSans>
            </FlexHorizontal>
          </View>
        </FlexHorizontal>
        <View>
          <TouchableOpacity onPress={onPressChevron}>
          <View style={{backgroundColor: "lightgrey", padding: 10, borderRadius: 10}}>
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
      <SingleRankSpreader userData={data} visible={spread} />
    </SingleRankEntryContainer>
  )
}

export default React.memo(SingleRankListEntry, (prevProps, nextProps) => {
  // const reasons = [
  //   prevProps.index === nextProps.index,
  //   prevProps.data.id === nextProps.data.id,
  //   prevProps.data.rank === nextProps.data.rank,
  //   prevProps.data.difficulty === nextProps.data.difficulty,
  // ]
  // if (reasons.filter((bool) => !bool).length) return true;
  return false;
});
