import {
  Text,
  View,
  Dimensions,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components';

export const GameInfoContainer: typeof View = styled(View)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WhiteRoundBorder = css`
  border-radius: 30px;
  background-color: white;
  border-width: 3px;
`;

export const TitleContainer: typeof View = styled(View)`
  ${WhiteRoundBorder}
  width: 120px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: blueviolet;
`;

export const ContentContainer: typeof View = styled(View)`
  ${WhiteRoundBorder}
  width: ${Dimensions.get('screen').width - 40}px;
  background-color: blueviolet;
`;

export const SubContentContainer: typeof View = styled(View)`
  width: 100%;
  align-items: center;
`;

type InfoTextProp = {
  fontFamily?: string;
  size?: number;
  color?: string;
};

export const InfoText: React.ClassicComponentClass<InfoTextProp> = styled(Text)`
  font-family: ${(props) => props.fontFamily || ''};
  font-size: ${(props) => props.size || 14}px;
  /* background-color: red; */
  line-height: ${(props) => (props.size || 14) * 1.4}px;
  color: ${(props) => props.color || 'white'};
`;

InfoText.defaultProps = {
  fontFamily: 'NotoSansKR-Regular',
  size: 14,
};

// eslint-disable-next-line prettier/prettier
export const PercentageText: React.ClassicComponentClass<InfoTextProp & TextInputProps> = styled(TextInput)`
  font-family: ${(props) => props.fontFamily || ''};
  font-size: ${(props) => props.size || 14}px;
  /* background-color: red; */
  line-height: ${(props) => (props.size || 14) * 0.8}px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color || 'white'};
`;

export const Title: typeof InfoText = styled(InfoText)`
  color: white;
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

export const FlexHorizontal: typeof View = styled(View)`
  flex-direction: row;
`;

type RoundRectangleButtonProps = {
  width?: number;
};
export const RoundRectangleButton:
  | React.ComponentClass<RoundRectangleButtonProps>
  | typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: 15px;
  border-radius: 20px;
  border-width: 3px;
  align-items: center;
  justify-content: center;
  ${(props) => {
    if (props.width) {
      return css`
        width: ${props.width}px;
      `;
    } else {
      return css`
        flex: 1;
      `;
    }
  }};
  background-color: white;
`;
