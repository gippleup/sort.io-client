import React from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import Svg, { Rect, Defs, Use, G, Path, Circle, } from 'react-native-svg';
import chroma from 'chroma-js';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedCheckboxProps = {
  delay?: number;
  checked?: boolean;
  blank?: boolean;
  animated?: boolean;
  onAnimationFinished?: () => any;
}

const AnimatedCheckbox = (props: AnimatedCheckboxProps) => {
  const boxAnim = new Animated.Value(0);
  const boxPathWidth = new Animated.Value(0);
  const rectPath = [
    "M 0 0 l 0 0 l 0 0 l 0 0 l 0 0 l 0 0",
    "M 0 0 l 60 0 l 0 0 l 0 0 l 0 0 l 0 0",
    "M 0 0 l 60 0 l 0 60 l 0 0 l 0 0 l 0 0",
    "M 0 0 l 60 0 l 0 60 l 0 0 l -60 0 l 0 0",
    "M 0 0 l 60 0 l 0 60 l 0 0 l -60 0 l 0 -60",
  ];
  const boxPath = boxAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: rectPath,
  })

  const okPath = [
    "M 10 25 l 0 0 l 0 0",
    "M 10 25 l 15 20 l 0 0",
    "M 10 25 l 15 20 l 25 -30",
  ];

  const failPath = [
    "M 15 15 l 0 0 M 0 0 l 0 0",
    "M 15 15 l 30 30 M 0 0 l 0 0",
    "M 15 15 l 30 30 M 45 15 l 0 0",
    "M 15 15 l 30 30 M 45 15 l -30 30",
  ]

  const checkAnim = new Animated.Value(0);
  const checkPathWidth = new Animated.Value(0);
  const checkPath = checkAnim.interpolate({
    inputRange: props.checked ? [0, 0.5, 1] : [0, 0.33, 0.66, 1],
    outputRange: props.checked ? okPath : failPath
  })

  const bgCircleAnim = new Animated.Value(0);
  const bgCircleR = bgCircleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  })

  const bgCircleFillAnim = new Animated.Value(0);
  const bgCircleFillR = bgCircleFillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  })

  React.useEffect(() => {
    if (!props.animated) return;
    Animated.sequence([
      Animated.delay(props.delay || 0),
      Animated.timing(boxPathWidth, {
        toValue: 5,
        duration: 0,
        useNativeDriver: true,
      }), Animated.timing(boxAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(checkPathWidth, {
        toValue: 5,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(checkAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.stagger(200, [
          Animated.timing(bgCircleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1.5),
            useNativeDriver: true,
          }),
          Animated.timing(bgCircleFillAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1),
            useNativeDriver: true,
          })
        ])
      ])
    ]).start(() => {
      if (props.onAnimationFinished) {
        props.onAnimationFinished();
      }
    });
  })


  return (
    <View>
      <Svg style={{ height: 160, width: 160 }}>
        <Use
          x="50%"
          y="50%"
          translateX={-30}
          translateY={-30}
          xlinkHref={props.blank ? "#blank-checkbox" : "#checkbox"}
        />
        <Defs>
          <G id="checkbox">
            <AnimatedCircle
              fill={props.checked ? "lightgrey" : "black"}
              cx="50%"
              cy="50%"
              translateX={-50}
              translateY={-50}
              r={props.animated ? bgCircleR : 60}
            />
            <AnimatedCircle
              fill={props.checked 
                ? chroma("yellowgreen").set('hsl.l', 0.5).hex()
                : chroma("crimson").set('hsl.l', 0.3).hex()}
              cx="50%"
              cy="50%"
              translateX={-50}
              translateY={-50}
              r={props.animated ? bgCircleFillR : 60}
            />
            <Rect
              fill={chroma("white").set('hsl.l', 0).alpha(0.6).hex()}
              stroke={chroma("black").set('hsl.l', 0.35).hex()}
              strokeWidth={5}
              width={60}
              strokeLinejoin="round"
              height={60}
            />
            <AnimatedPath
              stroke={props.checked ? "yellow" : "red"}
              strokeWidth={props.animated ? boxPathWidth : 5}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={props.animated ? boxPath : rectPath[4]}
            />
            <AnimatedPath
              stroke={props.checked ? "yellow" : "red"}
              strokeWidth={props.animated ? checkPathWidth : 5}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={props.animated 
                ? checkPath
                : props.checked ? okPath[2] : failPath[3]}
            />
          </G>
          <G id="blank-checkbox">
            <Rect
              fill={chroma("white").set('hsl.l', 0).alpha(0.6).hex()}
              stroke={chroma("black").set('hsl.l', 0.35).hex()}
              strokeWidth={5}
              width={60}
              strokeLinejoin="round"
              height={60}
            />
          </G>
        </Defs>
      </Svg>
    </View>
  )
}

export default AnimatedCheckbox
