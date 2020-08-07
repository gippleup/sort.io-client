import React, {Component} from 'react';
import {Text, View, TextStyle, Animated} from 'react-native';
import DynamicText from '../DynamicText';
import {prettyPercent} from './utils';

type AnimatedRateTextProps = {
  style?: TextStyle;
  initialValue?: number;
  roundOn?: number;
  prefix?: string;
  postfix?: string;
};

export class AnimatedRateText extends Component<AnimatedRateTextProps> {
  _textRef = React.createRef<DynamicText>();
  _textAnim = new Animated.Value(0);
  constructor(props: Readonly<AnimatedRateTextProps>) {
    super(props);
    const initialValue = props.initialValue || 0;
    this._textAnim.addListener((state) => {
      const defaultRoundPosition = 2;
      const roundOn = props.roundOn || defaultRoundPosition;
      const prettyRate = prettyPercent(state.value, roundOn);
      const prefix = props.prefix || '';
      const postfix = props.postfix || '';
      const resultText = prefix + prettyRate + postfix;
      this.setText(resultText);
    });
    this._textAnim.setValue(initialValue);
  }

  setText(text: string) {
    if (this._textRef.current) {
      this._textRef.current.setText(text);
    }
  }

  animateTo(rate: number) {
    return Animated.timing(this._textAnim, {
      toValue: rate,
      useNativeDriver: false,
    });
  }

  render() {
    const {props, _textRef} = this;
    return (
      <DynamicText
        ref={_textRef}
        style={props.style}
        value={String(props.initialValue)}
      />
    );
  }
}

export default AnimatedRateText;
