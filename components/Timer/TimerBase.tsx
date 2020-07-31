import React from 'react';
import {Animated, Easing, TextInput} from 'react-native';
import styled, {css} from 'styled-components';
import utils from './utils';

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
  }

  private timerAnim = new Animated.Value(this.props.duration);
  private integerRef = React.createRef<TextInput>();
  private decimalRef = React.createRef<TextInput>();

  componentDidMount() {
    const {timerAnim, props, integerRef, decimalRef} = this;

    timerAnim.addListener((animState) => {
      const {value} = animState;
      this.leftTime = value;

      const {integer, decimal} = utils.prettyTime(value, 3);
      integerRef.current?.setNativeProps({text: integer});
      decimalRef.current?.setNativeProps({text: '.' + decimal});

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
    });

    Animated.timing(timerAnim, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: this.leftTime * 1000,
    }).start();
  }

  componentWillUnmount() {
    const {timerAnim} = this;
    timerAnim.removeAllListeners();
    timerAnim.stopAnimation();
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
          style={{
            fontSize: props.integerSize,
            color: props.color,
            fontWeight: props.fontWeight,
          }}
        />
        <Decimal
          ref={decimalRef}
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
