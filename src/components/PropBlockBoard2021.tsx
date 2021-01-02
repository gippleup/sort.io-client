import React from 'react'
import { View, Text } from 'react-native'
import { BlockBoardStackData } from 'src/model/BlockBoardModel';
import { StackStatus } from 'src/model/BlockStackModel';
import { SupportedSkin } from './Block/skinMap';
import { BlockTypes } from './Block/Types';
import BlockStack2021 from './PropBlockStack2021';
import { FlexHorizontal } from './Generic/StyledComponents';

type BlockBoard2021Props = {
  data: BlockBoardStackData[];
  skin?: SupportedSkin;
  scale?: number;
  onDock?: (stackIndex: number) => any;
  onUndock?: (stackIndex: number) => any;
  undockedStackIndex?: number;
}

const BlockBoard2021: React.FC<BlockBoard2021Props> = (props) => {
  const {
    data,
    skin,
    scale,
    onDock = () => {},
    onUndock = () => {},
    undockedStackIndex,
  } = props;

  const renderStack = (stackData: BlockBoardStackData, i: number) => {
    const {stack, status} = stackData;
    return (
      <View key={i} onTouchStart={undockedStackIndex === undefined ? () => onUndock(i) : () => onDock(i)}>
        <BlockStack2021
          stack={stack}
          status={status}
          skin={skin}
          scale={scale}
          max={stack.length}
          animationType="squashy"
        />
      </View>
    )
  }

  return (
    <View>
      <FlexHorizontal style={{alignItems: "flex-end", flexWrap: "wrap"}}>
        {data.map(renderStack)}
      </FlexHorizontal>
    </View>
  )
}

export default BlockBoard2021;
