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
      marginTop={8}
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={37 * scale}
        viewBox="0 0 66 37"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 25.9443C1 25.3233 1.14458 24.7108 1.42229 24.1554L9.42229 8.15542C11.3099 4.38013 26.2481 0.677916 30.4616 0.927659C31.2595 0.974952 32.1047 1 33 1C33.8953 1 34.7405 0.974952 35.5384 0.927659C39.7519 0.677916 54.6901 4.38013 56.5777 8.15541L64.5777 24.1554C64.8554 24.7108 65 25.3233 65 25.9443V32.0557C65 36.2766 59.3099 37.6199 57.4223 33.8446L56.5777 32.1554C54.6901 28.3801 39.7519 24.6779 35.5384 24.9277C34.7405 24.975 33.8953 25 33 25C32.1047 25 31.2595 24.975 30.4616 24.9277C26.2481 24.6779 11.3099 28.3801 9.42229 32.1554L8.57771 33.8446C6.69006 37.6199 1 36.2766 1 32.0557V25.9443Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
