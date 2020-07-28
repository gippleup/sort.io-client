import React from 'react';
import { View, Text, Animated, Easing, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import styled, {css} from 'styled-components';
import utils from './Timer/utils';
import { createNativeWrapper } from 'react-native-gesture-handler';


const TimerContainer: typeof View = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  background-color: red;
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

type TimerProps = {
  integerSize: number;
  decimalSize: number;
  color: string;
  fontWeight?: 'bold' | 'normal';
  duration: number;
  onFinish: () => void;
};
const Timer: React.FC<TimerProps> = (props) => {
  const leftTime = React.useRef(props.duration);
  const timerAnim = React.useRef(new Animated.Value(props.duration)).current;
  const integerRef = React.createRef<TextInput>();
  const decimalRef = React.createRef<TextInput>();
  const integerTextLayout = utils.disectFontLayout(props.integerSize);
  const decimalTextLayout = utils.disectFontLayout(props.decimalSize);
  React.useEffect(() => {
    timerAnim.addListener((state) => {
      const {integer, decimal} = utils.prettyTime(state.value);
      integerRef.current?.setNativeProps({text: integer});
      decimalRef.current?.setNativeProps({text: '.' + decimal});
      leftTime.current = state.value;
    });
    Animated.timing(timerAnim, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: leftTime.current * 1000,
    }).start(props.onFinish);
    return () => {
      timerAnim.removeAllListeners();
      timerAnim.stopAnimation();
    };
  }, [decimalRef, integerRef, props, timerAnim]);
  return (
    <TimerContainer>
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
  integerSize: 70,
  decimalSize: 30,
  color: 'black',
  fontWeight: 'bold',
};

export default Timer;
