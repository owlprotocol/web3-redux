import { useSelector } from 'react-redux';
import selectByIdSingle from '../selectors/selectByIdSingle.js';

/** @category Hooks */
export function useNetwork(networkId: string | undefined) {
    return useSelector((state: any) => selectByIdSingle(state, networkId));
}

export default useNetwork;
