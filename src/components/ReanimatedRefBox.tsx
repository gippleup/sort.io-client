import React, { Component } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import Animated, { Value } from 'react-native-reanimated'

type ReanimatedRefBoxProps = {
  style?: ViewStyle;
}

export class ReanimatedRefBox extends Component<ReanimatedRefBoxProps> {
  x: Animated.Value<number> = new Value(0);
  y: Animated.Value<number> = new Value(0);
  scale: Animated.Value<number> = new Value(1);
  scaleX: Animated.Value<number> = new Value(1);
  scaleY: Animated.Value<number> = new Value(1);
  opacity: Animated.Value<number> = new Value(1);
  rotate: Animated.Value<number> = new Value(0);
  constructor(props: Readonly<ReanimatedRefBoxProps>) {
    super(props);
  }

  render() {
    const {x, y, scale, scaleX, scaleY, opacity, rotate, props} = this;
    const {style} = props;
    return (
      <Animated.View style={{...style,
        opacity,
        transform: [
          {translateX: x},
          {translateY: y},
          {scale},
          {scaleX},
          {scaleY},
          {rotate}
        ]
      }}>
        {props.children}
      </Animated.View>
    )
  }
}

export default ReanimatedRefBox
