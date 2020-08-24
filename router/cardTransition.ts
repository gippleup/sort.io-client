import { StackCardStyleInterpolator, StackCardInterpolationProps, StackCardInterpolatedStyle } from "@react-navigation/stack";
import { Animated, Easing } from "react-native";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

type CardTransitionSpecs = {
  open: TransitionSpec,
  close: TransitionSpec,
}

enum CardTransitionNames {
  forSlide, forZoom, forFade,
}

type CardTransitions = {
  [index in keyof typeof CardTransitionNames]: StackCardStyleInterpolator;
}

export const cardTransitionSpecs: CardTransitionSpecs = {
  open: {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    },
  },
  close: {
    animation: 'timing',
    config: {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    },
  }
}

export const cardTransitions: CardTransitions = {
  forZoom: (props) => {
    const {current } = props;
    return {
      cardStyle: {
        opacity: current.progress,
        transform: [
          { scale: current.progress },
        ]
      }
    }
  },
  forSlide: (props) => {
    const { current, next, inverted, layouts: { screen } } = props;
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.width * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
  forFade: (props) => {
    const {current} = props;
    return {
      cardStyle: {
        opacity: current.progress,
      }
    }
  }
}
