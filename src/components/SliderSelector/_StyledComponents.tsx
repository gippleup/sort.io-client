import { View, ViewProps } from "react-native";
import styled from "styled-components";

type ArrowSelectorContainerProps = ViewProps & {
  isHorizontal?: boolean;
}

export const ArrowSelectorContainer: React.ComponentClass<ArrowSelectorContainerProps>
= styled<typeof View & ArrowSelectorContainerProps>(View)`
  flex-direction: ${(props) => props.isHorizontal ? "row" : "column"};
  justify-content: center;
  align-items: center;
`;

type DirectionAlignerProps = ViewProps & {
  isHorizontal?: boolean;
}

export const DirectionAligner: React.ComponentClass<DirectionAlignerProps>
= styled<typeof View & DirectionAlignerProps>(View)`
  flex-direction: ${(props) => props.isHorizontal ? "row" : "column"};
  align-items: center;
`