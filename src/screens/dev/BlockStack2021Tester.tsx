import BlockStack2021 from '@components/BlockStack2021'
import { FlexHorizontal, FullFlexCenter, NotoSans, Space } from '@components/Generic/StyledComponents'
import React, { Fragment } from 'react'
import { View, Text, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BlockStackTester = () => {
  const [stack, setStack] = React.useState<number[]>([]);
  const [status, setStatus] = React.useState<"dock" | "undock" | "still">("dock");
  const addBlock = (block: number) => setStack([...stack, block]);
  const removeBlock = () => setStack(stack.slice(0, stack.length - 1));
  return (
    <FullFlexCenter>
      <BlockStack2021 stack={stack} skin="batcap" status={status} scale={1} />
      
      <Space height={5} />
      <View style={{position: "absolute", bottom: 30, backgroundColor: "white", padding: 10, borderRadius: 10}}>
        <View style={{alignItems: "center"}}>
          <NotoSans type="Bold" color="black">블록 추가하기</NotoSans>
          <FlexHorizontal>
            {Array(5).fill(1).map((_, i) => (
              <Fragment key={i}>
              <TouchableOpacity onPress={() => addBlock(i)} style={{backgroundColor: "dodgerblue", padding: 10, borderRadius: 10}}>
                <NotoSans type="Bold" color="white">{i}</NotoSans>
              </TouchableOpacity>
              {i < 4 ? <Space width={5} /> : <></>}
              </Fragment>
            ))}
          </FlexHorizontal>
        </View>
        <Space height={5} />
        <View>
          <TouchableOpacity onPress={removeBlock}>
            <View style={{alignItems: "center", backgroundColor: "red", padding: 10, borderRadius: 10}}>
              <NotoSans type="Bold" color="white">블록 제거하기</NotoSans>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: "center"}}>            
          <NotoSans type="Bold" color="black">상태 변경</NotoSans>
          <FlexHorizontal>
            <TouchableOpacity onPress={() => setStatus("dock")}>
              <View style={{alignItems: "center", backgroundColor: "red", padding: 10, borderRadius: 10}}>
                <NotoSans type="Bold" color="white">Dock</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setStatus("undock")}>
              <View style={{alignItems: "center", backgroundColor: "red", padding: 10, borderRadius: 10}}>
                <NotoSans type="Bold" color="white">Undock</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setStatus("still")}>
              <View style={{alignItems: "center", backgroundColor: "red", padding: 10, borderRadius: 10}}>
                <NotoSans type="Bold" color="white">Still</NotoSans>
              </View>
            </TouchableOpacity>
          </FlexHorizontal>
        </View>
      </View>
    </FullFlexCenter>
  )
}

export default BlockStackTester
