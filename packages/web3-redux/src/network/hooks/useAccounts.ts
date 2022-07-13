import { useCallback, useEffect, useState } from 'react';
import { useNetwork } from './useNetwork.js';

/**
 * @category Hooks
 * Return network if exists.
 * Create/hydrate depending on db state.
 */
export function useAccounts(networkId: string | undefined) {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [network] = useNetwork(networkId);
    const web3 = network?.web3;

    const getAccounts = useCallback(async () => {
        if (web3) {
            setAccounts(await web3.eth.getAccounts());
        } else {
            setAccounts([]);
        }
    }, [web3]);

    useEffect(() => {
        getAccounts();
    }, [getAccounts]);

    const returnOptions = {
        getAccounts,
    };
    return [accounts, returnOptions] as [typeof accounts, typeof returnOptions];
}

export default useAccounts;
