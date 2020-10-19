import {View, Text, ColorValue, TextProps, ViewProps} from 'react-native';
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
  color?: string;
}

export const NotoSans: React.FC<NotoSansProps & TextProps> = styled(Text)<NotoSansProps>`
  font-family: NotoSansKR-${(props) => props.type};
  line-height: ${(props) => props.size * 9/6}px;
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
`;

NotoSans.defaultProps = {
  type: 'Regular',
  size: 14,
  color: 'black',
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

type CircleProps = {
  size: number;
  borderWidth?: number;
  backgroundColor?: string;
};

export const Circle: React.FC<CircleProps> = styled(View)<CircleProps>`
  border-radius: ${(props) => props.size / 2}px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  padding: ${(props) => `${props.padding || 0}px`};
  background-color: ${(props) => props.backgroundColor || 'lightgrey'};
  align-items: center;
  justify-content: center;
`;

export const RoundPaddingCenter: typeof View = styled(View)`
  background-color: white;
  padding: 15px;
  align-self: center;
  border-radius: 20px;
`;

export const FullFlexCenter: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type LineProps = ViewProps & {
  width?: number;
  height?: number | string;
  color?: string;
  marginVertical?: number;
  marginHorizontal?: number;
};
export const Line: React.FC<LineProps> = styled(View)<LineProps>`
  margin-top: ${(props) => props.marginVertical || 0}px;
  margin-bottom: ${(props) => props.marginVertical || 0}px;
  margin-left: ${(props) => props.marginHorizontal || 0}px;
  margin-right: ${(props) => props.marginHorizontal || 0}px;
  width: ${(props) => props.width || '1px'}px;
  height: ${(props) => props.height || '100%'};
  background-color: ${(props) => props.color || 'black'};
`;