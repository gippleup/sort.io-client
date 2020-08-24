import React from 'react'
import { View, Text } from 'react-native'
import { RoundPaddingCenter, NotoSans, FlexHorizontal } from '../../components/Generic/StyledComponents'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

const AsyncStorageController = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlexHorizontal style={{justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => AsyncStorage.clear()}>
          <RoundPaddingCenter>
            <NotoSans type="Black" size={20}>클리어</NotoSans>
          </RoundPaddingCenter>
        </TouchableOpacity>
      </FlexHorizontal>
    </View>
  )
}

export default AsyncStorageController
