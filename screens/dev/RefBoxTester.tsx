import React from 'react';
import {View, Text, Easing} from 'react-native';
import RefBox from '../../components/RefBox';
import styled from 'styled-components';

const StyleRefBox: typeof RefBox = styled(RefBox)`
  width: 100px;
  height: 100px;
  background-color: black;
`;

const TesterContainer: typeof View = styled(View)`
  flex: 1;
  background-color: ivory;
`;

const RefBoxTester = () => {
  const ref = React.createRef<RefBox>();
  return (
    <TesterContainer
      onTouchStart={(e) => {
        if (ref.current) {
          let randomScale = 0.5 + Math.random() * 3;
          let randomAngle = Math.random() * 360;
          const box = ref.current;
          box
            .animateXY(
              e.nativeEvent.pageX,
              e.nativeEvent.pageY,
              200,
              Easing.inOut(Easing.ease),
            )
            .start();
          box
            .animateScale(randomScale, 500, Easing.in(Easing.elastic(4)))
            .start();
          box.animateAngle(randomAngle, 500, Easing.inOut(Easing.ease)).start();
        }
      }}>
      <StyleRefBox ref={ref} />
    </TesterContainer>
  );
};

export default RefBoxTester;
