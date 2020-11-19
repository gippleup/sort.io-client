import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import styled from 'styled-components';
import BlockBase from './Block/BlockBase';
import {BlockTypes} from './Block/Types';
import skinMap, { SupportedSkin } from './Block/skinMap';
import Svg, { Path } from 'react-native-svg';
import { GradientFill } from './Block/GradientFill';
import SvgContainer from './Block/SvgContainer';
import colors from './Block/CommonColorTheme';
import { blockSkeleton } from './Block/_skeleton';

const ShapeContainer: typeof View = styled(View)`
  position: absolute;
`;

const blockHeight = {
  top: 8,
  piece: 24,
  bottom: 34,
}

const blockWidth = 66;

type BlockProps = {
  type: BlockTypes;
  skin: SupportedSkin;
  part: "top" | "piece" | "bottom";
  scale?: number;
  visible?: boolean;
  noGradient?: boolean;
  onReady?: () => any;
};

class Block extends React.Component<BlockProps, {type: BlockTypes}> {
  containerRef = React.createRef<View>();
  setVisible(bool: boolean) {
    this.containerRef.current?.setNativeProps({
      style: {
        display: bool ? 'flex' : 'none',
      },
    });
  }

  constructor(props: BlockProps) {
    super(props);
    this.renderShape = this.renderShape.bind(this);
    this.state = {
      type: props.type,
    };
  }

  renderShape(type: BlockTypes) {
    const {props} = this;
    const {scale = 1, skin, part, noGradient, onReady} = props;
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

  render() {
    const {props, state, renderShape} = this;
    const initialVisiblity =
      props.visible === true || props.visible === undefined ? 'flex' : 'none';

    return (
      <View
        ref={this.containerRef}
        style={{display: initialVisiblity}}>
        <BlockBase
          height={blockHeight[props.part]}
          width={blockWidth}
          scale={props.scale}
        />
        {renderShape(state.type)}
      </View>
    );
  }
}

export default  Block;
