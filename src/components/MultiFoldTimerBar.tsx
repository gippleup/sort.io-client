import chroma from 'chroma-js';
import React from 'react'
import { View, Text } from 'react-native'
import { NoUndefinedField } from '@types/utilTypes';
import NativeRefBox, { RefAnimation } from './NativeRefBox';
import { Easings } from './NativeRefBox/easings';
import TimerBar, { TimerBarProps } from './TimerBar';

type StartPhaseOption = {
  phase: number;
  from: number;
  onStart?: () => any;
  onFinish?: (phase: number) => any;
}

type MultiFoldTimerBarProps = Omit<TimerBarProps, "timerInterval"> & {
  foldCount?: number;
  acc?: number;
  colorScale?: string[];
  easing?: Easings;
  onBarEnd?: (phase: number) => any;
  onBarFilled?: (filledBarCount: number) => any;
}

class MultiFoldTimerBar extends React.Component<MultiFoldTimerBarProps>{
  assembledProp: NoUndefinedField<MultiFoldTimerBarProps>;
  timerRef = React.createRef<TimerBar>();
  speeds: number[];
  durations: number[];
  initialDuration: number;
  stoppedPhase: {
    index: number;
    stoppedAt: number;
  };
  barColors: string[];
  sequence: RefAnimation | null = null;
  timeThresholds: number[];
  constructor(props: Readonly<MultiFoldTimerBarProps>) {
    super(props);
    const {defaultProps} = MultiFoldTimerBar;
    this.assembledProp = Object.assign({}, defaultProps, props);
    const {acc, foldCount, duration, colorScale} = this.assembledProp;
    this.initialDuration = duration * acc / (1 - Math.pow(1 - acc, foldCount + 1));
    this.speeds = Array(foldCount).fill(1).map((_, i) => Math.pow(1 + acc, i))
    this.durations = this.speeds.map((speed, i) => this.initialDuration / speed);
    this.fillBars = this.fillBars.bind(this);
    this.stoppedPhase = {
      index: 0,
      /**@param stoppedAt this indicated width rate not progress */
      stoppedAt: 1,
    };
    this.barColors = Array(foldCount)
      .fill(1)
      .map((_, i) => chroma.scale(colorScale)(i / (foldCount - 1)).hex());
    this.timeThresholds = this.durations
      .map((_, i) => this.durations.reduce((acc, ele, j) => j <= i ? acc + ele : acc))
  }

  static defaultProps: NoUndefinedField<MultiFoldTimerBarProps> = {
    ...TimerBar.defaultProps,
    acc: 0.1,
    foldCount: 5,
    colorScale: ["mediumseagreen", "orange", "red"],
    shellFill: "grey",
    duration: 10,
    width: 300,
    fps: 30,
    easing: "linear",
    onBarEnd: () => {},
    onBarFilled: () => {},
  }

  initialize() {
    this.stopTimer();
    this.stoppedPhase = {
      index: 0,
      stoppedAt: 1,
    }
    this.timerRef.current?.setColor({
      bar: this.barColors[0],
      shell: this.barColors[1] || this.assembledProp.shellFill,
    })
    this.timerRef.current?.setWidthToRate(1);
  }

  fillBars() {
    const {shellFill, foldCount, onBarFilled} = this.assembledProp;
    const {barColors} = this;
    const reversedColors = barColors.slice(0).reverse();
    const tasks = reversedColors.map((color, i) => {
      return this.timerRef.current?.fillBar({
        duration: 1000 / (barColors.length - i),
        from: 0,
        to: 1,
        onStart: () => {
          this.timerRef.current?.setColor({
            bar: color,
            shell: i === 0 ? shellFill : reversedColors[i - 1],
          });
        },
        onFinish: () => {
          onBarFilled(i);
        },
      })
    })
    NativeRefBox.sequence(tasks).start();
  }

