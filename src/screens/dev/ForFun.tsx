import React, { RefObject } from 'react'
import { View, Text, Dimensions } from 'react-native'
import NativeRefBox from '@components/NativeRefBox'
import chroma, { random } from 'chroma-js'
import { FlexHorizontal, NotoSans, RoundPaddingCenter } from '@components/Generic/StyledComponents'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'
import { Easings } from '@components/NativeRefBox/easings'
import DynamicText from '@components/DynamicText'

const ForFun = () => {
  const boxRefBag: RefObject<NativeRefBox>[] = [];
  const fpsTextRef = React.createRef<DynamicText>();
  let fps = 60;
  let easing: Easings = "easeOutElastic";

  const randomTransform = () => {
    boxRefBag.forEach((boxRef) => {
      const $ = boxRef.current;
      $?.stopAnimation();
      $?.animate({
        style: {
          paddingTop: Math.random() * 100,
          paddingLeft: Math.random() * 100,
          backgroundColor: chroma.random().hex(),
        },
        duration: 1000 + Math.random() * 1000,
        easing: "easeOutElastic",
        fps,
      }).start(() => {
        setTimeout(() => {
          $.animate({
            style: {
              paddingTop: 0,
              paddingLeft: 0,
            },
            duration: 500 + Math.random() * 500,
            easing: "easeInOutSine"
          }).start()
        }, 1000)
      });
    })
  }

  React.useEffect(() => {
    fps = 60;
  })

  const renderNativeRefBox = () => {
    return (
      <>
        {Array(5).fill(1).map((_, i) => {
          const boxRef = React.createRef<NativeRefBox>();
          boxRefBag.push(boxRef);
          return (
            <NativeRefBox
              key={i}
              ref={boxRef}
              style={{
                width: 20,
                height: 20,
                backgroundColor: chroma.random().hex()
              }}
            />
          )
        })}
      </>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'slategrey', justifyContent: 'space-between'}}>
      <FlexHorizontal style={{justifyContent: 'space-around'}}>
        <View style={{ alignItems: 'center' }}>
          {renderNativeRefBox()}
        </View>
        <View style={{ alignItems: 'center' }}>
          {renderNativeRefBox()}
        </View>
        <View style={{ alignItems: 'center' }}>
          {renderNativeRefBox()}
        </View>
      </FlexHorizontal>
      <View>
        <View style={{alignItems: 'center'}}>
          <FlexHorizontal>
            <RoundPaddingCenter>
              <NotoSans type="Black">
                FPS
              </NotoSans>
            </RoundPaddingCenter>
            <DynamicText
              initialValue='60'
              ref={fpsTextRef}
              renderer={(text) => (
                <NotoSans type="Black">
                  {text}
                </NotoSans>
              )}
            />
            <Slider
              style={{width: 200, height: 40}}
              value={60}
              minimumValue={5}
              maximumValue={120}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={1}
              onValueChange={(value) => {
                fps = value;
                if (fpsTextRef.current) {
                  fpsTextRef.current.setText(String(value))
                }
              }}
            />
          </FlexHorizontal>
        </View>
        <TouchableOpacity onPress={() => {
          requestAnimationFrame(() => {
            randomTransform();
          })
        }}>
          <RoundPaddingCenter>
            <NotoSans size={40} type="Black">
              변해라 얍!!
            </NotoSans>
          </RoundPaddingCenter>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForFun
