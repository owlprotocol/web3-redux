import { useSelector } from 'react-redux';
import { selectLatestBlock } from '../selector';

export default function useLatestBlock(networkId?: string) {
    return useSelector((state: any) => selectLatestBlock(state, networkId));
}
