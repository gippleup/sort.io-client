import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';

const BaseContainer = styled(View)`
  height: 24px;
`;

type PieceBaseProps = {
  fill?: string;
  stroke?: string;
};

const PieceBase: React.FC<PieceBaseProps> = (props) => {
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path
          d="M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z"
          fill={props.fill}
          stroke={props.stroke}
        />
      </Svg>
    </BaseContainer>
  );
};

PieceBase.defaultProps = {
  fill: 'lightgrey',
  stroke: 'black',
};

export default PieceBase;
