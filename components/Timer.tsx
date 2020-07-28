import React from 'react';
import { View, Text, Animated, Easing, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled, {css} from 'styled-components';
import utils from './Timer/utils';


const TimerContainer: typeof View = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

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
};
const Timer: React.FC<TimerProps> = (props) => {
  const leftTime = React.useRef(props.duration);
  const timerAnim = React.useRef(new Animated.Value(props.duration)).current;
  const alertTriggered = React.useRef(false);
  const [iconName, setIconName] = React.useState('clock');
  const integerRef = React.createRef<TextInput>();
  const decimalRef = React.createRef<TextInput>();
  const integerTextLayout = utils.disectFontLayout(props.integerSize);
  const decimalTextLayout = utils.disectFontLayout(props.decimalSize);
  React.useEffect(() => {
    timerAnim.addListener((state) => {
      if (state.value === props.duration && props.onStart) {
        props.onStart();
      }
      const {integer, decimal} = utils.prettyTime(state.value, 3);
      integerRef.current?.setNativeProps({text: integer});
      decimalRef.current?.setNativeProps({text: '.' + decimal});
      leftTime.current = state.value;
      if (
        !alertTriggered.current &&
        leftTime.current < props.alertAt &&
        props.onAlert
      ) {
        props.onAlert();
        alertTriggered.current = true;
        setIconName('clock-alert');
      }
      if (leftTime.current === 0 && props.onFinish) {
        props.onFinish();
      }
    });
    Animated.timing(timerAnim, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: leftTime.current * 1000,
    }).start();
    return () => {
      timerAnim.removeAllListeners();
      timerAnim.stopAnimation();
    };
  }, [decimalRef, integerRef, props, timerAnim]);
  return (
    <TimerContainer>
      <StyledIcon
        name={iconName}
        size={props.iconSize}
        color={props.color}
        style={{marginBottom: integerTextLayout._paddingBottom}}
      />
      <Integer
        onLayout={(e) => console.log(e.nativeEvent.layout)}
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
          marginBottom: integerTextLayout._paddingBottom - decimalTextLayout._paddingBottom,
        }}
      />
    </TimerContainer>
  );
};

Timer.defaultProps = {
  iconName: 'clock',
  integerSize: 70,
  iconSize: 30,
  decimalSize: 30,
  color: 'black',
  fontWeight: 'bold',
};

export default Timer;
