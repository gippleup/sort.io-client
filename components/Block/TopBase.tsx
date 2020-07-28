import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps, BlockTypes} from './Types';
import colors from './ColorTheme';

const BaseContainer = styled(View)`
  height: 8px;
`;

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path d="M1 1V9H17V17H49V9H65V1H1Z" fill={fill} stroke="black" />
      </Svg>
    </BaseContainer>
  );
};

export default TopBase;
