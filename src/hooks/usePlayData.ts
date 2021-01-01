import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/reducers';

const usePlayData = () => {
  const playData = useSelector((state: RootState) => state.playData)
  return playData;
}

export default usePlayData;