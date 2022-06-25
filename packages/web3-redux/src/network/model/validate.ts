import axios from 'axios';

import { Network } from './interface.js';
import { defaultNetworks } from '../defaults.js';
import { fromRpc } from '../../utils/web3/index.js';
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

    let web3 = network.web3;
    if (!web3 && web3Rpc) {
        web3 = fromRpc(web3Rpc);
    }

    const validatedNetwork = { ...network };
    if (name) validatedNetwork.name = name;
    if (explorerUrl) validatedNetwork.explorerUrl = explorerUrl;
    if (explorerApiUrl) validatedNetwork.explorerApiUrl = explorerApiUrl;
    if (explorerApiKey) validatedNetwork.explorerApiKey = explorerApiKey;
    if (web3Rpc) validatedNetwork.web3Rpc = web3Rpc;
    if (web3) validatedNetwork.web3 = web3;

    let explorerApiClient = network.explorerApiClient;
    if (!explorerApiClient && explorerApiUrl) {
        if (explorerApiKey)
            explorerApiClient = axios.create({ baseURL: explorerApiUrl, params: { apikey: explorerApiKey } });
        else explorerApiClient = axios.create({ baseURL: explorerApiUrl });
    }
    if (explorerApiClient) validatedNetwork.explorerApiClient = explorerApiClient;

    return validatedNetwork;
}

export default validate;
