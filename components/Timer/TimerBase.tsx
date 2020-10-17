import React from 'react';
import {Animated, Easing, TextInput} from 'react-native';
import styled, {css} from 'styled-components';
import utils from './utils';
import { timer } from 'd3';

const TimeTextCss = css`
  padding: 0;
  margin: 0;
`;

const Integer: typeof TextInput = styled(TextInput)`
  ${TimeTextCss}
`;

const Decimal: typeof TextInput = styled(TextInput)`
  ${TimeTextCss}
`;

type TimerProps = {
  integerSize: number;
  decimalSize: number;
  iconSize: number;
  color: string;
  fontWeight?: 'bold' | 'normal';
  duration: number;
  alertAt: number;
  onStart?: () => void;
  onFinish?: () => void;
  onAlert?: () => void;
  onReady?: () => void;
  auto?: boolean;
  roundTo?: number;
  fps?: number;
};

class TimerBase extends React.Component<TimerProps, {}> {
  static defaultProps: {
    iconName: string;
    integerSize: number;
    iconSize: number;
    decimalSize: number;
    color: string;
    fontWeight: string;
  };

  startTriggered: boolean;
  alertTriggered: boolean;
  finishTriggered: boolean;
  leftTime: number;

  constructor(props: TimerProps) {
    super(props);
    this.setState = this.setState.bind(this);
    this.startTriggered = false;
    this.alertTriggered = false;
    this.finishTriggered = false;
    this.leftTime = props.duration;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.animateTimerTo = this.animateTimerTo.bind(this);
    this.onUpdateTimer = this.onUpdateTimer.bind(this);
  }

  interval: null | NodeJS.Timeout = null;
  private isIntReady = false;
  private isDecimalReday = false;
  private integerRef = React.createRef<TextInput>();
  private decimalRef = React.createRef<TextInput>();
  private onReadyDispatched = false;
  private startedTimer = false;

  componentDidMount() {
    const {props} = this;
    if (props.auto) {
      this.startTimer()
    }
  }

  startTimer() {
    this.animateTimerTo(0);
  }

  animateTimerTo(time: number) {
    const { props } = this;
    const fps = props.fps || 60
    this.stopTimer();
    if (!this.startedTimer) {
      this.startedTimer = true;
      this.interval = setInterval(() => {
        if (this.leftTime <= time && this.interval) {
          clearInterval(this.interval);
          this.leftTime = time;
        }
        if (this.leftTime > 0) {
          this.leftTime -= 1 / fps;
        }
        setTimeout(this.onUpdateTimer, 0)
      }, 1000 / fps)
    }
  }

  onUpdateTimer() {
    const {leftTime: value, props} = this;
    const {integerRef, decimalRef} = this;

    const { integer, decimal } = utils.prettyTime(value, props.roundTo !== undefined ? props.roundTo : 3);
    integerRef.current?.setNativeProps({ text: integer });
    if (props.roundTo !== undefined && props.roundTo > 0) {
      decimalRef.current?.setNativeProps({ text: '.' + decimal });
    } else {
      decimalRef.current?.setNativeProps({ text: '' });
    }

    if (value === props.duration && props.onStart && !this.startTriggered) {
      props.onStart();
      this.startTriggered = true;
    }

    if (value < props.alertAt && props.onAlert && !this.alertTriggered) {
      props.onAlert();
      this.setState({
        iconName: 'clock-alert',
      });
      this.alertTriggered = true;
    }

    if (value === 0 && props.onFinish && !this.finishTriggered) {
      props.onFinish();
      this.finishTriggered = true;
    }
  }

  setTimeTo(time: number) {
    this.stopTimer();
    this.leftTime = time;
    this.onUpdateTimer();
  }

  stopTimer() {
    const {props} = this;
    if (props.roundTo === 0 && this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.startedTimer = false;
    }
  }

  componentWillUnmount() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  checkIfTextReady() {
    const {isDecimalReday, isIntReady, onReadyDispatched, props} = this;
    let isReady = false;
    if (isIntReady && isDecimalReday) {
      isReady = true;
      if (!onReadyDispatched && props.onReady) {
        this.onReadyDispatched = true;
        props.onReady();
      } 
    }
    return isReady;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {props, integerRef, decimalRef} = this;
    const integerTextLayout = utils.disectFontLayout(props.integerSize);
    const decimalTextLayout = utils.disectFontLayout(props.decimalSize);
    return (
      <>
        <Integer
          ref={integerRef}
          editable={false}
          onLayout={() => {
            this.isIntReady = true;
            this.checkIfTextReady();
          }}
          style={{
            fontSize: props.integerSize,
            color: props.color,
            fontWeight: props.fontWeight,
          }}
        />
        <Decimal
          ref={decimalRef}
          editable={false}
          onLayout={() => {
            this.isDecimalReday = true;
            this.checkIfTextReady();
          }}
          style={{
            fontSize: props.decimalSize,
            color: props.color,
            fontWeight: props.fontWeight,
            marginBottom:
              integerTextLayout._paddingBottom -
              decimalTextLayout._paddingBottom,
          }}
        />
      </>
    );
  }
}

TimerBase.defaultProps = {
  iconName: 'clock',
  integerSize: 70,
  iconSize: 30,
  decimalSize: 30,
  color: 'black',
  fontWeight: 'bold',
};

export default TimerBase;
