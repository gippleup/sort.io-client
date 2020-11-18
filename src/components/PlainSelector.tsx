import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import styled from 'styled-components'
import { ArrayElement } from '../types/utilTypes'
import { NotoSans } from './Generic/StyledComponents'

type PlainSelectorProps = {
  title: string;
  options: string[];
  onChange: (option: string) => any;
  initialIndex?: number;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  option: { backgroundColor: "grey", padding: 5, paddingHorizontal: 20},
  active: { backgroundColor: "dodgerblue" },
  optionText: { color: "lightgrey" },
  activeText: { color: "white" },
})

const PlainSelector: React.FC<PlainSelectorProps> = (props) => {
  const {onChange, options, title, initialIndex = 0, style} = props;
  const adjustedInitialIndex = Math.max(Math.min(initialIndex, options.length - 1), 0);
  const [activeOption, setActiveOption] = React.useState(options[adjustedInitialIndex]);

  const onPressOption = (option: string) => {
    setActiveOption(option);
    if (onChange) onChange(option);
  }

  return (
    <View style={style}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <NotoSans style={{marginRight: 5}} color="white" type="Black">
          {title}
        </NotoSans>
        <View style={{borderWidth: 1, borderRadius: 20, flexDirection: "row", overflow: "hidden"}}>
          {options.map((option, i) => {
            const borderRightWidth = i === options.length - 1 ? 0 : 1;
            const isActive = option === activeOption;
            const paddingRight = i === options.length - 1 ? 25 : undefined;
            const paddingLeft = i === 0 ? 25 : undefined;
            return (
            <TouchableOpacity onPress={() => onPressOption(option)} key={option + i}>
              <View style={[styles.option, {borderRightWidth, paddingRight, paddingLeft}, isActive ? styles.active : undefined]}>
                <NotoSans style={isActive ? styles.activeText : styles.optionText} type="Black">{option}</NotoSans>
              </View>
            </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default PlainSelector
