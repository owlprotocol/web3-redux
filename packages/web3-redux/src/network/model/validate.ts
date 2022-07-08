import axios, { Axios } from 'axios';

import { Network, NetworkId, NetworkWithObjects } from './interface.js';
import { defaultNetworks } from '../defaults.js';
import { fromRpc } from '../../utils/web3/index.js';
import { omit } from '../../utils/lodash/index.js';

/** @internal */
export function validateId(item: NetworkId) {
    return item.networkId;
}

/**
 * Validate network with default values.
 * @param network
 */
export function validate(network: Network): Network {
    const networkId = network.networkId;
    const defaultNetworkForId = defaultNetworks()[networkId];
    const name = network.name ?? defaultNetworkForId?.name;
    const explorerUrl = network.explorerUrl ?? defaultNetworkForId?.explorerUrl;
    const explorerApiUrl = network.explorerApiUrl ?? defaultNetworkForId?.explorerApiUrl;
    const explorerApiKey = network.explorerApiKey ?? defaultNetworkForId?.explorerApiKey;
    const web3Rpc = network.web3Rpc ?? defaultNetworkForId?.web3Rpc;

    return {
        ...network,
        name,
        explorerUrl,
        explorerApiUrl,
        explorerApiKey,
        web3Rpc,
    };
}

/**
 * Hydrate network with objects.
 * @param network
 */
export function hydrate(network: Network): NetworkWithObjects {
    const { web3Rpc, explorerApiUrl, explorerApiKey } = network;

    const web3 = web3Rpc ? fromRpc(web3Rpc) : undefined;

    let explorerApiClient: Axios | undefined = undefined;
    if (explorerApiUrl && explorerApiKey)
        explorerApiClient = axios.create({ baseURL: explorerApiUrl, params: { apikey: explorerApiKey } });
    else if (explorerApiUrl) explorerApiClient = axios.create({ baseURL: explorerApiUrl });

    return {
        ...network,
        web3,
        explorerApiClient,
    };
}

/**
 * Encode network
 * @param network
 */
export function encode(network: NetworkWithObjects): Network {
    return omit(network, ['web3', 'web3Sender']);
}

export default validate;
