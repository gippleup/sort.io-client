import {View} from 'react-native';
import styled from 'styled-components';

export const FlexHorizontal: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type SpaceProps = {
  height?: number;
  width?: number;
};

export const Space: React.ComponentClass<SpaceProps> = styled(View)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

Space.defaultProps = {
  width: 0,
  height: 0,
};