import React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

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
        height={28 * scale}
        viewBox="0 0 66 28"
        fill="none">
        <Path
          d="M1 10.6109C1 3.43872 8.54782 -1.22609 14.9628 1.98142V1.98142C16.3025 2.65127 17.7798 3 19.2776 3H46.7224C48.2202 3 49.6975 2.65127 51.0372 1.98142V1.98142C57.4522 -1.22609 65 3.43872 65 10.6109V12.3666C65 16.432 62.7031 20.1485 59.0669 21.9666L53.2229 24.8885C50.4458 26.2771 47.3835 27 44.2786 27H21.7214C18.6165 27 15.5542 26.2771 12.7771 24.8885L6.93313 21.9666C3.29691 20.1485 1 16.432 1 12.3666V10.6109Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
