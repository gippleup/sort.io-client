import React from "react";
import Animated from "react-native-reanimated"

const useClock = () => {
  const clock = React.useRef(new Animated.Clock()).current;
  return clock;
}

export default useClock;