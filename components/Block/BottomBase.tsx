import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';

const BaseContainer = styled(View)``;

type BottomBaseProps = {
  fill?: string;
  stroke?: string;
};

const BottomBase: React.FC<BottomBaseProps> = (props) => {
  return (
    <BaseContainer>
      <Svg width="66" height="34" viewBox="0 0 66 34" fill="none">
        <Path
          d="M1 1V33H65V1H49V9H17V1H1Z"
          fill={props.fill}
          stroke={props.stroke}
        />
      </Svg>
    </BaseContainer>
  );
};

BottomBase.defaultProps = {
  fill: 'lightgrey',
  stroke: 'black',
};

export default BottomBase;
