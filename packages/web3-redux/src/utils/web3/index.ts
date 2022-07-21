import Web3 from 'web3';

//https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html?#configuration
const httpProviderOptions = {
    keepAlive: true,
    withCredentials: false,
    timeout: 5000,
    /*
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*',
        },
    ],
    */
};

/** Create Web3 Instance with default config using http rpc */
export const fromHttpRpc = (rpc: string, options?: any) => {
    const provider = new Web3.providers.HttpProvider(rpc, { ...httpProviderOptions, ...options });
    const web3 = new Web3(provider);
    //@ts-ignore
    web3.eth.ens._lastSyncCheck = Number.MAX_SAFE_INTEGER;
    //@ts-ignore
    web3.eth.ens.registryAddress = '0x0000000000000000000000000000000000000000';
    return web3;
};

const wsProviderOptions = {
    timeout: 5000,
    /*
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*',
        },
    ],
    */
    clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000, // ms
    },
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
    },
};

/** Create Web3 Instance with default config using ws rpc */
export const fromWsRpc = (rpc: string, options?: any) => {
    const provider = new Web3.providers.WebsocketProvider(rpc, { ...wsProviderOptions, ...options });
    const web3 = new Web3(provider);
    //@ts-ignore
    web3.eth.ens._lastSyncCheck = Number.MAX_SAFE_INTEGER;
    //@ts-ignore
    web3.eth.ens.registryAddress = '0x0000000000000000000000000000000000000000';
    return web3;
};

/** Create Web3 Instance with default config */
export const fromRpc = (rpc: string, options?: any) => {
    const url = new URL(rpc);
    const protocol = url.protocol;
    if (protocol === 'http:' || protocol == 'https:') return fromHttpRpc(rpc, options);
    else if (protocol === 'ws:' || protocol === 'wss:') return fromWsRpc(rpc, options);

    throw new Error(`Invalid protocol for rpc: ${rpc}`);
};
