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
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 9C1 9 17 1 33 1C49 1 65 9 65 9V33C65 33 49 25 33 25C17 25 1 33 1 33L1 9Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
