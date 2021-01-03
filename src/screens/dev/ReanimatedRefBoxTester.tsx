import useClock from '@hooks/reanimated/useClock';
import chroma from 'chroma-js';
import { touch } from 'd3';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { abs, add, and, block, Clock, clockRunning, cond, debug, Easing, eq, Extrapolate, interpolate, neq, set, spring, startClock, stopClock, sub, timing, useValue, Value } from 'react-native-reanimated'

const PARTICLE_SPREAD = 100;
const PARTICLE_COUNT = 100;

const runTimingFromTo = (
  from: number | Animated.Value<number> | Animated.Node<number>,
  to: number | Animated.Value<number> | Animated.Node<number>,
  gestureState: Animated.Value<number>,
  randomiser: number,
) => {
  const clock = new Clock();
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue: new Value(-1),
    duration: new Value(300),
    easing: Easing.inOut(Easing.ease),
  };

  const randomisedTo = add(sub(to, randomiser / 2), Math.random() * randomiser);
  return block([
    cond(and(eq(gestureState, State.BEGAN), neq(state.time, 0)), [
      stopClock(clock),
    ]),
    cond(eq(gestureState, State.BEGAN), [
      set(config.duration, 300),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(state.position, from),
      set(config.toValue, randomisedTo),
      startClock(clock),
    ]),
    cond(and(state.finished, eq(config.toValue, randomisedTo)), [
      set(config.duration, 600),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, from),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(and(state.finished, eq(config.toValue, from)),
      stopClock(clock),
    ),
    state.position,
  ]);
}

const ReanimatedRefBoxTester = () => {
  const gestureState: Animated.Value<number> = useValue(-1);
  const touchX: Animated.Value<number> = useValue(-1);
  const touchY: Animated.Value<number> = useValue(-1);
  const particleTransforms = Array(PARTICLE_COUNT).fill(0).map(() => ({
    translateX: runTimingFromTo(
      sub(touchX, PARTICLE_SIZE / 2),
      sub(touchX, PARTICLE_SIZE / 2),
      gestureState,
      PARTICLE_SPREAD,
    ),
    translateY: runTimingFromTo(
      sub(touchY, PARTICLE_SIZE / 2),
      sub(touchY, PARTICLE_SIZE / 2),
      gestureState,
      PARTICLE_SPREAD,
    ),
    scale: runTimingFromTo(
      0,
      1,
      gestureState,
      0.5,
    ),
  }))

  const onHandlerStateChange = (e: PanGestureHandlerGestureEvent) => {
    const {absoluteX, absoluteY, state} = e.nativeEvent;
    touchX.setValue(absoluteX);
    touchY.setValue(absoluteY);
    gestureState.setValue(state);
    // console.log(touchX._value, touchY._value, gestureState._value)
    Object.entries(State).forEach(([key, index]) => {
      if (index === state) console.log(key);
    })
  }

  return (
    <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.container}>
        {Array(PARTICLE_COUNT).fill(0).map((_, i) => {
          const color = chroma.random();
          const {translateX, translateY, scale} = particleTransforms[i]

          return (
            <Animated.View key={i} style={[styles.box, {
              transform: [
                {translateX},
                {translateY}
              ]
            }]}>
              <Animated.View style={[styles.box, {
                backgroundColor: color.hex(),
                borderColor: color.darken().hex(),
                borderWidth: 1,
                transform: [
                  {scale}
                ]
              }]} />
            </Animated.View>
          )
        })}
      </View>
    </PanGestureHandler>
  )
}

const PARTICLE_SIZE = 10;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "lightgrey",
  },
  box: {
    position: "absolute",
    width: PARTICLE_SIZE,
    height: PARTICLE_SIZE,
    borderRadius: PARTICLE_SIZE / 2,
  }
})

export default ReanimatedRefBoxTester
