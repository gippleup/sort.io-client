import React from 'react'
import { View, Text } from 'react-native'
import GameScene from '../../components/GameScene'

const GameSceneTester = () => {
  return <GameScene title={'하드 1-5'} timeLimit={60} maxScore={5} />;
};

export default GameSceneTester;
