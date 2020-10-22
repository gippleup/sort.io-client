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
      marginTop={6}
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={39 * scale}
        viewBox="0 0 66 39"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 29.2669C1 28.4337 1.19397 27.6121 1.56656 26.8669L14.1056 1.78885C14.8266 0.346824 17 0.859896 17 2.47214V2.47214C17 3.31595 17.684 4 18.5279 4H47.4721C48.316 4 49 3.31595 49 2.47214V2.47214C49 0.859897 51.1734 0.346822 51.8944 1.78885L64.4334 26.8669C64.806 27.6121 65 28.4337 65 29.2669V34.1115C65 38.5676 58.9928 39.9857 57 36L51.8944 25.7889C51.1734 24.3468 49 24.8599 49 26.4721V26.4721C49 27.316 48.316 28 47.4721 28H18.5279C17.684 28 17 27.316 17 26.4721V26.4721C17 24.8599 14.8266 24.3468 14.1056 25.7889L9 36C7.00716 39.9857 1 38.5676 1 34.1115V29.2669Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
