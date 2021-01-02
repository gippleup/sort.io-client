import BlockBoard2021, { BlockBoardStackData } from '@components/BlockBoard2021'
import useBlockBoard from '@hooks/useBlockBoard'
import React from 'react'
import { View } from 'react-native'

const BlockBoard2021Tester = () => {
  const [board, dock, undock] = useBlockBoard({
    blockStackCount: 10,
    colorCount: 6,
    maxScore: 8,
    stackLengthMax: 8,
    stackLengthMin: 3
  });

  const onDock = React.useCallback((stackIndex) => {
    dock(stackIndex);
  }, [board]);

  const onUndock = React.useCallback((stackIndex) => {
    undock(stackIndex);
  }, [board])

  return (
    <View>
      <BlockBoard2021
        undockedStackIndex={board.undockedStackIndex}
        data={board.stackDataForProps}
        scale={1}
        skin="baby"
        onDock={onDock}
        onUndock={onUndock}
      />
    </View>
  )
}

export default BlockBoard2021Tester
