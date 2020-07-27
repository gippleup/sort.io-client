import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';

const BaseContainer = styled(View)`
  height: 8px;
`;

type PieceBaseProps = {
  fill?: string;
  stroke?: string;
};

const TopBase: React.FC<PieceBaseProps> = (props) => {
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path
          d="M1 1V9H17V17H49V9H65V1H1Z"
          fill={props.fill}
          stroke={props.stroke}
        />
      </Svg>
    </BaseContainer>
  );
};

TopBase.defaultProps = {
  fill: 'lightgrey',
  stroke: 'black',
};

export default TopBase;
