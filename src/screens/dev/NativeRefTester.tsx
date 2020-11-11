import React, { RefObject } from 'react'
import { View, Text } from 'react-native'
import NativeRefBox from '../../components/NativeRefBox';
import chroma from 'chroma-js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NotoSans } from '../../components/Generic/StyledComponents';

type NativeRefTesterTargets = "particle" | "sequence" | "loop";

const NativeRefTester = () => {
  const targets: NativeRefTesterTargets[] = ["particle", "sequence", "loop"]
  const [target, setTarget] = React.useState(targets[0]);
  let particleBaseRefs: RefObject<NativeRefBox>[] = [];
  const sequenceRef = React.createRef<NativeRefBox>();
  const loopRef = React.createRef<NativeRefBox>();

  React.useEffect(() => {
    particleBaseRefs.forEach((box) => {
      box.current?.setOpacity(0);
    })
  })

  const test: {[T in NativeRefTesterTargets]: (x: number, y: number) => any} = {
    particle: (x, y) => {
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
    },
    sequence: (x, y) => {
      sequenceRef.current?.setStyle({
        left: x,
        top: y,
        scaleX: 0,
        scaleY: 0,
      })
      const appear = sequenceRef.current?.animate({
        style: {
          scaleX: 1,
          scaleY: 1,
          backgroundColor: "red",
        },
        duration: 500,
        easing: "easeOutElastic",
      });
      const scaleUp = sequenceRef.current?.animate({
        style: {
          scaleX: 2,
          scaleY: 2,
        },
        duration: 500,
        easing: "easeOutElastic",
      });
      const disappear = sequenceRef.current?.animate({
        style: {
          scaleX: 0,
          scaleY: 0,
        },
        duration: 1000,
        easing: "easeOutBounce",
      });
      // sequenceRef.current?.stopAnimation();
      NativeRefBox.sequence([appear, scaleUp, disappear]).start();
    },
    loop: (x, y) => {
      sequenceRef.current?.setStyle({
        left: x,
        top: y,
        scaleX: 0,
        scaleY: 0,
      })
      const appear = sequenceRef.current?.animate({
        style: {
          scaleX: 1,
          scaleY: 1,
          backgroundColor: "red",
        },
        duration: 500,
        easing: "easeOutElastic",
      });
      const scaleUp = sequenceRef.current?.animate({
        style: {
          scaleX: 2,
          scaleY: 2,
        },
        duration: 500,
        easing: "easeOutElastic",
      });
      const disappear = sequenceRef.current?.animate({
        style: {
          scaleX: 0,
          scaleY: 0,
        },
        duration: 1000,
        easing: "easeOutBounce",
      });
      // sequenceRef.current?.stopAnimation();
      NativeRefBox.loop(NativeRefBox.sequence([appear, scaleUp, disappear]), 5).start();
    }
  }

  const renderTarget: {[T in NativeRefTesterTargets]: JSX.Element[] | JSX.Element} = {
    particle: Array(20).fill(1).map((_, i) => {
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
    }),
    sequence: (
      <NativeRefBox
        ref={sequenceRef}
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          backgroundColor: "dodgerblue",
          scaleY: 0,
          scaleX: 0,
        }}
      />
    ),
    loop: (
      <NativeRefBox
        ref={sequenceRef}
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          backgroundColor: "dodgerblue",
          scaleY: 0,
          scaleX: 0,
        }}
      />
    )
  }

  const SelectTargetButtons = targets.map((target) => (
    <TouchableOpacity key={target} onPress={() => setTarget(target)}>
      <NotoSans type="Black">{target}</NotoSans>
    </TouchableOpacity>
  ))


  return (
    <View
      style={{flex :1, backgroundColor: 'lightgrey'}}
      onStartShouldSetResponder={() => true}
      onResponderStart={(touch) => {
        const { pageX: x, pageY: y } = touch.nativeEvent;
        if (test[target]) {
          test[target](x, y);
        }
      }}>
      {SelectTargetButtons}
      {renderTarget[target]}
    </View>
  )
}

export default NativeRefTester
