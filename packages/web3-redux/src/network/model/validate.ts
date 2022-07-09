import axios, { Axios } from 'axios';

import Web3 from 'web3';
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
export function hydrate(network: Network, sess: any): NetworkWithObjects {
    const { networkId, web3Rpc, explorerApiUrl, explorerApiKey } = network;
    const networkORM: NetworkWithObjects | undefined = sess.Network.withId(networkId);

    let web3: Web3 | undefined;
    if (networkORM?.web3 && web3Rpc === networkORM.web3Rpc) {
        //Existing web3 instance the same
        web3 = networkORM.web3;
    } else if (web3Rpc) {
        //New web3 instance
        web3 = fromRpc(web3Rpc);
    }

    let explorerApiClient: Axios | undefined;
    if (
        networkORM?.explorerApiClient &&
        explorerApiUrl === networkORM.explorerApiUrl &&
        explorerApiKey === networkORM.explorerApiKey
    ) {
        //Existing axios instance
        explorerApiClient = networkORM.explorerApiClient;
    } else if (explorerApiUrl && explorerApiKey) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl, params: { apikey: explorerApiKey } });
    } else if (explorerApiUrl) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl });
    }

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
