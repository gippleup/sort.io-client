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
  shape: React.FC<BasicBlockProps>;
  type: BlockTypes;
};
const Block = (props: BlockProps) => {
  const Base = props.base;
  const Shape: React.FC<BasicBlockProps> = props.shape;
  return (
    <View>
      <Base type={9} />
      <ShapeContainer>
        <Shape type={props.type} />
      </ShapeContainer>
    </View>
  );
};

export default Block;
