import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { loadPlayData, updatePlayData } from '../redux/actions/playData/creator';
import { subscribePlayData } from '../api/local';

const usePlayData = () => {
  const dispatch = useDispatch();
  const playData = useSelector((state: RootState) => state.playData)
  React.useEffect(() => {
    if (!playData.loaded) {
      dispatch(loadPlayData());
    }
    subscribePlayData('updatePlayData', (data) => {
      dispatch(updatePlayData(data));
    })
  })
  return playData;
}

export default usePlayData;