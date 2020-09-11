import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type CommentBoxProps = {
  color?: string;
  style?: ViewStyle;
  size?: number;
  mirror?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = (props) => {
  const size = props.size || 30;
  return (
    <View style={props.style}>
      <Svg height={size} fill={props.color} scaleX={props.mirror ? -1 : 1} viewBox="-21 -47 682.66669 682" width={size}>
        <Path
          d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.464843-87.988281 87.988281v283.972656c0 48.414063 39.300781 87.816406 87.675781 87.988282v128.863281l185.191407-128.863281h279.144531c48.515625 0 87.988281-39.472657 87.988281-87.988282v-283.972656c0-48.523438-39.472656-87.988281-87.988281-87.988281zm50.488281 371.960937c0 27.835938-22.648438 50.488282-50.488281 50.488282h-290.910157l-135.925781 94.585937v-94.585937h-37.1875c-27.839843 0-50.488281-22.652344-50.488281-50.488282v-283.972656c0-27.84375 22.648438-50.488281 50.488281-50.488281h464.023438c27.839843 0 50.488281 22.644531 50.488281 50.488281zm0 0"
        />
      </Svg>
      <View
        style={{
          width: (24 / 30) * size,
          height: (16 / 30) * size,
          position: 'absolute',
          top: (4 / 30) * size,
          left: (3 / 30) * size
        }}
        children={props.children}
      />
    </View>
  )
}

export default CommentBox
