import NetworkCRUD from '../crud.js';
import { Network, NetworkWithObjects } from '../model/index.js';

/**
 * @category Hooks
 * Return network if exists.
 * Create/hydrate depending on db state.
 */
export function useNetwork(networkId: string, defaultNetwork?: Network | true) {
    const defaultObj = defaultNetwork === true ? { networkId } : defaultNetwork;
    const [network, returnOptions] = NetworkCRUD.hooks.useHydrate({ networkId }, defaultObj);
    return [network, returnOptions] as [NetworkWithObjects | undefined, typeof returnOptions];
}
