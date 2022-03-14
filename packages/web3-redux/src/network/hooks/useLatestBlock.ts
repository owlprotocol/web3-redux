import { useSelector } from 'react-redux';
import selectLatestBlock from '../selectors/selectLatestBlock.js';

/** @category Hooks */
export function useLatestBlock(networkId: string | undefined) {
    return useSelector((state: any) => selectLatestBlock(state, networkId));
}

export default useLatestBlock;
