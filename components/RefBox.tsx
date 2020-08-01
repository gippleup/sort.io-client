import React, { Component } from 'react'
import {
  View,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  EasingFunction,
} from 'react-native';
import styled from 'styled-components';

type RefBoxProps = {
  component?: React.ComponentType<any>;
  style?: ViewStyle;
};

const RefBoxContainer: typeof View = styled(View)`
  position: absolute;
`;

export class RefBox extends Component<RefBoxProps> {
  boxRef = React.createRef<View>();
  catchedLayout = false;

  layout = {
    height: new Animated.Value(0),
    width: new Animated.Value(0),
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    angle: new Animated.Value(0),
    scale: new Animated.Value(0),
  };

  constructor(props: RefBoxProps) {
    super(props);
    this.catchLayout = this.catchLayout.bind(this);
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.setXY = this.setXY.bind(this);
    this.animateX = this.animateX.bind(this);
    this.animateY = this.animateY.bind(this);
    this.animateXY = this.animateXY.bind(this);
    this.animateWidth = this.animateWidth.bind(this);
    this.animateHeight = this.animateHeight.bind(this);
    this.animateSize = this.animateSize.bind(this);
    this.setAngle = this.setAngle.bind(this);
    this.setScale = this.setScale.bind(this);
    this.animateAngle = this.animateAngle.bind(this);
    this.animateScale = this.animateScale.bind(this);
    this.layout.x.addListener((state) => this.setX(state.value));
    this.layout.y.addListener((state) => this.setY(state.value));
    this.layout.width.addListener((state) => this.setWidth(state.value));
    this.layout.height.addListener((state) => this.setHeight(state.value));
    this.layout.angle.addListener((state) => this.setAngle(state.value));
    this.layout.scale.addListener((state) => this.setScale(state.value));
  }

  catchLayout(e: LayoutChangeEvent) {
    if (!this.catchedLayout) {
      this.catchedLayout = true;
      const {layout} = e.nativeEvent;
      this.layout.width.setValue(layout.width);
      this.layout.height.setValue(layout.height);
      this.layout.x.setValue(layout.x);
      this.layout.y.setValue(layout.y);
    }
  }

  setStyle(option: ViewStyle) {
    this.boxRef.current?.setNativeProps({
      style: option,
    });
  }

  setAngle(angle: number) {
    this.setStyle({
      transform: [{rotate: angle + 'deg'}],
    });
  }

  animateAngle(angle: number, duration: number, easing?: EasingFunction) {
    Animated.timing(this.layout.angle, {
      toValue: angle,
      duration: duration,
      easing,
      useNativeDriver: true,
    }).start();
  }

  setScale(scale: number) {
    this.setStyle({
      transform: [{scale: scale}],
    });
  }

  animateScale(scale: number, duration: number, easing?: EasingFunction) {
    Animated.timing(this.layout.scale, {
      toValue: scale,
      duration,
      easing,
      useNativeDriver: true,
    }).start();
  }

  setWidth(width: number) {
    this.setStyle({width});
  }

  setHeight(height: number) {
    this.setStyle({height});
  }

  setX(left: number) {
    this.setStyle({left});
  }

  setY(top: number) {
    this.setStyle({top});
  }

  setXY(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  animateWidth(
    width: number,
    duration: number,
    easing: undefined | EasingFunction,
  ) {
    Animated.timing(this.layout.width, {
      toValue: width,
      useNativeDriver: true,
      easing,
      duration,
    }).start();
  }

  animateHeight(
    height: number,
    duration: number,
    easing: undefined | EasingFunction,
  ) {
    Animated.timing(this.layout.height, {
      toValue: height,
      useNativeDriver: true,
      easing,
      duration,
    }).start();
  }

  animateSize(
    width: number,
    height: number,
    duration: number,
    easing: undefined | EasingFunction,
  ) {
    this.animateWidth(width, duration, easing);
    this.animateHeight(height, duration, easing);
  }

  animateX(x: number, duration: number, easing: undefined | EasingFunction) {
    Animated.timing(this.layout.x, {
      toValue: x,
      useNativeDriver: true,
      easing,
      duration,
    }).start();
  }

  animateY(y: number, duration: number, easing: undefined | EasingFunction) {
    Animated.timing(this.layout.y, {
      toValue: y,
      useNativeDriver: true,
      easing,
      duration,
    }).start();
  }

  animateXY(x: number, y: number, duration: number, easing?: EasingFunction) {
    this.animateX(x, duration, easing);
    this.animateY(y, duration, easing);
  }

  render() {
    return (
      <RefBoxContainer
        style={this.props.style}
        onLayout={this.catchLayout}
        ref={this.boxRef}>
        {this.props.component || <></>}
        {this.props.children}
      </RefBoxContainer>
    );
  }
}

export default RefBox;
