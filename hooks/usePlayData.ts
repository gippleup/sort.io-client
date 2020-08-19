import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { loadPlayData } from '../redux/actions/playData/creator';

const usePlayData = () => {
  const dispatch = useDispatch();
  const playData = useSelector((state: RootState) => state.playData)
  React.useEffect(() => {
    if (!playData.loaded) {
      dispatch(loadPlayData());
    }
  })
  return playData;
}

export default usePlayData;