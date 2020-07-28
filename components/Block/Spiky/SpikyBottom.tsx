import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import styled from 'styled-components';
import {BlockTypes, BasicBlockProps} from '../Types';
import colorTheme from './ColorTheme';

const BaseContainer = styled(View)`
  height: 24px;
  margin-left: 0px;
`;

const SvgContainer = styled(View)`
  margin-top: 0px;
`;

const SpikyBottom = (props: BasicBlockProps) => {
  const {bottomFill, feet} = colorTheme[props.type];
  return (
    <BaseContainer>
      <SvgContainer>
        <Svg width="78" height="34" viewBox="0 0 78 34">
          <Path
            d="M1 1V33H65V1H49V9H17V1H1Z"
            fill={bottomFill}
            stroke="black"
          />
          <Rect x="12" y="25" width="5" height="8" fill={feet} stroke="black" />
          <Rect x="49" y="25" width="5" height="8" fill={feet} stroke="black" />
        </Svg>
      </SvgContainer>
    </BaseContainer>
  );
};

export default SpikyBottom;
