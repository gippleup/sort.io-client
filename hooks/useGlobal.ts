import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';

const useGlobal = () => {
  const global = useSelector((state: RootState) => state.global)
  return global;
}

export default useGlobal;