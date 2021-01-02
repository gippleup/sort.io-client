import AnimatedRefBox from '@components/AnimatedRefBox'
import React, { RefObject } from 'react'
import { Animated, Easing, GestureResponderEvent } from 'react-native';
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const AnimatedRefBoxTester = () => {
  const boxRef = React.useRef<AnimatedRefBox>(null);
  const getAnimations = (ref: AnimatedRefBox) => {
    return {
      pop: (x: number, y: number) => {
        ref.x.setValue(x - 50);
        ref.y.setValue(y - 50);
        ref.scaleX.setValue(0);
        ref.scaleY.setValue(0);
        Animated.parallel([
          Animated.spring(ref.scaleX, {
            toValue: 1,
            useNativeDriver: true,
            tension: 200,
          }),
          Animated.spring(ref.scaleY, {
            toValue: 1,
            useNativeDriver: true,
            tension: 200,
          }),
        ]).start();
      }
    }
  }

  const onTouch = (state: GestureResponderEvent) => {
    const {locationX, locationY} = state.nativeEvent;
    if (!boxRef.current) return;
    const animations = getAnimations(boxRef.current);
    animations.pop(locationX, locationY);
  }

  return (
    <View style={{backgroundColor: "grey", height: "100%"}} onTouchStart={onTouch}>
      <AnimatedRefBox style={{backgroundColor: "black", width: 100, height: 100}} ref={boxRef}/>
    </View>
  )
}

export default AnimatedRefBoxTester
