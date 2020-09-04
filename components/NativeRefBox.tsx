import React, { Component, RefObject } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import * as easingFunc from './NativeRefBox/easings';
import chroma, { Color, Scale } from 'chroma-js';

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
  "margin"
>;

type AnimatibleStyle = Pick<ViewStyle, AnimatibleKeys>;

type NativeRefBoxProps = {
  style?: ViewStyle;
}

const defaultValue: Record<AnimatibleKeys, number | string> = {
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
  borderColor: 'rgba(0,0,0,0)',
  borderTopColor: 'rgba(0,0,0,0)',
  backgroundColor: 'rgba(0,0,0,0)',
  borderLeftColor: 'rgba(0,0,0,0)',
  borderRightColor: 'rgba(0,0,0,0)',
  borderBottomColor: 'rgba(0,0,0,0)',
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
  }
  style: ViewStyle = this.props.style || {};
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
  }) {
    this.stopAnimation();
    const { style, easing, duration, fps } = option;
    const framePerSec = (fps || 60);
    let progress = 0;
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

    const start = (onComplete?: () => any) => {
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

  componentWillUnmount() {
    this.animations.forEach((intervalId) => clearInterval(intervalId))
  }

  render() {
    const {props, ref} = this;
    return (
      <View ref={ref} style={props.style}>
        {props.children}
      </View>
    )
  }
}

export default NativeRefBox
