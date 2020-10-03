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
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={32 * scale}
        viewBox="0 0 66 32"
        fill="none">
        <Path
          d="M1 13C1 6.37258 6.37258 1 13 1H13.9443C15.9538 1 17.9357 1.46787 19.7331 2.36656L24.0557 4.52786C29.6863 7.34314 36.3137 7.34314 41.9443 4.52787L46.2669 2.36656C48.0643 1.46787 50.0462 1 52.0557 1H53C59.6274 1 65 6.37258 65 13V13C65 19.6274 59.6274 25 53 25H52.0557C50.0462 25 48.0643 25.4679 46.2669 26.3666L41.9443 28.5279C36.3137 31.3431 29.6863 31.3431 24.0557 28.5279L19.7331 26.3666C17.9357 25.4679 15.9538 25 13.9443 25H13C6.37258 25 1 19.6274 1 13V13Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
