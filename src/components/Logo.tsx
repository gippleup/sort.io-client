import React from 'react'
import { Dimensions, View } from 'react-native'
import { Svg, Text } from 'react-native-svg'
import useGlobal from '@hooks/useGlobal'
import TranslationPack from '@Language/translation'
import { SupportedLanguage } from '@redux/actions/global/types'
import StrokedNotoSans from './StokedNotoSans'

type LogoProps = {
  fontSize: number;
  strokeWidth?: number;
  strokeColor?: string;
  color?: string;
  lan?: SupportedLanguage;
}

const Logo = (props: LogoProps) => {
  const {fontSize, strokeColor, strokeWidth, color, lan = SupportedLanguage.en} = props;
  const translation = TranslationPack[lan].screens.Main;
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <StrokedNotoSans
        text={translation.title}
        size={fontSize}
        color="white"
        strokeColor="rgba(0,0,0,0.5)"
        type="Thin"
        strokeOffsetX={1}
        strokeOffsetY={1}
      />
    </View>
  )
}

export default Logo
