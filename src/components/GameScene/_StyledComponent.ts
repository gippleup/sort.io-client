import styled from "styled-components";
import { View, Dimensions, Text, ViewProps, TextProps } from "react-native";
import chroma from 'chroma-js';

export const GameSceneContainer = styled(View)`
  flex: 1;
`;

export const GameInfoContainer = styled(View)`
  flex: 25;
  flex-direction: row;
`;

export const OpponentGameContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 20px;
`;

export const OpponentBoardContainer: typeof View = styled(View)`
  background-color: rgba(0,0,0,0.2);
  border-width: 0.5px;
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

export const ProfileContainer: typeof View = styled(View)`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 18px;
  margin-right: 10px;
`;

export const MetaInfoContainer = styled(View)`
  flex: 1;
  margin: 20px;
`;

type GameTypeProp = { gameType: "multi" | "single" };

export const TimerContainer: React.ComponentClass<ViewProps & GameTypeProp> = styled(View)<GameTypeProp>`
  align-items: ${(props) => props.gameType === "multi" ? "flex-end" : "center"};
  justify-content: center;
`;

export const ScoreCheckerContainer: React.ComponentClass<ViewProps & GameTypeProp> = styled(View)<GameTypeProp>`
  align-items: center;
  justify-content: ${(props) => props.gameType === "multi" ? "flex-end" : "center"};
  margin-vertical: 5px;
  flex-direction: row;
`;

export const BlockBoardContainer = styled(View)`
  flex: 65;
  align-items: center;
  justify-content: center;
`;

export const PlayerBoardContainer = styled(View)`
  background-color: rgba(0,0,0,0.2);
  border-width: 1px;
`;

export const UserName: React.FC<TextProps & {color?: string, backgroundColor?: string}> = styled(Text)`
  padding-horizontal: 10px;
  background-color: ${(props) => props.backgroundColor || 'white'};
  border-radius: 20px;
  margin-bottom: 3px;
  font-size: 10px;
  color: ${(props) => props.color || 'black'};
`;