import React from 'react';
import {View, Text, ViewStyle, ScrollView, TextStyle, Animated, Easing} from 'react-native';
import RankListEntry from './RankViewer/RankListEntry';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

export type RankViewerDataEntry = { username: string; userId?: number; rank: number; rate: number };
export type RankViewerData = RankViewerDataEntry[];

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const defaulEmphaisStyle: ViewStyle = {
  backgroundColor: 'gold',
}

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
    const {_scrollViewRef} = this;
    const blindColor =
      (props.blindColor ||
      props.contentContainerStyle?.backgroundColor ||
      props.style?.backgroundColor ||
      'red') as string;
    return (
      <View
        style={{
          width: '100%',
          borderTopWidth: props.borderWidth,
          borderBottomWidth: props.borderWidth,
          borderColor: props.style?.borderColor,
          alignItems: 'center',
        }}>
        <ScrollView
          ref={_scrollViewRef}
          onLayout={(e) => {
            this.blindWidth.setValue(e.nativeEvent.layout.width)
            if (e.nativeEvent.layout.height < (props.style?.maxHeight || 240)) {
              this.bottomBlindOpacity.setValue(0)
            }
          }}
          onScroll={(e) => {
            const { height: contentHeight } = e.nativeEvent.contentSize;
            const { height: scrollViewHeight } = e.nativeEvent.layoutMeasurement;
            const { y: scrollOffsetY } = e.nativeEvent.contentOffset;
            const scrollEnd = contentHeight - scrollViewHeight;

            const bottomBlindTransitionStartPoint = scrollEnd - 60;
            const bottomBlindInvisiblePoint = scrollEnd;
            {
              const transitionPxLength = bottomBlindInvisiblePoint - bottomBlindTransitionStartPoint;
              const relativeScrollPositionToStartPoint = scrollOffsetY - bottomBlindTransitionStartPoint;
              const blindOpacity = relativeScrollPositionToStartPoint < 0
                ? 1
                : Math.max((transitionPxLength - relativeScrollPositionToStartPoint) / transitionPxLength, 0);
              this.setBlindOpacity('bottom', blindOpacity);
            }


            const topBlindTransitionEndPoint = 30;
            const topBlindVisiblePoint = 0;
            {
              const transitionPxLength = topBlindTransitionEndPoint - topBlindVisiblePoint;
              const relativeScrollPositionToStartPoint = 30 - scrollOffsetY;
              const blindOpacity = relativeScrollPositionToStartPoint < 0
                ? 1
                : Math.min((transitionPxLength - relativeScrollPositionToStartPoint) / transitionPxLength, 1);
              this.setBlindOpacity('top', blindOpacity);
            }

          }}
          contentContainerStyle={props.contentContainerStyle}
          style={{
            ...props.style,
            borderLeftWidth: props.borderWidth,
            borderRightWidth: props.borderWidth,
          }}>
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
        </ScrollView>
        <AnimatedSvg
          style={{
            position: 'absolute',
            opacity: this.topBlindOpacity
          }}
          width={this.blindWidth}
          height={50}
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="0.5" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="1.5" stopColor={blindColor} stopOpacity="0.2" />
              <Stop offset="2" stopColor="rgba(0,0,0,0)" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" fill="url(#grad)" height="100%" />
        </AnimatedSvg>
        <AnimatedSvg
          style={{
            position: 'absolute',
            bottom: 0,
            opacity: this.bottomBlindOpacity,
          }}
          width={this.blindWidth}
          height={50}
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="0.5" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="1.5" stopColor={blindColor} stopOpacity="0.2" />
              <Stop offset="2" stopColor="rgba(0,0,0,0)" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" fill="url(#grad)" height="100%" />
        </AnimatedSvg>
      </View>
    );
  }
}

export default RankViewer;
