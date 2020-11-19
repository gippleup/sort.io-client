import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NotoSans } from '../../components/Generic/StyledComponents';
import MultiFoldTimerBar from '../../components/MultiFoldTimerBar'

const MultiFoldTimerBarTester = () => {
  const timerRef = React.createRef<MultiFoldTimerBar>();

  const onStart = () => {
    timerRef.current?.startTimer();
  }

  const onStop = () => {
    timerRef.current?.stopTimer();
  }

  React.useEffect(() => {
    let leftTime = 10;
    const interval = setInterval(() => {
      leftTime --;
      timerRef.current?.setTimeTo(leftTime);
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  })

  return (
    <View>
      <MultiFoldTimerBar
        ref={timerRef}
        fps={60}
        acc={0.25}
        height={50}
        foldCount={5}
        duration={10}
        easing="linear"
        colorScale={["springgreen", "yellow", "orange", "red"]}
        onBarEnd={(phase) => console.log(phase)}
        onFinish={() => console.log("finish")}
        onBarFilled={(index) => console.log(index)}
      />
      <TouchableOpacity onPress={onStart}>
        <NotoSans size={100}>시작</NotoSans>
      </TouchableOpacity>
      <TouchableOpacity onPress={onStop}>
        <NotoSans size={100}>정지</NotoSans>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        timerRef.current?.initialize();
      }}>
        <NotoSans size={100}>리셋</NotoSans>
      </TouchableOpacity>
    </View>
  )
}

export default MultiFoldTimerBarTester
