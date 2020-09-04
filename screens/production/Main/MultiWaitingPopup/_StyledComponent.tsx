import styled from "styled-components";
import { View } from "react-native";
import NativeRefBox from "../../../../components/NativeRefBox";
import { TextInput } from "react-native-gesture-handler";

export const FullFlexCenter = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Modal: typeof NativeRefBox = styled(NativeRefBox)`
  width: 200px;
  height: 180px;
  align-items: center;
  justify-content: center;
  background-color: slategrey;
  border-radius: 20px;
  border-width: 3px;
`

export const LoadingAnimationContainer: typeof View = styled(View)`
  width: 100px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const LoadingText: typeof TextInput = styled(TextInput)`
  font-family: NotoSansKR-Black;
  font-size: 20px;
  padding: 0px;
  font-weight: bold;
  color: ghostwhite;
`;