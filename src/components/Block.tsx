import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import styled from 'styled-components';
import BlockBase from './Block/BlockBase';
import {BlockTypes} from './Block/Types';
import skinMap, { SupportedSkin } from './Block/skinMap';

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
    const Shape = skinMap[props.skin][props.part]
    return (
      <ShapeContainer>
        <Shape scale={props.scale} type={type} />
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

export default Block;
