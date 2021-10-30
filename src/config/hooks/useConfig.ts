import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { selectNetworkId, selectNetwork, selectAccount } from '../selectors';

export function useNetworkId() {
    const value = useSelector(selectNetworkId);
    useDebugValue({ value });
    return value;
}

export function useNetwork() {
    const value = useSelector(selectNetwork);
    useDebugValue({ value });
    return value;
}

export function useAccount() {
    const value = useSelector(selectAccount);
    useDebugValue({ value });
    return value;
}
