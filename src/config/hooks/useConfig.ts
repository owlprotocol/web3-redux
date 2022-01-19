import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { selectNetworkId, selectNetwork, selectAccount } from '../selectors';

/** @category Hooks */
export function useNetworkId() {
    const value = useSelector(selectNetworkId);
    useDebugValue({ value });
    return value;
}

/** @category Hooks */
export function useNetwork() {
    const value = useSelector(selectNetwork);
    useDebugValue({ value });
    return value;
}

/** @category Hooks */
export function useAccount() {
    const value = useSelector(selectAccount);
    useDebugValue({ value });
    return value;
}
