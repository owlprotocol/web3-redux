import { useSelector } from 'react-redux';
import selectByIdMany from '../selectors/selectByIdMany.js';

/** @category Hooks */
export function useNetworks(networkIds?: string[] | undefined) {
    return useSelector((state: any) => selectByIdMany(state, networkIds));
}

export default useNetworks;
