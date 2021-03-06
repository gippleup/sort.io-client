import React, {Component} from 'react';
import {
  View,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  EasingFunction,
  Easing,
  StyleSheet,
} from 'react-native';

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
    this.setStyle = this.setStyle.bind(this);
    this.animX.addListener((state) => {
      this.x = state.value + this.originX;
      this.setStyle({left: state.value});
    });
    this.animY.addListener((state) => {
      this.y = state.value + this.originY;
      this.setStyle({top: state.value});
    });
    this.animOpacity.addListener((state) => {
      this.opacity = state.value;
    });
    this.animScale.addListener((state) => {
      this.scale = state.value;
    });
    const flattenedStyle = StyleSheet.flatten(props.style);
    const propOpacity = flattenedStyle ? flattenedStyle.opacity : 1;
    this.animOpacity.setValue(propOpacity !== undefined ? propOpacity : 1);
    this.stopAllAnimation = this.stopAllAnimation.bind(this);
  }

  originX = 0;
  originY = 0;
  originWidth = 0;
  originHeight = 0;

  x = 0;
  y = 0;
  width = 0;
  height = 0;
  opacity = 1;
  scale = 1;

  animX: Animated.Value = new Animated.Value(0);
  animY: Animated.Value = new Animated.Value(0);
  animScale: Animated.Value = new Animated.Value(1);
  animAngle: Animated.Value = new Animated.Value(0);
  animOpacity: Animated.Value = new Animated.Value(1);

  stopAllAnimation() {
    this.animX.stopAnimation();
    this.animY.stopAnimation();
    this.animScale.stopAnimation();
    this.animAngle.stopAnimation();
    this.animOpacity.stopAnimation();
  }

  setStyle(option: ViewStyle) {
    this.boxRef.current?.setNativeProps({style: option});
  }

  catchLayout(e: LayoutChangeEvent) {
    if (!this.catchedLayout) {
      const {x, y, width, height} = e.nativeEvent.layout;
      this.catchedLayout = true;
      this.originX = x;
      this.originY = y;
      this.originWidth = width;
      this.originHeight = height;
      this.animX.setValue(x);
      this.animY.setValue(y);
    } else {
      return;
    }
  }

  setX(x: number) {
    this.animX.stopAnimation();
    this.animX.setValue(x);
    this.x = this.originX + x;
  }

  setY(y: number) {
    this.animY.stopAnimation();
    this.animY.setValue(y);
    this.y = this.originY + y;
  }

  setXY(x: number, y: number) {
    this.animX.stopAnimation();
    this.animY.stopAnimation();
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

  setOpacity(opacity: number) {
    this.animOpacity.stopAnimation();
    this.animOpacity.setValue(opacity);
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

  animateOpacity(
    opacity: number,
    duration: number = 500,
    easing: EasingFunction = Easing.inOut(Easing.ease),
  ) {
    this.animOpacity.stopAnimation();
    return Animated.timing(this.animOpacity, {
      toValue: opacity,
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
            opacity: this.animOpacity,
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
