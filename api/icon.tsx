import React from 'react';
import { Text, View } from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon'

const iconSet = {
  antDesign: require('react-native-vector-icons/AntDesign'),
  entypo: require('react-native-vector-icons/Entypo'),
  fontAwesome: require('react-native-vector-icons/FontAwesome'),
  fontAwesome5: require('react-native-vector-icons/FontAwesome5'),
  materialCommunityIcons: require('react-native-vector-icons/MaterialCommunityIcons'),
}

type IconOption = {
  size?: number;
  color?: string;
}

const defaultOption: IconOption = {
  size: 40,
  color: "black",
}

type ContainerProps = {
  size?: number;
  color?: string;
  border?: string;
  borderWidth?: number;
  borderRadius?: number;
}

export const IconContainer: React.FC<ContainerProps> = (props) => {
  const {size = 45, color = "black", border = "none", borderWidth = 2, borderRadius = 100} = props;
  return (
    <View style={{
      backgroundColor: color,
      borderRadius,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: border === "none" ? 0 : borderWidth,
      borderColor: border === "none" ? "transparent" : border,
    }}>
      {props.children}
    </View>
  )
}

export const getIcon = (targetSet: keyof typeof iconSet, iconName: string, option?: IconOption) => {
  const Icon: React.FC<IconProps> = iconSet[targetSet].default;
  return (
    <Icon name={iconName} {...{...defaultOption, ...option}} />
  )
}
