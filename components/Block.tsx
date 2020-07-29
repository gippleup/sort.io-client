import React from 'react';
import {View, Text} from 'react-native';
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
};

const Block: React.FC<BlockProps> = (props) => {
  const Base = props.base;

  const renderShape = () => {
    if (!props.shape) {
      return <></>;
    }
    const Shape: React.FC<BasicBlockProps> = props.shape;
    return (
      <ShapeContainer>
        <Shape scale={props.scale} type={props.type} />
      </ShapeContainer>
    );
  };

  return (
    <View>
      <Base scale={props.scale} type={9} />
      {renderShape()}
    </View>
  );
};

Block.defaultProps = {
  scale: 1,
};

export default Block;
