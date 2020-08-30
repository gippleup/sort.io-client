import React, { RefObject } from 'react'
import { View, Text } from 'react-native'
import NativeRefBox from '../../components/NativeRefBox';
import chroma from 'chroma-js';

const NativeRefTester = () => {
  let particleBaseRefs: RefObject<NativeRefBox>[] = [];

  React.useEffect(() => {
    particleBaseRefs.forEach((box) => {
      box.current?.setOpacity(0);
    })
  })

  const pop = (x: number, y: number) => {
    particleBaseRefs.forEach((box) => {
      const $ = box.current;
      $?.stopAnimation();
      $?.setStyle({
        left: x,
        top: y,
        scaleX: 0,
        scaleY: 0,
        opacity: 1,
        backgroundColor: chroma.random().hex()
      })
    })

    particleBaseRefs.forEach((box) => {
      const scale = 0.2 + Math.random() * 0.3;
      const $ = box.current;
      $?.animate({
        style: {
          left: x + -25 + Math.random() * 50,
          top: y + -25 + Math.random() * 50,
          scaleX: scale,
          scaleY: scale,
          backgroundColor: chroma
            .random()
            .set('hsl.s', 1)
            .set('hsl.l', 0.5)
            .hex(),
        },
        duration: 200 + Math.random() * 100,
        easing: "easeOutBack",
        fps: 60,
      }).start(() => {
        $.animate({
          style: {
            left: x,
            top: y,
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
          },
          duration: 200 + Math.random() * 100,
          easing: "easeOutSine",
          fps: 60,
        }).start();
      });
    })
  }

  return (
    <View
      style={{flex :1, backgroundColor: 'lightgrey'}}
      onStartShouldSetResponder={() => true}
      onResponderStart={(touch) => {
        const { pageX: x, pageY: y } = touch.nativeEvent;
        pop(x, y);
      }}>
      {Array(20).fill(1).map((_, i) => {
        const boxRef = React.createRef<NativeRefBox>();
        particleBaseRefs.push(boxRef);
        return (
          <NativeRefBox ref={boxRef} style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 100,
            width: 20,
            height: 20,
          }} key={i}>
          </NativeRefBox>
        )
      })}
    </View>
  )
}

export default NativeRefTester
