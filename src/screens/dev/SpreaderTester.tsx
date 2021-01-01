import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DynamicText from '@components/DynamicText'
import { NotoSans } from '@components/Generic/StyledComponents'
import Spreader from '@components/Spreader'
import SingleRankBoard from '@screens/production/LeaderBoard/SingleRankBoard'

const SpreaderTester = () => {
  const spreaderRef = React.useRef<Spreader>(null);
  const spreaded = React.useRef(false);

  const onPress = () => {
    if (spreaderRef.current?.folded) {
      spreaderRef.current?.setSpread("unfold");
    } else {
      spreaderRef.current?.setSpread("fold")
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{padding: 10, backgroundColor: "white", borderRadius: 20, borderWidth: 1, alignItems: "center"}}>
          <DynamicText
            initialValue="열기"
            renderer={(text) => (
              <NotoSans type="Black">
                {text}
              </NotoSans>
            )}
          />
        </View>
      </TouchableOpacity>
      <Spreader ref={spreaderRef}>
        <SingleRankBoard/>
      </Spreader>
    </View>
  )
}

export default SpreaderTester
