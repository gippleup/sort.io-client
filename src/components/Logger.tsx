import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

type LoggerProps = {
  messageRenderer: (data: any, i: number) => JSX.Element;
  style?: ViewStyle;
  onAddMessage?: (message: any) => any;
}

type LoggerState = {
  messages: any[];
}

class Logger extends React.Component<LoggerProps, LoggerState> {
  // scrollViewRef = React.createRef<ScrollView>();

  constructor(props: Readonly<LoggerProps>) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  addMessage(message: any) {
    const {props} = this;
    const {messages} = this.state;
    this.setState({
      messages: [...messages, message]
    })
    setTimeout(() => {
      if (props.onAddMessage) {
        props.onAddMessage(message);
      }
    })
  }

  componentDidUpdate() {
  }

  render() {
    const {props, state} = this;
    return (
      <View style={props.style}>
        {state.messages.map((message, i) => props.messageRenderer(message, i))}
      </View>
    )
  }
}

export default Logger
