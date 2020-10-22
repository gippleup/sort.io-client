import React from 'react';
import { View, Text } from 'react-native';
import ScoreChecker from '../../components/ScoreChecker';

const ScoreCheckerTester = () => {
  return (
    <View>
      <ScoreChecker
        curScore={3}
        maxScore={5}
        layout={[
          [1, 1, 1],
          [1, 1],
        ]}
        scale={0.5}
        skin="baby"
        intervalHeight={3}
      />
    </View>
  );
};

export default ScoreCheckerTester;
