import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../crud.js';
import { Network } from '../model/index.js';

/** @category Hooks */
export function useNetwork(networkId: string | undefined, defaultNetwork?: Partial<Network> | boolean) {
    const dispatch = useDispatch();
    const networkResponse = NetworkCRUD.hooks.useGet(networkId);
    const isLoading = networkResponse === 'loading';
    const network = isLoading ? undefined : networkResponse;
    const networkExists = !isLoading && !!network;

    useEffect(() => {
        if (networkId && !networkExists && defaultNetwork) {
            if (typeof defaultNetwork === 'boolean') dispatch(NetworkCRUD.actions.create({ networkId }));
            else dispatch(NetworkCRUD.actions.create({ ...defaultNetwork, networkId }));
        }
    }, [dispatch, networkId, networkExists, defaultNetwork]);

    return network;
}
