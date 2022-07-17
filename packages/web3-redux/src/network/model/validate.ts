import axios from 'axios';
import { Network, NetworkId, NetworkWithObjects } from './interface.js';
import { defaultNetworks } from '../defaults.js';
import { fromRpc } from '../../utils/web3/index.js';
import { isUndefined, omit, omitBy } from '../../utils/lodash/index.js';

/** @internal */
export function validateId({ networkId }: NetworkId) {
    return { networkId };
}

export function toPrimaryKey({ networkId }: NetworkId): [string] {
    return [networkId];
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

    return omitBy(
        {
            ...network,
            name,
            explorerUrl,
            explorerApiUrl,
            explorerApiKey,
            web3Rpc,
        },
        isUndefined,
    ) as unknown as Network;
}

/**
 * Hydrate network with objects.
 * @param network
 */
export function hydrate(network: NetworkWithObjects, sess: any): NetworkWithObjects {
    const { networkId, web3Rpc, explorerApiUrl, explorerApiKey } = network;
    const networkORM: NetworkWithObjects | undefined = sess.Network.withId(networkId);

    let web3 = network.web3;
    if (!web3 && networkORM?.web3 && web3Rpc === networkORM.web3Rpc) {
        //Existing web3 instance the same
        web3 = networkORM.web3;
    } else if (!web3 && web3Rpc) {
        //New web3 instance
        web3 = fromRpc(web3Rpc);
    }

    let explorerApiClient = network.explorerApiClient;
    if (
        !explorerApiClient &&
        networkORM?.explorerApiClient &&
        explorerApiUrl === networkORM.explorerApiUrl &&
        explorerApiKey === networkORM.explorerApiKey
    ) {
        //Existing axios instance
        explorerApiClient = networkORM.explorerApiClient;
    } else if (!explorerApiClient && explorerApiUrl && explorerApiKey) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl, params: { apikey: explorerApiKey } });
    } else if (!explorerApiClient && explorerApiUrl) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl });
    }

    return omitBy(
        {
            ...network,
            web3,
            explorerApiClient,
        },
        isUndefined,
    ) as unknown as NetworkWithObjects;
}

/**
 * Encode network
 * @param network
 */
export function encode(network: NetworkWithObjects): Network {
    return omit(network, ['web3', 'web3Sender', 'explorerApiClient']);
}

export default validate;
