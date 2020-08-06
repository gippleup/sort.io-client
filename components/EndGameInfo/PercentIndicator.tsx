import React, {Component, RefObject} from 'react';
import {Text, View, Animated} from 'react-native';
import AnimatedBox from 'react-native-animated-box';
import styled from 'styled-components';

type PercentIndicatorProps = {
  value: number;
  width?: number;
  height?: number;
  color?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  fillColor?: string;
  fillBorderColor?: string;
};

export class PercentIndicator extends Component<PercentIndicatorProps> {
  fillRef = React.createRef<AnimatedBox>();
  shellWidth: number;
  constructor(props: Readonly<PercentIndicatorProps>) {
    super(props);
    this.shellWidth = props.width || 200;
  }

  animateFill = (value: number) => {
    if (!this.fillRef.current) {
      return;
    }
    Animated.timing(this.fillRef.current?.style.width, {
      toValue: value * this.shellWidth,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {props, fillRef} = this;
    return (
      <View>
        <AnimatedBox
          style={{
            width: props.width,
            height: props.height,
            backgroundColor: props.color,
            borderColor: props.borderColor,
            borderWidth: props.borderWidth,
            borderRadius: props.borderRadius,
          }}>
          <AnimatedBox
            ref={fillRef}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: props.value * this.shellWidth,
              height: '100%',
              backgroundColor: props.fillColor || 'lime',
              borderWidth: 1,
              borderRadius: props.borderRadius,
              borderColor: props.fillBorderColor || 'green',
            }}
          />
        </AnimatedBox>
      </View>
    );
  }
}

export default PercentIndicator;
