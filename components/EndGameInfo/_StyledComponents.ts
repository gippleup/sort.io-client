import {View, Dimensions, TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components';
import DynamicText from '../DynamicText';
import AnimatedRateText from './AnimatedRateText';

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
  padding: 20px;
`;

export const SubContentContainer: typeof View = styled(View)`
  width: 100%;
  align-items: center;
`;

export const HorizontalSpaceBetween: typeof View = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
`;

type RoundRectangleButtonProps = {
  width?: number;
  flex?: boolean;
};

export const RoundRectangleButton:
  | React.ComponentClass<RoundRectangleButtonProps>
  | typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: 15px;
  border-radius: 20px;
  border-width: 3px;
  align-items: center;
  justify-content: center;
  elevation: 10;
  ${(props) => {
    if (props.width) {
      return css`
        width: ${props.width}px;
      `;
    } else if (props.flex) {
      return css`
        flex: 1;
      `;
    } else {
      return css`
        width: 100%;
      `;
    }
  }};
  background-color: white;
`;

export const Title: typeof DynamicText = styled(DynamicText)`
  color: white;
  font-size: 30px;
  font-family: NotoSansKR-Black;
  margin: 0px;
  padding: 0px;
  line-height: 45px;
  /* background-color: red; */
`;

export const MetaStageInfo: typeof DynamicText = styled(DynamicText)`
  color: white;
  font-size: 15px;
  font-family: NotoSansKR-Bold;
  margin: 0px;
  padding: 0px;
  line-height: 25px;
`;

export const CurStage: typeof DynamicText = styled(DynamicText)`
  color: yellow;
  font-size: 40px;
  font-family: NotoSansKR-Black;
  margin: 0px;
  padding: 0px;
  line-height: 60px;
`;

const clearRateStyle = css`
  color: gold;
  font-size: 15px;
  font-family: NotoSansKR-Black;
  margin: 0px;
  padding: 0px;
  line-height: 25px;
`;

export const CurDifficulty: typeof DynamicText = styled(DynamicText)`
  ${clearRateStyle}
`;

export const ClearRate: typeof AnimatedRateText = styled(AnimatedRateText)`
  ${clearRateStyle}
`;

export const ButtonText: typeof DynamicText = styled(DynamicText)`
  color: black;
  font-size: 20px;
  font-family: NotoSansKR-Bold;
  margin: 0px;
  padding: 0px;
  line-height: 40px;
`;
