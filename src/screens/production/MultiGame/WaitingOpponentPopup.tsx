import React from 'react'
import { View, Text, Easing, Animated } from 'react-native'
import styled from 'styled-components'
import { NotoSans } from '../../../components/Generic/StyledComponents';

const Container: typeof View = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.7);
  align-items: center;
  justify-content: center;
`;

const InfoText: typeof NotoSans = styled(NotoSans)`
  width: 120px;
  height: 120px;
  background-color: dodgerblue;
  border-width: 0.5px;
  border-radius: 30px;
  text-align: center;
  text-align-vertical: center;
`;

const WaitingOpponentPopup = () => {
  const wiggle = React.useRef(new Animated.Value(0));
  const scale = wiggle.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  
  React.useEffect(() => {
    const scaleAnimation = Animated.sequence([
      Animated.timing(wiggle.current, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(wiggle.current, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(scaleAnimation).start();
  })

  return (
    <Container>
      <Animated.View style={{transform: [{scale}]}}>
        <InfoText
          size={20}
          color="white"
          type="Black"
        >
          {"상대방을\n기다리고\n있습니다"}
        </InfoText>
      </Animated.View>
    </Container>
  )
}

export default WaitingOpponentPopup
