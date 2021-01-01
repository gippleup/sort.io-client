import {Animated} from "react-native";

export type Transform = {
  x: Animated.Value | number;
  y: Animated.Value | number;
  opacity: Animated.Value | number;
  rotate: Animated.Value | string;
  scaleX: Animated.Value | number;
  scaleY: Animated.Value | number;
}