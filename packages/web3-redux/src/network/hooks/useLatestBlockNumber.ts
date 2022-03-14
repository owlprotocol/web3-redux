import { useSelector } from 'react-redux';
import selectLatestBlockNumber from '../selectors/selectLatestBlockNumber.js';

/** @category Hooks */
export function useLatestBlockNumber(networkId: string | undefined) {
    return useSelector((state: any) => selectLatestBlockNumber(state, networkId));
}

export default useLatestBlockNumber;
