import React from 'react';
import {View, Text} from 'react-native';
import Timer from '../../components/Timer';
const TimerTester = () => {
  return (
    <View>
      <Timer
        color="blue"
        integerSize={100}
        decimalSize={50}
        duration={60}
        onFinish={() => console.log('finished')}
      />
    </View>
  );
};

export default TimerTester;
