import React from 'react'
import { View, Text } from 'react-native'
import Block from '@components/Block'
import { SupportedSkin } from '@components/Block/skinMap'
import { BlockParts, BlockTypes } from '@components/Block/Types'
import NativeRefBox from '@components/NativeRefBox'

type BlockQueueOption = {
  type: BlockTypes;
  part: BlockParts;
  skin: SupportedSkin;
}

type QueuedBlock = BlockQueueOption & {
  id: number;
}

type BlockGeneratorProps = {
  initialFeed?: number[][];
}

type BlockGeneratorState = {
  renderTarget: QueuedBlock[];
}

class BlockGenerator extends React.Component<BlockGeneratorProps, BlockGeneratorState> {
  boxRef = React.createRef<NativeRefBox>();
  queue: QueuedBlock[] = [];
  lastBlockId = 0;
  constructor(props: Readonly<BlockGeneratorProps>) {
    super(props);
    this.state = {
      renderTarget: [],
    }
  }

  addBlockToQueue(option: BlockQueueOption) {
    const {lastBlockId} = this;
    this.queue = this.queue.concat({...option, id: lastBlockId});
    this.lastBlockId = lastBlockId + 1;
  }

  renderQueue(count: number) {
    const {renderTarget} = this.state;
    const updateTarget = this.queue.slice(0, count);
    this.queue = this.queue.slice(count, this.queue.length);
    this.setState({
      renderTarget: renderTarget.concat(updateTarget),
    })
  }

  removeBlockByCallback(shouldDie: (ele: QueuedBlock) => boolean) {
    this.queue = this.queue.filter((option) => !shouldDie(option));
  }

  removeBlockById(id: number) {
    this.removeBlockByCallback((option) => option.id !== id)
  }

  removeBlockByType(type: number) {
    this.removeBlockByCallback((option) => option.type !== type)
  }

  renderBlockFromOption(option: QueuedBlock) {
    const {id, part, skin, type} = option;
    return (
      <NativeRefBox key={`block${id}`}>
        <Block
          skin={skin}
          part={part}
          type={type}
        />
      </NativeRefBox>
    )
  }

  render() {
    const {boxRef, state, renderBlockFromOption} = this;
    const {renderTarget} = state;
    return (
      <View>
        {renderTarget.map(renderBlockFromOption)}
      </View>
    )
  }
}

export default BlockGenerator
