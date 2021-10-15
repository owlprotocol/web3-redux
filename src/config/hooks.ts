import { useSelector } from 'react-redux';
import { selectNetworkId, selectNetwork, selectAccount } from './selector';

export function useNetworkId() {
    const networkId = useSelector(selectNetworkId);
    return networkId;
}

export function useNetwork() {
    const networkId = useSelector(selectNetwork);
    return networkId;
}

export function useAccount() {
    const account = useSelector(selectAccount);
    return account;
}
