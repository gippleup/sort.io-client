import React from 'react';
import {View, Text, ViewStyle, Animated} from 'react-native';
import styled from 'styled-components';
import BlockBase from './Block/BlockBase';
import {BlockTypes} from './Block/Types';
import skinMap, { SupportedSkin } from './Block/skinMap';
import Svg, { Path } from 'react-native-svg';
import { GradientFill } from './Block/GradientFill';
import SvgContainer from './Block/SvgContainer';
import colors from './Block/CommonColorTheme';
import { blockSkeleton } from './Block/_skeleton';
import { Transform } from 'src/utils/Animated';

const ShapeContainer: typeof View = styled(View)`
  position: absolute;
`;

const blockHeight = {
  top: 8,
  piece: 24,
  bottom: 34,
}

const blockWidth = 66;

export type Block2021Props = {
  type: BlockTypes;
  skin: SupportedSkin;
  part: "top" | "piece" | "bottom";
  scale?: number;
  visible?: boolean;
  noGradient?: boolean;
  onReady?: () => any;
  transform?: Partial<Transform>;
};

const Block2021: React.FC<Block2021Props> = (props) => {
  const {type=50, scale=1, skin, part, noGradient, onReady, transform={}} = props;
  const initialVisiblity = props.visible === true || props.visible === undefined ? 'flex' : 'none';
  const {x=0, y=0, scaleX=1, scaleY=1, rotate="0deg", opacity=1} = transform;
  const renderShape = (type: BlockTypes) => {
    const fill = colors[type][part];
    const shapeDefinition = blockSkeleton[skin][part];
    const {
      height,
      path,
      width,
      innerMarginBottom,
      innerMarginLeft,
      innerMarginRight,
      innerMarginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
    } = shapeDefinition;
    return (
      <ShapeContainer onLayout={onReady}>
        <SvgContainer
          innerMarginTop={innerMarginTop}
          innerMarginBottom={innerMarginBottom}
          innerMarginLeft={innerMarginLeft}
          innerMarginRight={innerMarginRight}
          marginLeft={marginLeft}
          marginBottom={marginBottom}
          marginRight={marginRight}
          marginTop={marginTop}
          height={blockHeight[part]}
          scale={scale}
        >
          <Svg
            width={width * scale}
            height={height * scale}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
          >
            {noGradient ? undefined : GradientFill(fill)}
            <Path
              d={path}
              fill={noGradient ? fill : "url(#grad)"}
              stroke="black"
            />
          </Svg>
        </SvgContainer>
      </ShapeContainer>
    );
  }

  return (
    <Animated.View
      style={{
        opacity,
        display: initialVisiblity,
        transform: [
          {translateX: x},
          {translateY: y},
          {scaleX: scaleX},
          {scaleY: scaleY},
          {rotate: rotate instanceof Animated.Value
            ? rotate.interpolate({inputRange: [-10000, 10000], outputRange: ['-10000deg', '10000deg']})
            : rotate
          }
        ],
      }}>
      <BlockBase
        height={blockHeight[props.part]}
        width={blockWidth}
        scale={props.scale}
      />
      {renderShape(type)}
    </Animated.View>
  );
}

export default Block2021;
