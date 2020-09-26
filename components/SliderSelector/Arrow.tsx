import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getIcon } from "../../api/icon";

type ArrowProps = {
  isHorizontal: boolean;
  direction: "prev" | "next";
  onPress: () => any;
  color?: string;
}

const Arrow: React.FC<ArrowProps> = (props) => {
  const { direction, isHorizontal, onPress, color = "white" } = props;
  const iconName = {
    horizontal: {
      prev: "caret-left",
      next: "caret-right",
    },
    vertical: {
      prev: "caret-up",
      next: "caret-down",
    }
  }[isHorizontal ? "horizontal" : "vertical"][direction]
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ paddingHorizontal: 20 }}>
        {getIcon("fontAwesome", iconName, { color, size: 80 })}
      </View>
    </TouchableOpacity>
  )
}

export default Arrow;