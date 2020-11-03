import { View } from "react-native";
import styled from "styled-components";
import MoneyIndicator from "../../../components/Main/MoneyIndicator";

export const Flex: typeof View = styled(View)`
  flex: 1;
`;

export const CategorySelectorContainer: typeof View = styled(View)`
  background-color: black;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
`;

export const Header: typeof View = styled(View)`
  background-color: dodgerblue;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
`;

export const IconContainer: typeof View = styled(View)`
  padding: 15px;
`;

export const StyledMoneyIndicator: typeof MoneyIndicator = styled(MoneyIndicator)`
  height: 50px;
  background-color: rgba(0,0,0,0.5);
`;