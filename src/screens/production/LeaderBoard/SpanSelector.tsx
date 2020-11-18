import React from 'react'
import { View, Text } from 'react-native'
import PlainSelector from '../../../components/PlainSelector'
import useGlobal from '../../../hooks/useGlobal'
import TranslationPack from '../../../Language/translation'

export type SpanSelectorOnChange = (spanInDay: number) => any;

type SpanSelectorProps = {
  onChange: SpanSelectorOnChange;
}

const SpanSelector = (props: SpanSelectorProps) => {
  const {onChange} = props;
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.LeaderBoard;
  const options = [`24 ${translation.hour}`, `7 ${translation.day}`, `30 ${translation.day}`];
  const optionInDay = {
    [options[0]]: 1,
    [options[1]]: 7,
    [options[2]]: 30,
  }
  return (
    <PlainSelector
      style={{marginBottom: 20}}
      title={translation.recent}
      options={options}
      onChange={(option) => {
        if (!onChange) return;
        onChange(optionInDay[option]);
      }}
    />
  )
}

export default SpanSelector
