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
  onAnimationStart?: () => any;
  onAnimationFinished?: () => any;
  size?: number;
}

const AnimatedCheckbox = (props: AnimatedCheckboxProps) => {
  const {size = 160} = props;
  const boxAnim = new Animated.Value(0);
  const boxPathWidth = new Animated.Value(0);
  const scale = size / 160;
  const rectPath = [
    `M 0 0 l 0 0 l 0 0 l 0 0 l 0 0 l 0 0`,
    `M 0 0 l ${60 * scale} 0 l 0 0 l 0 0 l 0 0 l 0 0`,
    `M 0 0 l ${60 * scale} 0 l 0 ${60 * scale} l 0 0 l 0 0 l 0 0`,
    `M 0 0 l ${60 * scale} 0 l 0 ${60 * scale} l 0 0 l -${60 * scale} 0 l 0 0`,
    `M 0 0 l ${60 * scale} 0 l 0 ${60 * scale} l 0 0 l -${60 * scale} 0 l 0 -${60 * scale}`,
  ];
  const boxPath = boxAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: rectPath,
  })

  const okPath = [
    `M ${10 * scale} ${25 * scale} l 0 0 l 0 0`,
    `M ${10 * scale} ${25 * scale} l ${15 * scale} ${20 * scale} l 0 0`,
    `M ${10 * scale} ${25 * scale} l ${15 * scale} ${20 * scale} l ${25 * scale} -${30 * scale}`,
  ];

  const failPath = [
    `M ${15 * scale} ${15 * scale} l 0 0 M 0 0 l 0 0`,
    `M ${15 * scale} ${15 * scale} l ${30 * scale} ${30 * scale} M 0 0 l 0 0`,
    `M ${15 * scale} ${15 * scale} l ${30 * scale} ${30 * scale} M ${45 * scale} ${15 * scale} l 0 0`,
    `M ${15 * scale} ${15 * scale} l ${30 * scale} ${30 * scale} M ${45 * scale} ${15 * scale} l -${30 * scale} ${30 * scale}`,
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
    if (props.onAnimationStart) {
      props.onAnimationStart();
    }
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
      <Svg style={{ height: size, width: size }}>
        <Use
          x="50%"
          y="50%"
          translateX={-30 * (size / 160)}
          translateY={-30 * (size / 160)}
          xlinkHref={props.blank ? "#blank-checkbox" : "#checkbox"}
        />
        <Defs>
          <G id="checkbox">
            <AnimatedCircle
              fill={props.checked ? "lightgrey" : "black"}
              cx="50%"
              cy="50%"
              translateX={-50 * (size / 160)}
              translateY={-50 * (size / 160)}
              r={props.animated ? bgCircleR : 60 * (size / 160)}
            />
            <AnimatedCircle
              fill={props.checked 
                ? chroma("yellowgreen").set('hsl.l', 0.5).hex()
                : chroma("crimson").set('hsl.l', 0.3).hex()}
              cx="50%"
              cy="50%"
              translateX={-50 * (size / 160)}
              translateY={-50 * (size / 160)}
              r={props.animated ? bgCircleFillR : 60 * (size / 160)}
            />
            <Rect
              fill={chroma("white").set('hsl.l', 0).alpha(0.6).hex()}
              stroke={chroma("black").set('hsl.l', 0.35).hex()}
              strokeWidth={5 * (size / 160)}
              width={60 * (size / 160)}
              strokeLinejoin="round"
              height={60 * (size / 160)}
            />
            <AnimatedPath
              stroke={props.checked ? "yellow" : "red"}
              strokeWidth={props.animated ? boxPathWidth : 5 * (size / 160)}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={props.animated ? boxPath : rectPath[4]}
            />
            <AnimatedPath
              stroke={props.checked ? "yellow" : "red"}
              strokeWidth={props.animated ? checkPathWidth : 5 * (size / 160)}
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
              strokeWidth={5 * (size / 160)}
              width={60 * (size / 160)}
              strokeLinejoin="round"
              height={60 * (size / 160)}
            />
          </G>
        </Defs>
      </Svg>
    </View>
  )
}

export default AnimatedCheckbox
