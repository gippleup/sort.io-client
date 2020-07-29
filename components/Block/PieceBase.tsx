import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {BasicBlockProps} from './Types';
import colors from './ColorTheme';
import SvgContainer from './SvgContainer';

const PieceBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <SvgContainer
      height={24}
      scale={props.scale}
      marginLeft={0}
      innerMarginTop={0}>
      <Svg
        width={66 * props.scale}
        height={34 * props.scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path
          d="M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
