import React from 'react'
import { View, Text, ViewStyle } from 'react-native'

type LoggerProps = {
  messageRenderer: (data: any, i: number) => JSX.Element;
  style?: ViewStyle
}

type LoggerState = {
  messages: any[];
}

class Logger extends React.Component<LoggerProps, LoggerState> {
  constructor(props: Readonly<LoggerProps>) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  addMessage(message: any) {
    const {messages} = this.state;
    this.setState({
      messages: [...messages, message]
    })
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
