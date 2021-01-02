import Constants from "@assets/Constants";
import { BlockStack2021Props } from "@components/BlockStack2021";
import { Transform } from "@utils/Animated";
import { Easing } from "react-native";
import { Animated } from "react-native";
import { StackStatus } from "src/model/BlockStackModel";

const undockHeight = 20;

type BlockTransform = {
  [K in keyof Transform]: Animated.Value;
};

type BlockAnimation = (transform: BlockTransform, scale: number) => Animated.CompositeAnimation

const stopTransformAnimation = (transform: BlockTransform) => Object.values(transform).forEach((animated) => animated.stopAnimation());
const resetTransform = (transform: BlockTransform) => {
  transform.rotate.setValue(0);
  transform.opacity.setValue(1);
  transform.scaleY.setValue(1);
  transform.scaleX.setValue(1);
  transform.y.setValue(0);
  transform.x.setValue(0);
}

const squashy: {[T in StackStatus]: BlockAnimation} = {
  dock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.sequence([
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
    ])
  },
  docked: (transform) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    return Animated.timing(transform.y, {toValue: 0, useNativeDriver: true, duration: 0})
  },
  undock: (transform, scale) => {
    stopTransformAnimation(transform);
    // transform.y.setValue(0);
    return Animated.parallel([
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
    ])
  },
  undocked: (transform, scale) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.timing(transform.y, {toValue: -undockHeight * scale, useNativeDriver: true, duration: 0});
  }
}


const stiff: {[T in NonNullable<BlockStack2021Props["status"]>]: BlockAnimation} = {
  dock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.timing(transform.y, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.bounce,
      duration: 500,
    })
  },
  docked: (transform) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    return Animated.timing(transform.y, {toValue: 0, useNativeDriver: true, duration: 0})
  },
  undock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(0);
    return Animated.timing(transform.y, {
      toValue: -undockHeight * scale,
      useNativeDriver: true,
      duration: 100,
    })
  },
  undocked: (transform, scale) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.timing(transform.y, {toValue: -undockHeight * scale, useNativeDriver: true, duration: 0});
  }
}


const none: {[T in NonNullable<BlockStack2021Props["status"]>]: BlockAnimation} = {
  dock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(0);
    return Animated.timing(transform.y, {toValue: 0, useNativeDriver: true, duration: 0})
  },
  docked: (transform) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    return Animated.timing(transform.y, {toValue: 0, useNativeDriver: true, duration: 0})
  },
  undock: (transform, scale) => {
    stopTransformAnimation(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.timing(transform.y, {toValue: 0, useNativeDriver: true, duration: 0})
  },
  undocked: (transform, scale) => {
    stopTransformAnimation(transform);
    resetTransform(transform);
    transform.y.setValue(-undockHeight * scale);
    return Animated.timing(transform.y, {toValue: -undockHeight * scale, useNativeDriver: true, duration: 0});
  }
}


export default {
  squashy,
  stiff,
  none,
}