import { usePrevious } from '@hooks/usePrevious'
import useTransform from '@hooks/useTransform'
import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { StackStatus } from 'src/model/BlockStackModel'
import { SupportedSkin } from './Block/skinMap'
import { BlockTypes } from './Block/Types'
import Block2021 from './PropBlock2021'
import BlockFrame from './BlockStack/BlockFrame'
import animations from './BlockStack2021/animations'

export type BlockStack2021Props = {
  stack: BlockTypes[];
  skin?: SupportedSkin;
  status?: StackStatus;
  scale?: number;
  max?: number;
  completed?: boolean;
  animationType?: "stiff" | "squashy" | "none";
}

const BlockStack2021: React.FC<BlockStack2021Props> = (props) => {
  const {
    stack,
    skin = "basic",
    status = "docked",
    scale = 1,
    max,
    completed,
    animationType = "squashy"
  } = props;
  const prevProps = usePrevious(props);
  const capTransform = useTransform();
  const topPieceTransform = useTransform();
  const existingBlocks = stack.filter((block) => block !== -1);

  const renderBlock = (block: number, i: number) => {
    return (
      <Block2021
        key={i}
        skin={skin}
        part="piece"
        scale={scale}
        type={block}
        transform={i === existingBlocks.length - 1 ? topPieceTransform : undefined}
      />
    )
  }

  React.useEffect(() => {
    const pieceAnimation = animations[animationType][status](topPieceTransform, scale);
    const capAnimation = animations[animationType][status](capTransform, scale);
    capTransform.opacity.setValue(status === "dock" ? 0 : 1);
    Animated.parallel([
      status === "dock" ? pieceAnimation : capAnimation,
      Animated.sequence([
        Animated.delay(100),
        Animated.parallel([
          Animated.timing(capTransform.opacity, {
            toValue: status === "dock" ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          status === "dock" ? capAnimation : pieceAnimation,
        ])
      ])
    ]).start();
  }, [stack, completed, status])

  return (
    <View style={{justifyContent: "flex-end"}}>
      <BlockFrame
        style={{...styles.frame, opacity: max === undefined ? 0 : 1}}
        pieceCount={max || 0} scale={scale}
      />
      <View style={{position: "absolute"}}>
        <View style={{opacity: completed ? 1 : 0, zIndex: 10}}>
          <Block2021 skin={skin} part="top" scale={scale} type={existingBlocks[0]} transform={capTransform} />
        </View>
        <View style={{flexDirection: "column-reverse"}}>
          {existingBlocks.map(renderBlock)}
        </View>
        <View style={{zIndex: -1}}>
          <Block2021 skin={skin} part="bottom" scale={scale} type={existingBlocks[0]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {backgroundColor: "rgba(0,0,0,0.5)", zIndex: -1},
})

export default React.memo(BlockStack2021);
