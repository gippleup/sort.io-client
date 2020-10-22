import React from 'react';
import {View, Text} from 'react-native';
import EndGameInfo, {
  EndGameInfo as EndGameInfoClass,
} from '../../components/EndGameInfo';

const EndGameInfoTester = () => {
  const infoRef = React.createRef<EndGameInfoClass>();
  React.useEffect(() => {
    setTimeout(() => {
      infoRef.current?.alertBattleResult();
    }, 1000);
  });
  return <EndGameInfo ref={infoRef} gameType="multi" stage={150} />;
};

export default EndGameInfoTester;
