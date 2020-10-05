import chroma from "chroma-js";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { FlexHorizontal } from "../../Generic/StyledComponents";

export const ItemBoxContainer: typeof View = styled(View)`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-horizontal: 20px;
  flex-direction: row;
  margin-bottom: 20px;
  height: 180px;
`

export const ItemProfileContainer: typeof View = styled(View)`
  width: 100px;
  height: 100px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 10px;
  border-width: 3px;
  border-color: ${chroma('black').alpha(0.5).hex()};
  justify-content: center;
  align-items: center;
`;

export const ItemDescriptionConatiner: typeof View = styled(View)`
  position: relative;
  align-items: flex-start;
  padding-vertical: 5px;
  justify-content: space-between;
  height: 100%;
  flex: 1;
`;


export const ItemDescriptionBubble: typeof View = styled(View)`
  padding: 10px;
  padding-horizontal: 15px;
  background-color: ${chroma('white').alpha(0.8).hex()};
  border-radius: 20px;
`;

export const PriceTagContainer: typeof FlexHorizontal = styled(FlexHorizontal)`
  background-color: rgba(0,0,0,0.2);
  padding-vertical: 5px;
  padding-horizontal: 8px;
  border-radius: 20px;
`;

export const PreviewButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  elevation: 10;
  background-color: darkblue;
  border-radius: 20px;
  padding: 5px;
  padding-horizontal: 10px;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const PurchaseButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  elevation: 10;
  background-color: black;
  border-radius: 20px;
  padding: 5px;
  padding-horizontal: 10px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;