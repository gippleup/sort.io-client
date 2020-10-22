import React, {Component} from 'react';
import {Text, View, TextStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type DynamicTextProps = {
  value?: string;
  style?: TextStyle;
};

export class DynamicText extends Component<DynamicTextProps> {
  _textInputRef = React.createRef<TextInput>();
  constructor(props: Readonly<DynamicTextProps>) {
    super(props);
  }

  setText(text: string) {
    if (this._textInputRef.current) {
      this._textInputRef.current.setNativeProps({text});
    }
  }

  static defaultProps = {
    style: {
      color: 'black',
    },
  };

  render() {
    const {props, _textInputRef} = this;
    return (
      <TextInput
        children={props.children}
        ref={_textInputRef}
        value={props.value}
        editable={false}
        style={props.style}
      />
    );
  }
}

export default DynamicText;
