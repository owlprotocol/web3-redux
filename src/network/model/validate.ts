import Network from './interface';
import { defaultNetworks } from '../defaults';
/**
 * Validate network with default values.
 * @param network
 */
export function validate(network: Network): Network {
    const networkId = network.networkId;
    const defaultNetworkForId = defaultNetworks[networkId];
    const name = network.name ?? defaultNetworkForId.name;
    const explorerUrl = network.explorerUrl ?? defaultNetworkForId.explorerUrl;
    const explorerApiUrl = network.explorerApiUrl ?? defaultNetworkForId.explorerApiUrl;
    const explorerApiKey = network.explorerApiKey ?? defaultNetworkForId.explorerApiKey;

    return {
        ...network,
        name,
        explorerUrl,
        explorerApiUrl,
        explorerApiKey,
    };
}

export default validate;
