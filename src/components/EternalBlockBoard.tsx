import React from 'react'
import { View, Text } from 'react-native'
import { BlockParts } from './Block/Types';
import { pickRandomFromArray } from './Block/utils';
import BlockGenerator from './EternalBlockBoard/BlockGenerator';

type EternalBlockBoardProps = {

}

class EternalBlockBoard extends React.Component<EternalBlockBoardProps>{
  generatorRef = React.createRef<BlockGenerator>();

  constructor(props: Readonly<EternalBlockBoardProps>) {
    super(props);
  }

  componentDidMount() {
    const {generatorRef} = this;
    setInterval(() => {
      generatorRef.current?.addBlockToQueue({
        part: "piece",
        skin: "baby",
        type: pickRandomFromArray([0, 1, 2, 3, 4, 5]),
      });
      generatorRef.current?.renderQueue(1);
    }, 1000)
  }

  render() {
    const {generatorRef} = this;

    return (
      <View>
        <BlockGenerator ref={generatorRef} />
      </View>
    )
  }
}

export default EternalBlockBoard
