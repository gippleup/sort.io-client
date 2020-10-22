import React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';
import { GradientFill } from '../GradientFill';

const PieceBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].piece;
  const { scale = 1 } = props;
  return (
    <SvgContainer
      height={24}
      scale={scale}
      marginLeft={0}
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={59 * scale}
        viewBox="0 0 66 59"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 33L17 9V1H49V9L65 33V57L49 33V25H17V33L1 57V33Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
