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
      marginTop={5}
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={29 * scale}
        viewBox="0 0 66 29"
        fill="none">
        <Path
          d="M1 13.3666C1 5.38775 9.5852 -0.104225 17.3192 1.85708C22.1278 3.07652 27.5639 4 33 4C38.4361 4 43.8722 3.07652 48.6808 1.85709C56.4148 -0.104224 65 5.38775 65 13.3666V13.3666C65 17.432 62.7035 21.1519 58.906 22.6033C52.7959 24.9385 42.8979 28 33 28C23.1021 28 13.2041 24.9385 7.09405 22.6033C3.29654 21.1519 1 17.432 1 13.3666V13.3666Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
