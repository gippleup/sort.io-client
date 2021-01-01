import styled from "styled-components";
import { View } from "react-native";
import NativeRefBox from "@components/NativeRefBox";
import { TextInput } from "react-native-gesture-handler";
import chroma from "chroma-js";

export const Modal: typeof NativeRefBox = styled(NativeRefBox)`
  width: 200px;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: dodgerblue;
  border-radius: 20px;
  border-width: 3px;
  border-color: ${chroma("black").alpha(0.3).hex()};
`

export const LoadingAnimationContainer: typeof NativeRefBox = styled(NativeRefBox)`
  width: 100px;
  /* height: 140px; */
  align-items: center;
  justify-content: flex-end;
  /* background-color: red; */
  flex: 1;
  margin-bottom: 90px;
`;

export const LoadingText: typeof TextInput = styled(TextInput)`
  font-family: NotoSansKR-Black;
  font-size: 20px;
  padding: 0px;
  color: ghostwhite;
  margin-bottom: 5px;
`;