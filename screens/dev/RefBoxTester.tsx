import React from 'react';
import {View, Text, Easing} from 'react-native';
import RefBox from '../../components/RefBox';
import styled from 'styled-components';

const StyleRefBox: typeof RefBox = styled(RefBox)`
  width: 100px;
  height: 100px;
  background-color: black;
`;

const RefBoxTester = () => {
  const ref = React.createRef<RefBox>();
  return (
    <View
      onTouchStart={() =>
        ref.current?.animateAngle(2, 1000, Easing.in(Easing.bounce))
      }>
      <StyleRefBox ref={ref} />
    </View>
  );
};

export default RefBoxTester;
