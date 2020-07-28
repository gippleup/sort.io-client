import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from './Types';
import colors from './ColorTheme';

const BaseContainer = styled(View)``;

const BottomBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path d="M1 1V33H65V1H49V9H17V1H1Z" fill={fill} stroke="black" />
      </Svg>
    </BaseContainer>
  );
};

export default BottomBase;
