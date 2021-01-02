import React from "react";
import { Animated } from "react-native";

const useTransform = () => {
  const transform = React.useRef({
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    scaleX: new Animated.Value(1),
    scaleY: new Animated.Value(1),
    opacity: new Animated.Value(1),
    rotate: new Animated.Value(0),
  }).current;
  return transform;
}

export default useTransform;