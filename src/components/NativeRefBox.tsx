import React, { Component, RefObject } from 'react'
import { Text, View, ViewStyle, StyleSheet, LayoutChangeEvent, ViewProps } from 'react-native'
import * as easingFunc from './NativeRefBox/easings';
import chroma, { Color, Scale } from 'chroma-js';

export type RefAnimation = {
  start: (onComplete?: (() => any) | undefined) => void;
  stop: () => void;
}

type AnimatibleKeys = Extract<keyof ViewStyle,
  "borderBottomEndRadius" |
  "borderBottomLeftRadius" |
  "borderBottomRightRadius" |
  "borderBottomWidth" |
  "borderLeftWidth" |
  "borderRadius" |
  "borderRightWidth" |
  "borderTopRightRadius" |
  "borderTopWidth" |
  "borderWidth" |
  "opacity" |
  "elevation" |
  "borderColor" |
  "borderTopColor" |
  "backgroundColor" |
  "borderLeftColor" |
  "borderRightColor" |
  "borderBottomColor" |
  "scaleX" |
  "scaleY" |
  "left" |
  "top" |
  "bottom" |
  "right" |
  "paddingLeft" |
  "paddingTop" |
  "paddingRight" |
  "paddingBottom" |
  "marginLeft" |
  "marginRight" |
  "marginTop" |
  "marginBottom" |
  "padding" |
  "margin" |
  "translateX" |
  "translateY" |
  "rotation" |
  "width" |
  "height"
>;

type AnimatibleStyle = Pick<ViewStyle, AnimatibleKeys>;

type NativeRefBoxProps = Omit<ViewProps, "style"> & {
  style?: ViewStyle;
}

const defaultValue: Record<AnimatibleKeys, number | string> = {
  width: 0,
  height: 0,
  borderBottomEndRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRadius: 0,
  borderRightWidth: 0,
  borderTopRightRadius: 0,
  borderTopWidth: 0,
  borderWidth: 0,
  opacity: 1,
  elevation: 0,
  scaleX: 1,
  scaleY: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  margin: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  padding: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  translateX: 0,
  translateY: 0,
  rotation: 0,
  borderColor: 'black',
  borderTopColor: 'black',
  backgroundColor: 'black',
  borderLeftColor: 'black',
  borderRightColor: 'black',
  borderBottomColor: 'black',
}

