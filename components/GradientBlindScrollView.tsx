import React from 'react';
import { View, Text, ViewStyle, TextStyle, Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type GradientBlindScrollViewProps = {
  style?: ViewStyle;
  blindColor?: string;
  blindHeight?: number;
};

class GradientBlindScrollView extends React.Component<GradientBlindScrollViewProps> {
  _scrollViewRef = React.createRef<ScrollView>();
  topBlindOpacity = new Animated.Value(1);
  bottomBlindOpacity = new Animated.Value(1);
  blindWidth = new Animated.Value(0);
  constructor(props: Readonly<GradientBlindScrollViewProps>) {
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
    const { props } = this;
    const { _scrollViewRef } = this;
    const blindColor =
      (props.blindColor ||
        props.style?.backgroundColor ||
        'red') as string;
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          margin: props.style?.margin,
          marginBottom: props.style?.marginBottom,
          marginEnd: props.style?.marginEnd,
          marginHorizontal: props.style?.marginHorizontal,
          marginLeft: props.style?.marginLeft,
          marginRight: props.style?.marginRight,
          marginStart: props.style?.marginStart,
          marginTop: props.style?.marginTop,
          marginVertical: props.style?.marginVertical,
        }}>
        <ScrollView
          ref={_scrollViewRef}
          scrollEnabled
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
          style={{
            ...props.style,
            margin: 0,
            marginBottom: 0,
            marginEnd: 0,
            marginHorizontal: 0,
            marginLeft: 0,
            marginRight: 0,
            marginStart: 0,
            marginTop: 0,
            marginVertical: 0,
          }}>
          {props.children}
        </ScrollView>
        <AnimatedSvg
          style={{
            position: 'absolute',
            opacity: this.topBlindOpacity
          }}
          width={this.blindWidth}
          height={props.blindHeight || 50}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="0.5" stopColor={blindColor} stopOpacity="0.5" />
              <Stop offset="1" stopColor={blindColor} stopOpacity="0" />
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
          height={props.blindHeight || 50}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor={blindColor} stopOpacity="1" />
              <Stop offset="0.5" stopColor={blindColor} stopOpacity="0.5" />
              <Stop offset="1" stopColor={blindColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" fill="url(#grad)" height="100%" />
        </AnimatedSvg>
      </View>
    );
  }
}

export default GradientBlindScrollView;
