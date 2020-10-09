import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlexHorizontal, NotoSans } from '../../../components/Generic/StyledComponents';

type ReduxActionButtonProps = {
  text: string;
  onPress?: () => any;
  description?: string;
}

const ReduxActionButton = (props: ReduxActionButtonProps) => {
  const { text, onPress, description } = props;
  const Description = () => {
    if (!description) return <></>;
    return (
      <View style={{flex: 1}}>
        <NotoSans style={{marginLeft: 5}} type="Regular">
          {": " + description}
        </NotoSans>
      </View>
    )
  }
  return (
    <FlexHorizontal style={{marginBottom: 5, alignItems: 'flex-start'}}>
      <TouchableOpacity onPress={onPress}>
        <NotoSans size={18} color="white" style={{ padding: 5, backgroundColor: 'green', borderRadius: 5 }} type="Black">
          {text}
        </NotoSans>
      </TouchableOpacity>
      <Description />
    </FlexHorizontal>
  )
}

export default ReduxActionButton