export class NativeRefBox extends Component<NativeRefBoxProps,{}> {
  constructor(props: Readonly<NativeRefBoxProps>) {
    super(props);
    this.setStyle = this.setStyle.bind(this);
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.setXY = this.setXY.bind(this);
    this.setScale = this.setScale.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    if (Array.isArray(this.props.style)) {
      this.style = StyleSheet.flatten(this.props.style);
    }
  }
  private _capturedInitialLayout = false;
  style: ViewStyle = this.props.style || {};
  original = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }
  ref: RefObject<View> = React.createRef();
  animations: NodeJS.Timeout[] = [];
  setStyle(style: ViewStyle) {
    const $ = this.ref.current;
    if (!$) { return; }
    this.style = {...this.style, ...style}
    $.setNativeProps({ style: this.style })
  }

  stopAnimation() {
    this.animations.forEach((intervalId) => {
      clearInterval(intervalId);
    })
    this.animations = [];
  }

  animate(option: {
    style: AnimatibleStyle,
    easing?: easingFunc.Easings,
    duration: number,
    fps?: number,
  }): RefAnimation {
    const start = (onComplete?: () => any) => {
      this.stopAnimation();

      let progress = 0;
      const { style, easing, duration, fps } = option;
      const framePerSec = (fps || 60);
      const keysOnRequest = Object.keys(style) as AnimatibleKeys[];
      const startValue: { [index in keyof ViewStyle]: number | string } = {};
      const diffValue = keysOnRequest.reduce((
        acc: { [index in keyof ViewStyle]: number | Scale<Color> },
        key: AnimatibleKeys
      ) => {
        let targetValue, curValue, diffValue;
        if (key.match(/color/i)) {
          const targetColor = style[key] as string;
          const curColor = (this.style[key] || defaultValue[key]) as string;
          targetValue = chroma(targetColor).hex();
          curValue = chroma(curColor).hex();
          diffValue = chroma.scale([curValue, targetValue]);
        } else {
          targetValue = Number(style[key] === undefined ? 0 : style[key]);
          curValue = Number(this.style[key] === undefined ? defaultValue[key] : this.style[key]);
          diffValue = targetValue - curValue;
        }
        startValue[key] = curValue;
        acc[key] = diffValue;
        return acc;
      }, {});

      let callback: Function | undefined;
      const animation = setInterval(() => {
        if (callback) {
          callback();
        }
      }, 1000 / framePerSec)

      const updateFunc = () => {
        if (progress < 1) {
          progress += (1 / framePerSec) / (duration / 1000);
          const nextStyle = keysOnRequest.reduce((
            acc: { [index in keyof Pick<ViewStyle, AnimatibleKeys>]: ViewStyle[index] },
            key: AnimatibleKeys
          ) => {
            let diff, nextValue;
            if (key.match(/color/i)) {
              const colorScale = diffValue[key] as Scale<Color>;
              nextValue = colorScale(easingFunc[easing || 'easeOutElastic'](progress)).hex();
            } else {
              const curValue = startValue[key] as number;
              diff = diffValue[key] as number;
              nextValue = curValue + easingFunc[easing || 'easeOutElastic'](progress) * diff;
            }
            // @ts-ignore
            acc[key] = nextValue;
            return acc;
          }, {})
          this.setStyle(nextStyle);
        } else {
          clearInterval(animation);
          this.setStyle(style);
          if (onComplete) onComplete();
        }
      }

      callback = updateFunc;
      this.animations.push(animation);
    }

    return {
      start,
      stop: this.stopAnimation,
    }
  }

  setX(x: number) {
    this.setStyle({
      left: x,
    })
  }

  setY(y: number) {
    this.setStyle({
      top: y,
    })
  }

  setXY(x: number, y: number) {
    this.setStyle({
      left: x,
      top: y,
    })
  }

  setOpacity(opacity: number) {
    this.setStyle({
      opacity
    })
  }

  setScale(scale: number) {
    this.setStyle({
      scaleX: scale,
      scaleY: scale,
    })
  }

  static connectAnim(anim1: RefAnimation, anim2: RefAnimation): RefAnimation {
    const start = (callback?: () => any) => {
      anim1.start(() => anim2.start(callback))
    }
    const stop = () => {
      anim1.stop();
      anim2.stop();
    }
    return {
      start,
      stop,
    }
  }

  static sequence(animations: (RefAnimation | undefined)[]) {
    const filteredSequence = animations.filter((animation) => animation !== undefined) as RefAnimation[];
    let connectedAnim = filteredSequence[0];
    for (let i = 1; i < animations.length; i += 1) {
      connectedAnim = this.connectAnim(connectedAnim, filteredSequence[i]);
    }
    return connectedAnim;
  }

  static loop(animation: RefAnimation, iterations: number = 1) {
    const sequence = Array(iterations).fill(animation);
    return this.sequence(sequence);
  }

  componentWillUnmount() {
    this.animations.forEach((intervalId) => clearInterval(intervalId))
  }

  render() {
    const {props, ref} = this;
    const captureLayout = (e: LayoutChangeEvent) => {
      this._capturedInitialLayout = true;
      this.original = e.nativeEvent.layout;
      this.style = {
        ...this.style,
        ...e.nativeEvent.layout
      };
    }

    const onLayout = (e: LayoutChangeEvent) => {
      if (!this._capturedInitialLayout) {
        captureLayout(e);
      }
      if (props.onLayout) {
        props.onLayout(e);
      }
    }

    return (
      <View {...props} ref={ref} onLayout={onLayout} style={props.style}>
        {props.children}
      </View>
    )
  }
}

export default NativeRefBox
