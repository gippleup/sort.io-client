import AnimatedRefBox from '@components/AnimatedRefBox'
import chroma from 'chroma-js';
import React, { RefObject } from 'react'
import { Animated, Easing, GestureResponderEvent } from 'react-native';
import { View, Text } from 'react-native'

const particleCount = 100;
const spread = 100;
const AnimatedRefBoxTester = () => {
  const particleRefs = Array(particleCount).fill(0).map(() => React.useRef<AnimatedRefBox>(null));

  const onTouch = (state: GestureResponderEvent) => {
    const {locationX, locationY} = state.nativeEvent;
    const animations = particleRefs.map((ref) => {
      if (!ref.current) return;
      const {x, y, scale} = ref.current;
      x.setValue(locationX);
      y.setValue(locationY);
      scale.setValue(0);
      return Animated.sequence([
        Animated.parallel([
          Animated.spring(x, {
            toValue: locationX - spread / 2 + Math.random() * spread,
            useNativeDriver: true,
          }),
          Animated.spring(y, {
            toValue: locationY - spread / 2 + Math.random() * spread,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 0.5 + Math.random() * 1.5,
            useNativeDriver: true,
          })
        ]),
        Animated.parallel([
          Animated.spring(x, {
            toValue: locationX,
            useNativeDriver: true,
          }),
          Animated.spring(y, {
            toValue: locationY,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 0,
            useNativeDriver: true,
          })
        ])
      ])
    })
    Animated.parallel(animations.filter((animation) => animation !== undefined) as Animated.CompositeAnimation[]).start();
  }

  return (
    <View style={{backgroundColor: "grey", height: "100%"}} onTouchStart={onTouch}>
      {Array(particleCount).fill(0).map((_, i) => {
        const color = chroma.random();
        return (
          <AnimatedRefBox
            key={i}
            ref={particleRefs[i]}
            style={{
              backgroundColor: color.hex(),
              borderRadius: 5,
              borderColor: color.darken().hex(),
              borderWidth: 1,
              width: 10,
              height: 10,
              position: "absolute"
            }} />
        )
      })}
    </View>
  )
}

export default AnimatedRefBoxTester
