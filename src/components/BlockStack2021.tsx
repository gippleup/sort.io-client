import Constants from '@assets/Constants'
import { usePrevious } from '@hooks/usePrevious'
import React from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import { Transform } from 'src/utils/Animated'
import { SupportedSkin } from './Block/skinMap'
import { BlockTypes } from './Block/Types'
import Block2021, {Block2021Props} from './Block2021'
import BlockFrame from './BlockStack/BlockFrame'

type BlockStack2021Props = {
  stack: BlockTypes[];
  skin?: SupportedSkin;
  status?: "dock" | "undock" | "still";
  scale?: number;
  max?: number;
  completed?: boolean;
}

const undockHeight = 20;

type BlockTransform = {
  [K in keyof Transform]: Animated.Value;
};

const stopTransformAnimation = (transform: BlockTransform) => Object.values(transform).forEach((animated) => animated.stopAnimation());
const resetTransform = (transform: BlockTransform) => {
  transform.rotate.setValue(0);
  transform.opacity.setValue(1);
  transform.scaleY.setValue(1);
  transform.scaleX.setValue(1);
  transform.y.setValue(0);
  transform.x.setValue(0);
}

const animate: {[T in NonNullable<BlockStack2021Props["status"]>]: (transform: BlockTransform, scale: number) => void} = {
  dock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(-undockHeight * scale);
    Animated.sequence([
      Animated.parallel([
        Animated.sequence([          
          Animated.parallel([
            Animated.timing(transform.scaleX, {
              toValue: 0.8,
              useNativeDriver: true,
              duration: 100,
            }),
            Animated.timing(transform.scaleY, {
              toValue: 1.2,
              useNativeDriver: true,
              duration: 100,
            }),
          ]),
          Animated.parallel([
            Animated.timing(transform.scaleY, {
              toValue: 0.8,
              useNativeDriver: true,
              duration: 100,
            }),
            Animated.timing(transform.scaleX, {
              toValue: 1.2,
              useNativeDriver: true,
              duration: 100,
            }),
          ])
        ]),
        Animated.timing(transform.y, {
          toValue: Constants.blockHeight.piece * scale / 2,
          useNativeDriver: true,
          duration: 200,
        }),
      ]),
      Animated.parallel([
        Animated.timing(transform.scaleX, {
          toValue: 1,
          easing: Easing.bounce,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(transform.scaleY, {
          toValue: 1,
          useNativeDriver: true,
          easing: Easing.bounce,
          duration: 500,
        }),
        Animated.timing(transform.y, {
          toValue: 0,
          useNativeDriver: true,
          easing: Easing.bounce,
          duration: 500,
        })
      ])
    ]).start();
  },
  still: (transform) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
  },
  undock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(0);
    Animated.parallel([
      Animated.sequence([
        Animated.parallel([
          Animated.timing(transform.scaleX, {
            toValue: 0.8,
            useNativeDriver: true,
            duration: 150,
          }),
          Animated.timing(transform.scaleY, {
            toValue: 1.2,
            useNativeDriver: true,
            duration: 150,
          }),
        ]),
        Animated.parallel([
          Animated.timing(transform.scaleX, {
            toValue: 1.2,
            useNativeDriver: true,
            duration: 150,
          }),
          Animated.timing(transform.scaleY, {
            toValue: 0.8,
            useNativeDriver: true,
            duration: 150,
          }),
        ]),
        Animated.parallel([
          Animated.timing(transform.scaleX, {
            toValue: 1,
            useNativeDriver: true,
            easing: Easing.bounce,
            duration: 300
          }),
          Animated.timing(transform.scaleY, {
            toValue: 1,
            useNativeDriver: true,
            easing: Easing.bounce,
            duration: 300
          })
        ])
      ]),
      Animated.timing(transform.y, {
        toValue: -undockHeight * scale,
        useNativeDriver: true,
        duration: 300,
      }),        
    ]).start();
  },
}

const BlockStack2021: React.FC<BlockStack2021Props> = (props) => {
  const {stack, skin = "basic", status = "still", scale = 1, max, completed} = props;
  // const prevProps = usePrevious(props);
  const transform = React.useRef({
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    scaleX: new Animated.Value(1),
    scaleY: new Animated.Value(1),
    opacity: new Animated.Value(1),
    rotate: new Animated.Value(0),
  }).current;

  const renderBlock = (block: number, i: number) => {
    return (
      <Block2021
        key={i}
        skin={skin}
        part="piece"
        scale={scale}
        type={block}
        transform={i === stack.length - 1 ? transform : undefined}
      />
    )
  }

  React.useEffect(() => {
    animate[status](transform, scale);
  })

  return (
    <View style={{justifyContent: "flex-end"}}>
      <BlockFrame
        style={{...styles.frame, opacity: max === undefined ? 0 : 1}}
        pieceCount={max || 0} scale={scale}
      />
      <View style={{opacity: completed ? 1 : 0, zIndex: 10}}>
        <Block2021 skin={skin} part="top" scale={scale} type={stack[0]} />
      </View>
      <View style={{flexDirection: "column-reverse"}}>
        {stack.map((block, i) => renderBlock(block, i))}
      </View>
      <View style={{zIndex: -1}}>
        <Block2021 skin={skin} part="bottom" scale={scale} type={stack[0]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {backgroundColor: "rgba(0,0,0,0.5)", position: "absolute"},
})

export default BlockStack2021
