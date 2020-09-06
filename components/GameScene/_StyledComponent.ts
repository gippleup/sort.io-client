import NativeRefBlockBoard from '../NativeRefBlockBoard';
import styled from "styled-components";
import { View, Dimensions, Text } from "react-native";

export const GameSceneContainer = styled(View)`
  flex: 1;
`;

export const GameInfoContainer = styled(View)`
  flex: 25;
  flex-direction: row;
`;

export const OpponentGameContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${(119 / 360) * Dimensions.get('screen').width}px;
  height: ${(140 / 640) * Dimensions.get('screen').height}px;
  margin-left: 10px;
  margin-top: 20px;
`;

export const LevelInfoContainer = styled(View)`
  align-items: center;
  justify-content: flex-end;
  flex: 2;
`;

export const LevelInfo = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

export const ProfileContainer = styled(View)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
  border-radius: 16px;
  margin-right: 10px;
`;

export const MetaInfoContainer = styled(View)`
  flex: 1;
  margin: 20px;
`;

export const TimerContainer = styled(View)`
  align-items: flex-end;
  justify-content: center;
`;

export const ScoreCheckerContainer: typeof View = styled(View)`
  align-items: center;
  justify-content: flex-end;
  margin-vertical: 5px;
  flex-direction: row;
`;

export const BlockBoardContainer = styled(View)`
  flex: 65;
  align-items: center;
  justify-content: center;
`;

export const OpponentBoard: typeof NativeRefBlockBoard = styled(NativeRefBlockBoard)`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  border-width: 0.5px;
  border-color: rgba(0,0,0,0.5);
`;

export const StyledRefBoard: typeof NativeRefBlockBoard = styled(NativeRefBlockBoard)`
  width: ${(340 / 360) * Dimensions.get('screen').width}px;
  height: ${(400 / 640) * Dimensions.get('screen').height}px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
`;
