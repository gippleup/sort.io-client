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
        height={28 * scale}
        viewBox="0 0 66 28"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 15.6334C1 11.568 3.29691 7.85154 6.93312 6.03344L12.7771 3.11146C15.5542 1.7229 18.6165 1 21.7214 1H44.2786C47.3835 1 50.4458 1.7229 53.2229 3.11146L59.0669 6.03344C62.7031 7.85154 65 11.568 65 15.6334V17.3891C65 24.5613 57.4522 29.2261 51.0372 26.0186V26.0186C49.6975 25.3487 48.2202 25 46.7224 25H19.2776C17.7798 25 16.3025 25.3487 14.9628 26.0186V26.0186C8.54782 29.2261 1 24.5613 1 17.3891V15.6334Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
