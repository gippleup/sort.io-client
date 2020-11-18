import { View, Dimensions } from "react-native";
import styled from "styled-components";

export const LeaderBoardContainer: typeof View = styled(View)`
  width: ${Dimensions.get('window').width - 50}px;
  height: ${Dimensions.get('window').height - 300}px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  overflow: hidden;
`;