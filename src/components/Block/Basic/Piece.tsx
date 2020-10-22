import React from 'react';
import Svg, {Path} from 'react-native-svg';
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
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
