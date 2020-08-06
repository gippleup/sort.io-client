import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import Svg from 'react-native-svg';
import styled from 'styled-components';
import {BlockTypes, BasicBlockProps} from './Block/Types';

const ShapeContainer: typeof View = styled(View)`
  position: absolute;
`;

type BlockProps = {
  base: React.FC<BasicBlockProps>;
  shape?: React.FC<BasicBlockProps>;
  type: BlockTypes;
  scale?: number;
  visible?: boolean;
  style?: ViewStyle;
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
    if (!props.shape) {
      return <></>;
    }
    const Shape: React.FC<BasicBlockProps> = props.shape;
    return (
      <ShapeContainer>
        <Shape scale={props.scale} type={type} />
      </ShapeContainer>
    );
  }

  render() {
    const {props, state, renderShape} = this;
    const Base = props.base;
    const initialVisiblity =
      props.visible === true || props.visible === undefined ? 'flex' : 'none';

    return (
      <View
        ref={this.containerRef}
        style={[props.style, {display: initialVisiblity}]}>
        <Base scale={props.scale} type={9} />
        {renderShape(state.type)}
      </View>
    );
  }
}

export default Block;
