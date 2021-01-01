import React from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { NoUndefinedField } from '@types/utilTypes';
import NativeRefBox from './NativeRefBox';
import { Easings } from './NativeRefBox/easings';

export type AnimateRateOption = {
  from: number;
  to: number;
  duration: number;
  onStart?: () => any;
  easing: Easings;
  onStop?: (progress: number) => any;
  onFinish?: () => any;
}

export type FillBarOption = {
  from: number;
  to: number;
  duration: number;
  onStart?: () => any;
  onFinish?: () => any;
}

export type TimerBarProps = {
  duration?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  fps?: number;
  onFinish?: () => any;
  timerInterval?: number;
  shellFill?: string;
}

class TimerBar extends React.Component<TimerBarProps> {
  assembledProp: NoUndefinedField<TimerBarProps>;
  shellRef = React.createRef<NativeRefBox>();
  boxRef = React.createRef<NativeRefBox>();
  timer: NodeJS.Timer | null = null;
  leftTime: number;
  constructor(props: Readonly<TimerBarProps>) {
    super(props);
    this.assembledProp = Object.assign({}, TimerBar.defaultProps, this.props)
    const {duration} = this.assembledProp;
    this.leftTime = duration;

    this.initialize = this.initialize.bind(this);
    this.setWidthToRate = this.setWidthToRate.bind(this);
    this.getRateToLeftTime = this.getRateToLeftTime.bind(this);
    this.setWidthToLeftTime = this.setWidthToLeftTime.bind(this);
    this.animateLeftTimeFromTo = this.animateLeftTimeFromTo.bind(this);
    this.animateRateFromTo = this.animateRateFromTo.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  static defaultProps: NoUndefinedField<TimerBarProps> = {
    fill: "dodgerblue",
    height: 30,
    stroke: "black",
    strokeWidth: 1,
    width: 300,
    duration: 40,
    fps: 60,
    timerInterval: 1,
    onFinish: () => {},
    shellFill: "royalblue",
  }

  fillBar(option: FillBarOption) {
    const {duration, from, to, onStart, onFinish} = option;
    const {width} = this.assembledProp;
    return this.boxRef.current?.animate({
      onStart: () => {
        if (onStart) onStart();
        this.boxRef.current?.setStyle({width: width * from});
      },
      style: {width: width * to},
      duration: duration,
      easing: "easeOutSine",
      onFinish,
    });
  }

  setColor(option: {bar: string; shell: string}) {
    const {bar, shell} = option;
    this.boxRef.current?.setStyle({backgroundColor: bar})
    this.shellRef.current?.setStyle({backgroundColor: shell})
  }

  initialize() {
    const {duration} = this.assembledProp;
    this.leftTime = duration;
    if (this.timer) clearInterval(this.timer);
  }

  /**Rate should be between 0 and 1*/
  setWidthToRate(rate: number) {
    const {width} = this.assembledProp;
    this.boxRef.current?.setStyle({
      width: width * Math.max(Math.min(rate === NaN ? 0 : rate, 1), 0),
    })
  }
  
  getRateToLeftTime(leftTime: number) {
    const {duration} = this.assembledProp;
    const rate = leftTime / duration;
    return rate;
  }

  setWidthToLeftTime(leftTime: number) {
    const rate = this.getRateToLeftTime(leftTime);
    this.setWidthToRate(rate);
  }

  animateLeftTimeFromTo(from: number, to: number) {
    const rateFrom = this.getRateToLeftTime(from);
    const rateTo = this.getRateToLeftTime(to);
    this.animateRateFromTo({
      from: rateFrom,
      to: rateTo,
      duration: from - to,
      easing: "linear",
    });
  }

  animateRateFromTo(option: AnimateRateOption) {
    const {duration, easing, from, to, onStart, onStop, onFinish} = option;
    const {width, fps} = this.assembledProp;
    let startedAt: number;
    return this.boxRef.current?.animate({
      onStart: (unixTimeStamp: number) => {
        startedAt = unixTimeStamp;
        if (onStart) onStart();
        this.boxRef.current?.setStyle({
          width: from * width,
        });
      },
      style: {
        width: to * width,
      },
      duration: duration * (from - to),
      easing: easing,
      fps,
      onStop: (unixTimeStamp: number) => {
        const timeDiff = unixTimeStamp - startedAt;
        const progress = from - timeDiff / duration;
        if (onStop) onStop(progress);
      },
      onFinish,
    })
  }

  startTimer() {
    const {duration, timerInterval, onFinish} = this.assembledProp;
    this.stopTimer();
    this.timer = setInterval(() => {
      if (this.leftTime - timerInterval > 0) {
        const from = this.leftTime;
        const to = this.leftTime - timerInterval;
        this.leftTime = to;
        this.animateLeftTimeFromTo(from, to);
      } else {
        this.stopTimer();
        this.leftTime = 0;
        this.setWidthToLeftTime(0);
        if (onFinish) onFinish();
      }
    }, timerInterval * 1000)
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  componentWillUnmount() {
    this.stopTimer();
  }
  
  render() {
    const {boxRef, shellRef} = this;
    const {
      width,
      height,
      stroke,
      strokeWidth,
      fill,
      shellFill,
    } = this.assembledProp;
    return (
      <View>
        <NativeRefBox
          ref={shellRef}
          style={{
            width,
            height,
            borderWidth: strokeWidth,
            borderColor: stroke,
            backgroundColor: shellFill,
          }}
        />
        <NativeRefBox
          style={{
            position: "absolute",
            width,
            height,
            borderWidth: strokeWidth,
            borderColor: stroke,
            backgroundColor: fill,
          }}
          ref={boxRef}
        />
      </View>
    )
  }
}

export default TimerBar
