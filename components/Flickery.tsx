import React, { RefObject } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import styled from 'styled-components';

type FlickeryProps = {
  interval?: number;
}

class Flickery extends React.Component<FlickeryProps, {}>{
  flickerAnim = new Animated.Value(0);
  constructor(props: Readonly<FlickeryProps>) {
    super(props);
    this.flicker = this.flicker.bind(this);
    this.flickerOnce = this.flickerOnce.bind(this);
    this.flickerNTimes = this.flickerNTimes.bind(this);
  }

  flicker(targetStatus: 'on' | 'off') {
    const {flickerAnim, props} = this;
    return Animated.timing(flickerAnim, {
      toValue: targetStatus === 'on' ? 1 : 0,
      duration: props.interval || 50,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  }

  flickerOnce(callback?: () => void) {
    const {flicker} = this;
    flicker('on').start(() => flicker('off').start(() => {
      if (callback) {
        callback();
      }
    }));
  }

  async flickerNTimes(n: number) {
    const {flickerOnce, flicker} = this;
    let leftCount = n;
    while (leftCount > 0) {
      await new Promise((resolve) => {
        flickerOnce(() => {
          leftCount -= 1;
          resolve();
        });
      })
    }
    flicker('on').start();
  }

  render() {
    const {flickerAnim, props} = this;
    return (
      <Animated.View style={{ opacity: flickerAnim }}>
        {props.children}
      </Animated.View>
    )
  }
}

export default Flickery
