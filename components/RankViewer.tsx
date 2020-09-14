import React from 'react';
import {View, Text, ViewStyle, ScrollView, TextStyle, Animated, Easing, Dimensions} from 'react-native';
import RankListEntry from './RankViewer/RankListEntry';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import GradientBlindScrollView from './GradientBlindScrollView';

export type RankViewerDataEntry = { username: string; userId?: number; rank: number; rate: number };
export type RankViewerData = RankViewerDataEntry[];

type RankViewrProps = {
  borderWidth?: number;
  data: RankViewerData;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  entryStyle?: (entry: RankViewerDataEntry, i: number, isEnd: boolean) => {
    usernameStyle?: TextStyle;
    rankTextStyle?: TextStyle;
    rankRateStyle?: TextStyle;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
  };
  blindColor?: string;
};

class RankViewer extends React.Component<RankViewrProps> {
  _scrollViewRef = React.createRef<ScrollView>();
  topBlindOpacity = new Animated.Value(1);
  bottomBlindOpacity = new Animated.Value(1);
  blindWidth = new Animated.Value(0);
  constructor(props: Readonly<RankViewrProps>) {
    super(props);
  }

  componentDidMount() {
    this.setBlindOpacity('top', 0);
    // this.setBlindVisibility('bottom', true);
  }

  setBlindOpacity(target: 'top' | 'bottom', opacity: number) {
    const targetAnim = target === 'top' ? this.topBlindOpacity : this.bottomBlindOpacity;
    targetAnim.setValue(opacity);
  }

  render() {
    const {props} = this;
    const blindColor =
      (props.blindColor ||
      props.contentContainerStyle?.backgroundColor ||
      props.style?.backgroundColor ||
      'red') as string;
    return (
      <GradientBlindScrollView
        blindColor={blindColor}
        blindHeight={50}
        style={props.style}
      >
        {props.data.map((rankListEntryData, i) => {
          let style;
          const isEnd = i === props.data.length - 1;

          if (props.entryStyle) {
            style = props.entryStyle(rankListEntryData, i, isEnd);
          }

          return (
            <RankListEntry
              key={rankListEntryData.rank}
              data={rankListEntryData}
              style={style?.containerStyle}
              usernameStyle={style?.usernameStyle}
              rankRateStyle={style?.rankRateStyle}
              rankTextStyle={style?.rankTextStyle}
              textStyle={style?.textStyle}
            />
          );
        })}
      </GradientBlindScrollView>
    );
  }
}

export default RankViewer;
