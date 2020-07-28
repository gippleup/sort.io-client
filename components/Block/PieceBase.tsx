import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from './Types';
import colors from './ColorTheme';

const BaseContainer = styled(View)`
  height: 24px;
`;

const PieceBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path
          d="M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </BaseContainer>
  );
};

export default PieceBase;
