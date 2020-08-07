import React from 'react';
import {View, Text} from 'react-native';
import RankViewer from '../../components/RankViewer';

const RankViewerTester = () => {
  return (
    <RankViewer
      style={{height: 200, width: 300, borderColor: 'grey'}}
      borderWidth={1}
    />
  );
};

export default RankViewerTester;