  setTimeTo(time: number) {
    const {foldCount, duration} = this.assembledProp;
    const passedTime = duration - time;
    console.log(time);
    if (time <= 0) {
      this.setPhase(foldCount - 1)
      this.timerRef.current?.setWidthToRate(0);
    } else {
      const targetPhase = this.timeThresholds.reduce((result, threshold, i) => {
        if (passedTime > threshold) return i + 1;
        return result;
      }, 0)
      const targetPhaseDuration = this.durations[targetPhase];
      const timePassedFromThreshold = targetPhase > 0
        ? passedTime - this.timeThresholds[targetPhase - 1]
        : passedTime;
      const progress = Math.min(Math.max((timePassedFromThreshold / targetPhaseDuration), 0), 1);
      const widthRate = 1 - progress;
      this.setPhase(targetPhase);
      this.timerRef.current?.setWidthToRate(widthRate);      
    }
  }

  setPhase(phase: number) {
    const {durations, barColors} = this;
    const {foldCount, shellFill, easing} = this.assembledProp;
    const foldIndex = Math.max(Math.min(phase, foldCount - 1), 0);
    const curColor = barColors[foldIndex];
    const nextColor = foldIndex === foldCount - 1 ? shellFill : barColors[foldIndex + 1];
    this.timerRef.current?.setColor({
      bar: curColor,
      shell: nextColor,
    })
  }

  /**phase starts from 0 and end at foldCount - 1 */
  startPhase(option: StartPhaseOption) {
    const {phase, from, onStart, onFinish} = option;
    const {durations, barColors} = this;
    const {foldCount, shellFill, easing} = this.assembledProp;
    const foldIndex = Math.max(Math.min(phase, foldCount - 1), 0);
    const curColor = barColors[foldIndex];
    const nextColor = foldIndex === foldCount - 1 ? shellFill : barColors[foldIndex + 1];
    const duration = durations[foldIndex];
    return this.timerRef.current?.animateRateFromTo({
      from,
      to: 0,
      duration: duration * 1000,
      easing,
      onStart: () => {
        if (onStart) onStart();
        this.timerRef.current?.setColor({
          bar: curColor,
          shell: nextColor,
        })
      },
      onStop: (rate: number) => {
        this.stoppedPhase = {
          index: foldIndex,
          stoppedAt: rate,
        }
      },
      onFinish: () => {
        if (onFinish) onFinish(foldIndex);
      }
    });
  }

  resetTimer() {
    this.stopTimer();
    this.initialize();
  }

  startTimer() {
    const {foldCount, onBarEnd, onFinish} = this.assembledProp;
    const {stoppedPhase} = this;
    const reasonToReturn = [
      this.sequence !== null,
      stoppedPhase.index === foldCount - 1 && stoppedPhase.stoppedAt <= 0,
    ]
    if (reasonToReturn.indexOf(true) !== -1) return;
    this.sequence = NativeRefBox.sequence(
      Array(foldCount - stoppedPhase.index).fill(1).map((_, i) => {
        return this.startPhase({
          phase: stoppedPhase.index + i,
          from: i === 0 ? stoppedPhase.stoppedAt : 1,
          onFinish: (phase: number) => {
            onBarEnd(phase);
          }
        });
      })
    );
    this.sequence.start(onFinish);
  }

  stopTimer() {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence = null;
    }
  }

  render() {
    const {timerRef} = this;
    const {
      duration,
      fill,
      fps,
      height,
      stroke,
      strokeWidth,
      width,
      onFinish,
      shellFill,
    } = this.assembledProp;
    const {barColors} = this;

    return (
      <View>
        <TimerBar
          ref={timerRef}
          duration={duration}
          fill={barColors[0]}
          fps={fps}
          height={height}
          onFinish={onFinish}
          stroke={stroke}
          strokeWidth={strokeWidth}
          width={width}
          shellFill={shellFill}
        />
      </View>
    )
  }
}

export default MultiFoldTimerBar
