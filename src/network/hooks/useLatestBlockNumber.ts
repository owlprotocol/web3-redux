import { useSelector } from 'react-redux';
import { selectLatestBlockNumber } from '../selector';

export default function useLatestBlockNumber(networkId?: string) {
    return useSelector((state: any) => selectLatestBlockNumber(state, networkId));
}
