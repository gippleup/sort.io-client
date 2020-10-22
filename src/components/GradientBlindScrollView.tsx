import React from 'react';
import { View, Text, ViewStyle, TextStyle, Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type GradientBlindScrollViewProps = {
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  blindColor?: string;
  blindHeight?: number;
  blindTransitionHeight?: number;
};

class GradientBlindScrollView extends React.Component<GradientBlindScrollViewProps> {
  _viewRef = React.createRef<View>();
  _scrollViewRef = React.createRef<ScrollView>();
  topBlindOpacity = new Animated.Value(1);
  bottomBlindOpacity = new Animated.Value(1);
  blindWidth = new Animated.Value(0);
  constructor(props: Readonly<GradientBlindScrollViewProps>) {
    super(props);
    this.setBlindOpacity = this.setBlindOpacity.bind(this);
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
    const {blindTransitionHeight = 60} = props;
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
          flex: props.style?.flex,
        }}
        ref={this._viewRef}
      >
        <ScrollView
          ref={_scrollViewRef}
          scrollEnabled
          onLayout={(e) => {
            this.blindWidth.setValue(e.nativeEvent.layout.width)
            if (e.nativeEvent.layout.height < (props.style?.maxHeight || 240)) {
              this.bottomBlindOpacity.setValue(0)
            }
          }}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            const { height: contentHeight } = e.nativeEvent.contentSize;
            const { height: scrollViewHeight } = e.nativeEvent.layoutMeasurement;
            const { y: scrollOffsetY } = e.nativeEvent.contentOffset;
            const scrollEnd = contentHeight - scrollViewHeight;

            const bottomBlindTransitionStartPoint = scrollEnd - blindTransitionHeight;
            const bottomBlindInvisiblePoint = scrollEnd;
            {
              const transitionPxLength = bottomBlindInvisiblePoint - bottomBlindTransitionStartPoint;
              const relativeScrollPositionToStartPoint = scrollOffsetY - bottomBlindTransitionStartPoint;
              const blindOpacity = relativeScrollPositionToStartPoint < 0
                ? 1
                : Math.max((transitionPxLength - relativeScrollPositionToStartPoint) / transitionPxLength, 0);
              this.setBlindOpacity('bottom', blindOpacity);
            }


            const topBlindTransitionEndPoint = blindTransitionHeight;
            const topBlindVisiblePoint = 0;
            {
              const transitionPxLength = topBlindTransitionEndPoint - topBlindVisiblePoint;
              const relativeScrollPositionToStartPoint = blindTransitionHeight - scrollOffsetY;
              const blindOpacity = relativeScrollPositionToStartPoint < 0
                ? 1
                : Math.min((transitionPxLength - relativeScrollPositionToStartPoint) / transitionPxLength, 1);
              this.setBlindOpacity('top', blindOpacity);
            }

          }}
          contentContainerStyle={props.contentContainerStyle}
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
            flex: undefined,
          }}>
          {props.children}
        </ScrollView>
        <Animated.View
          style={{
            width: this.blindWidth,
            opacity: this.topBlindOpacity,
            position: 'absolute',
          }}
        >
          <Svg
            style={{
              width: '100%',
            }}
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
          </Svg>
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.bottomBlindOpacity,
            width: this.blindWidth,
            position: 'absolute',
            bottom: -1,
          }}>
          <Svg
            style={{
              width: '100%',
            }}
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
          </Svg>
        </Animated.View>
      </View>
    );
  }
}

export default GradientBlindScrollView;
