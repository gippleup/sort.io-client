import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Timer from '../../components/Timer';

const TimerTester = () => {
  const textRef = React.createRef<TextInput>();

  const setText = (text: string) => {
    if (textRef.current) {
      textRef.current.setNativeProps({text});
    }
  };

  return (
    <View>
      <Timer
        color="blue"
        iconSize={20}
        integerSize={60}
        decimalSize={20}
        duration={10}
        alertAt={6}
        onStart={() => {
          setText('started!');
          setTimeout(() => {
            setText('');
          }, 2000);
        }}
        onAlert={() => {
          setText('alert!');
          setTimeout(() => {
            setText('');
          }, 2000);
        }}
        onFinish={() => {
          setText('finished!');
          setTimeout(() => {
            setText('');
          }, 2000);
        }}
      />
      <TextInput ref={textRef} style={{fontSize: 40}} />
    </View>
  );
};

export default TimerTester;
