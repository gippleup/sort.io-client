import BlockStack2021 from '@components/PropBlockStack2021'
import { FlexHorizontal, FullFlexCenter, NotoSans, Space } from '@components/Generic/StyledComponents'
import React, { Fragment } from 'react'
import { View, Text, Button, Switch, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker'
import skinMap, { SupportedSkin } from '@components/Block/skinMap'
import Slider from '@react-native-community/slider';
import { StackStatus } from 'src/model/BlockStackModel'

const BlockStackTester = () => {
  const [stack, setStack] = React.useState<number[]>([]);
  const [status, setStatus] = React.useState<StackStatus>("docked");
  const [skin, setSkin] = React.useState<SupportedSkin>("baby");
  const [scale, setScale] = React.useState(1);
  const [animationType, setAnimationType] = React.useState<"squashy" | "stiff" | "none">("squashy");
  const [completed, setCompleted] = React.useState<boolean>(false);
  const addBlock = (block: number) => setStack([...stack, block]);
  const removeBlock = () => setStack(stack.slice(0, stack.length - 1));
  return (
    <FullFlexCenter>
      <BlockStack2021
        completed={completed}
        stack={stack}
        skin={skin}
        status={status}
        scale={scale}
        animationType={animationType}
      />
    
      <Space height={5} />
      <View style={{position: "absolute", bottom: 30, backgroundColor: "white", padding: 5, borderRadius: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
        <View style={{alignItems: "center"}}>
          <NotoSans size={10} type="Bold" color="black">블록 추가하기</NotoSans>
          <FlexHorizontal>
            {Array(5).fill(1).map((_, i) => (
              <Fragment key={i}>
              <TouchableOpacity onPress={() => addBlock(i)} style={{backgroundColor: "dodgerblue", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">{i}</NotoSans>
              </TouchableOpacity>
              {i < 4 ? <Space width={5} /> : <></>}
              </Fragment>
            ))}
          </FlexHorizontal>
        </View>
        <Space width={10} />
        <View>
          <TouchableOpacity onPress={removeBlock}>
            <View style={{alignItems: "center", backgroundColor: "red", padding: 5, borderRadius: 10}}>
              <NotoSans size={10} type="Bold" color="white">블록 제거하기</NotoSans>
            </View>
          </TouchableOpacity>
        </View>
        <Space width={10} />
        <View style={{alignItems: "center"}}>            
          <NotoSans size={10} type="Bold" color="black">상태 변경</NotoSans>
          <FlexHorizontal>
            <TouchableOpacity onPress={() => setStatus("dock")}>
              <View style={{alignItems: "center", backgroundColor: "green", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Dock</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setStatus("undock")}>
              <View style={{alignItems: "center", backgroundColor: "green", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Undock</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setStatus("docked")}>
              <View style={{alignItems: "center", backgroundColor: "green", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Docked</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setStatus("undocked")}>
              <View style={{alignItems: "center", backgroundColor: "green", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Undocked</NotoSans>
              </View>
            </TouchableOpacity>
          </FlexHorizontal>
        </View>
        <View style={{alignItems: "center"}}>            
          <NotoSans size={10} type="Bold" color="black">애니메이션 변경</NotoSans>
          <FlexHorizontal>
            <TouchableOpacity onPress={() => setAnimationType("squashy")}>
              <View style={{alignItems: "center", backgroundColor: "purple", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Squashy</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setAnimationType("stiff")}>
              <View style={{alignItems: "center", backgroundColor: "purple", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">Stiff</NotoSans>
              </View>
            </TouchableOpacity>
            <Space width={5} />
            <TouchableOpacity onPress={() => setAnimationType("none")}>
              <View style={{alignItems: "center", backgroundColor: "purple", padding: 5, borderRadius: 10}}>
                <NotoSans size={10} type="Bold" color="white">None</NotoSans>
              </View>
            </TouchableOpacity>
          </FlexHorizontal>
        </View>
        <Space width={10} />
        <View style={{alignItems: "center"}}>            
          <NotoSans size={10} type="Bold" color="black">스킨 변경</NotoSans>
          <FlexHorizontal>
            <Picker
              selectedValue={skin}
              onValueChange={(itemValue) => setSkin(itemValue as SupportedSkin)}
              style={{width: 120}}
            >
              {Object.keys(skinMap).map((skin) => (
                <Picker.Item key={skin} label={skin} value={skin} />
              ))}
            </Picker>
          </FlexHorizontal>
        </View>
        <View style={{alignItems: "center"}}>            
          <NotoSans size={10} type="Bold" color="black">완료 상태</NotoSans>
          <Switch
            trackColor={{false: "grey", true: "green"}}
            thumbColor={completed ? "springgreen" : "red"}
            onValueChange={setCompleted}
            value={completed}
          />
        </View>
        <View style={{alignItems: "center"}}>            
          <NotoSans size={10} type="Bold" color="black">Scale</NotoSans>
          <Slider
            style={{width: Dimensions.get("screen").width - 100, height: 40}}
            minimumValue={0.1}
            maximumValue={2}
            minimumTrackTintColor="grey"
            maximumTrackTintColor="goldenrod"
            step={0.1}
            onValueChange={setScale}
            value={scale}
          />
        </View>
      </View>
    </FullFlexCenter>
  )
}

export default BlockStackTester
