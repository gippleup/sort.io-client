import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Block2021Props } from './PropBlock2021';
import { BlockStack2021Props } from './PropBlockStack2021'

export class RefBlockStack2021 extends Component<BlockStack2021Props> {
  stack: React.FC<Block2021Props>[] = [];
  constructor(props: Readonly<BlockStack2021Props>) {
    super(props);
    const {stack, skin, completed, max, scale, status} = props;
    // this.stack = stack.map((block) => ())
  }

  render() {
    const {props} = this;
    const {stack, skin, completed, max, scale, status} = props;
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default RefBlockStack2021
