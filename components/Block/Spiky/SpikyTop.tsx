import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import styled from 'styled-components';
import colorTheme from './ColorTheme';
import {BasicBlockProps} from '../Types';

const BaseContainer = styled(View)`
  height: 24px;
  margin-left: 0px;
`;

const SvgContainer = styled(View)`
  margin-top: 0px;
`;

const SpikyTop = (props: BasicBlockProps) => {
  const {cap} = colorTheme[props.type];
  return (
    <BaseContainer>
      <SvgContainer>
        <Svg width="78" height="34" viewBox="0 0 78 34">
          <Path d="M1 1V9H17V17H49V9H65V1H1Z" fill={cap} stroke="black" />
        </Svg>
      </SvgContainer>
    </BaseContainer>
  );
};

export default SpikyTop;
