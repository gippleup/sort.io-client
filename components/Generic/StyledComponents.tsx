import {View, Text} from 'react-native';
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

type NotoSansProps = {
  type: 'Black' | 'Bold' | 'Light' | 'Medium' | 'Regular' | 'Thin';
  size?: number;
}

export const NotoSans: typeof Text & React.ComponentClass<NotoSansProps, {}> = styled(Text)<NotoSansProps>`
  font-family: NotoSansKR-${(props) => props.type};
  line-height: ${(props) => props.size * 9/6}px;
  font-size: ${(props) => props.size}px;
`;

NotoSans.defaultProps = {
  type: 'Regular',
  size: 14,
}

export const TitleText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Black;
  font-size: 25px;
  line-height: 33px;
`;

export const SubTitleText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Bold;
  font-size: 18px;
  line-height: 23px;
`;

export const ContentText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Regular;
  font-size: 14px;
  line-height: 20px;
`;

export const SmallText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Medium;
  font-size: 10px;
  line-height: 16px;
`;

export const ExtraSmallText: typeof Text = styled(Text)`
  font-family: NotoSansKR-Light;
  font-size: 7px;
  line-height: 12px;
`;
