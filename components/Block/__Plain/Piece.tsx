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
      <Svg width={66 * scale} height={26 * scale} viewBox="0 0 66 26" fill="none">
        <Path d="M1 1H65V25H1V1Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
