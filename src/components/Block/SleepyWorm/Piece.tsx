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
        height={29 * scale}
        viewBox="0 0 66 29"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 15.6334C1 11.568 3.29654 7.84812 7.09405 6.39675C13.2041 4.06154 23.1021 1 33 1C42.8979 1 52.7959 4.06154 58.906 6.39675C62.7035 7.84812 65 11.568 65 15.6334V15.6334C65 23.6123 56.4148 29.1042 48.6808 27.1429C43.8722 25.9235 38.4361 25 33 25C27.5639 25 22.1278 25.9235 17.3192 27.1429C9.5852 29.1042 1 23.6123 1 15.6334V15.6334Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
