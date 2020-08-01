import React, {Component} from 'react';
import {
  View,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  EasingFunction,
  Easing,
} from 'react-native';
import styled from 'styled-components';

type RefBoxProps = {
  component?: React.ComponentType<any>;
  style?: ViewStyle;
};

export class RefBox extends Component<RefBoxProps> {
  boxRef = React.createRef<View>();
  catchedLayout = false;

  constructor(props: RefBoxProps) {
    super(props);
    this.catchLayout = this.catchLayout.bind(this);
  }

  originX = 0;
  originY = 0;
  originWidth = 0;
  originHeight = 0;

  x = 0;
  y = 0;
  width = 0;
  height = 0;

  animX: Animated.Value = new Animated.Value(0);
  animY: Animated.Value = new Animated.Value(0);

  animScale: Animated.Value = new Animated.Value(1);

  animAngle: Animated.Value = new Animated.Value(0);

  catchLayout(e: LayoutChangeEvent) {
    if (!this.catchedLayout) {
      this.catchedLayout = true;
      this.originX = e.nativeEvent.layout.x;
      this.originY = e.nativeEvent.layout.y;
      this.originWidth = e.nativeEvent.layout.width;
      this.originHeight = e.nativeEvent.layout.height;
    } else {
      return;
    }
  }

  setX(x: number) {
    this.animX.setValue(x);
    this.x = this.originX + x;
  }

  setY(y: number) {
    this.animY.setValue(y);
    this.y = this.originY + y;
  }

  setXY(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  setScale(scale: number) {
    this.animScale.stopAnimation();
    this.animScale.setValue(scale);
  }

  setAngle(angle: number) {
    this.animAngle.stopAnimation();
    this.animAngle.setValue(angle);
  }

  animateX(
    x: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animX.stopAnimation();
    return Animated.timing(this.animX, {
      toValue: x,
      duration: duration,
      easing,
      useNativeDriver: true,
    });
  }

  animateY(
    y: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animY.stopAnimation();
    return Animated.timing(this.animY, {
      toValue: y,
      duration,
      easing,
      useNativeDriver: true,
    });
  }

  animateXY(
    x: number,
    y: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animX.stopAnimation();
    this.animY.stopAnimation();
    return Animated.parallel([
      this.animateX(x, duration, easing),
      this.animateY(y, duration, easing),
    ]);
  }

  animateScale(
    scale: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animScale.stopAnimation();
    return Animated.timing(this.animScale, {
      toValue: scale,
      duration,
      easing,
      useNativeDriver: true,
    });
  }

  animateAngle(
    angle: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animAngle.stopAnimation();
    return Animated.timing(this.animAngle, {
      toValue: angle,
      duration,
      easing,
      useNativeDriver: true,
    });
  }

  render() {
    return (
      <Animated.View
        onLayout={this.catchLayout}
        style={[
          this.props.style,
          {
            translateX: this.animX,
            translateY: this.animY,
            transform: [
              {scale: this.animScale},
              {
                rotate: this.animAngle.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
        ref={this.boxRef}>
        {this.props.component || <></>}
        {this.props.children}
      </Animated.View>
    );
  }
}

export default RefBox;
