import React, {Component} from 'react';
import {Text, View, TextStyle, TextInput, TextProps} from 'react-native';

type DynamicTextProps = {
  initialValue?: string;
  renderer: (text: string) => JSX.Element;
}

export class DynamicText extends Component<DynamicTextProps, {text: string}> {
  constructor(props: Readonly<DynamicTextProps>) {
    super(props);
    this.state = {
      text: props.initialValue || '',
    }
  }

  setText(text: string) {
    this.setState({
      text,
    })
  }

  render() {
    const {props} = this;
    return props.renderer(this.state.text);
  }
}

export default DynamicText;
