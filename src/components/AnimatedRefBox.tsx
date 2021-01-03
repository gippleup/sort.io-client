import chroma from 'chroma-js';
import React, { Component } from 'react'
import { Animated, Easing, Text, View, ViewStyle } from 'react-native'

type AnimatedRefBoxProps = {
  style?: ViewStyle;
}

export class AnimatedRefBox extends Component<AnimatedRefBoxProps> {
  x = new Animated.Value(0);
  y = new Animated.Value(0);
  scale = new Animated.Value(1);
  scaleX = new Animated.Value(1);
  scaleY = new Animated.Value(1);
  opacity = new Animated.Value(1);
  rotate = new Animated.Value(0);

  constructor(props: Readonly<AnimatedRefBoxProps>) {
    super(props);
  }

  render() {
    const {props} = this;
    const {x, y, scaleX, scaleY, opacity, rotate, scale} = this;
    return (
      <Animated.View style={[
        props.style, {
          opacity,
          transform: [
            {translateX: x},
            {translateY: y},
            {scaleX},
            {scaleY},
            {scale},
            {rotate: rotate.interpolate({
              inputRange: [-1000000, 1000000],
              outputRange: ['-1000000deg', '1000000deg']
            })},
          ]
        }
      ]}>
        {props.children}
      </Animated.View>
    )
  }
}

export default AnimatedRefBox
