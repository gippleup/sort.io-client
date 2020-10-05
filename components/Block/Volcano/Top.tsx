import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {BasicBlockProps, BlockTypes} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';
import { GradientFill } from '../GradientFill';

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].top;
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={8}
      innerMarginTop={0}
      marginLeft={0}
      scale={scale}>
      <Svg
        width={66 * scale}
        height={24 * scale}
        viewBox="0 0 66 24"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M10.2963 1C5.16211 1 1 5.16211 1 10.2963V14.5778C1 22.4931 11.2658 25.6013 15.6564 19.0154L15.9687 18.547C16.6411 17.5383 17 16.3531 17 15.1407V15.1407C17 11.7493 19.7493 9 23.1407 9H42.8593C46.2507 9 49 11.7493 49 15.1407V15.1407C49 16.3531 49.3589 17.5383 50.0313 18.547L50.3436 19.0154C54.7342 25.6013 65 22.4931 65 14.5778V10.2963C65 5.16211 60.8379 1 55.7037 1H10.2963Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
