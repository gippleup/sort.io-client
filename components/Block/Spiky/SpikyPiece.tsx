import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';

const BaseContainer = styled(View)`
  height: 24px;
  margin-left: -21px;
`;

const SvgContainer = styled(View)`
  margin-top: -17px;
`;

const SpikyPiece = () => {
  return (
    <BaseContainer>
      <SvgContainer>
        <Svg width="108" height="51" viewBox="0 0 108 51" fill="none">
          <Path
            d="M22 18H38V26H70V18H86V42H70V50H38V42H22V18Z"
            fill="#C4C4C4"
            stroke="black"
          />
          <Path
            d="M1.75 29.567L0.999999 30L1.75 30.433L21.25 41.6913L22 42.1244L22 41.2583L22 18.7417L22 17.8756L21.25 18.3087L1.75 29.567Z"
            fill="#C4C4C4"
            stroke="black"
          />
          <Path
            d="M106.25 29.567L107 30L106.25 30.433L86.75 41.6913L86 42.1244L86 41.2583L86 18.7417L86 17.8756L86.75 18.3087L106.25 29.567Z"
            fill="#C4C4C4"
            stroke="black"
          />
        </Svg>
      </SvgContainer>
    </BaseContainer>
  );
};

export default SpikyPiece;
