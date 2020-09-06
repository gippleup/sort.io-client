import React from 'react';
import {View, Text, Animated, Easing, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled, {css} from 'styled-components';
import utils from './Timer/utils';
import TimerBase from './Timer/TimerBase';

const TimerContainer: typeof View = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

const StyledIcon: typeof Icon = styled(Icon)`
  margin-right: 5px;
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
};

type TimerState = {
  iconName: string;
};

class Timer extends React.Component<TimerProps, TimerState> {
  timerBaseRef = React.createRef<TimerBase>();
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

  state = {
    iconName: 'clock',
  };

  render() {
    const {props, state} = this;
    const integerTextLayout = utils.disectFontLayout(props.integerSize);
    return (
      <TimerContainer>
        <StyledIcon
          name={state.iconName}
          size={props.iconSize}
          color={props.color}
          style={{marginBottom: integerTextLayout._paddingBottom}}
        />
        <TimerBase
          {...props}
          ref={this.timerBaseRef}
          onAlert={() => {
            this.setState({iconName: 'clock-alert'});
            if (props.onAlert) {
              props.onAlert();
            }
          }}
        />
      </TimerContainer>
    );
  }
}

Timer.defaultProps = {
  iconName: 'clock',
  integerSize: 70,
  iconSize: 30,
  decimalSize: 30,
  color: 'black',
  fontWeight: 'bold',
};

export default Timer;
