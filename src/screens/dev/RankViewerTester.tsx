import React from 'react';
import {View, Text} from 'react-native';
import RankViewer, { RankViewerData } from '@components/RankViewer';


const fakeRankList: RankViewerData = [
  {
    name: '백만송이',
    rank: 14523,
    rate: 0.125,
  },
  {
    name: '천만송이',
    rank: 14524,
    rate: 0.125,
  },
  {
    name: '화산송이',
    rank: 14525,
    rate: 0.126,
  },
  {
    name: '버섯송이',
    rank: 14526,
    rate: 0.126,
  },
  {
    name: '표고송이',
    rank: 14527,
    rate: 0.126,
  },
  {
    name: '미친송이',
    rank: 14528,
    rate: 0.126,
  },
];

const RankViewerTester = () => {
  return (
    <RankViewer
      style={{height: 200, width: 300, borderColor: 'grey'}}
      borderWidth={1}
      data={fakeRankList}
    />
  );
};

export default RankViewerTester;
