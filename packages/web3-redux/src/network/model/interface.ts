import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { Axios } from 'axios';

/** @internal */
export interface NetworkId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
}

/**
 * EVM Network object.
 * Other objects are indexed on its networkId, and use it to fetch it to make requests using its web3.js connection.
 *
 */
export interface Network extends NetworkId {
    /** Human readable name for the network */
    readonly name?: string;
    /** Native currency */
    readonly currency?: {
        readonly name: string;
        readonly symbol: string;
        readonly decimals: number;
    };
    /** Web3 RPC URL (websocket recommended). Used to generate Web3 instance. */
    readonly web3Rpc?: string;
    /** @hidden Multicall.sol contract address. Used for optimized batching of calls. */
    readonly multicallAddress?: string;
    /** @hidden Gas limit of network. */
    readonly gasLimit?: number;
    /** Latest block nummber. Updated via getBlockNumber() or middleware tracking block subscription updates. */
    readonly latestBlockNumber?: number;
    /** Block explorer (eg. Etherscan) to use for network. */
    readonly explorerUrl?: string;
    /** Block explorer API url (eg. Etherscan) to use for indexed explorer data */
    readonly explorerApiUrl?: string;
    /** Block explorer API key */
    readonly explorerApiKey?: string;
    /** Ens domain */
    readonly ens?: string;

    /** Relay Hub address */
    readonly relayHub?: string;
    /** Trusted Forwarder address */
    readonly forwarder?: string;
    /** Version Registry address */
    readonly versionRegistry?: string;
    /** Paymaster address */
    readonly paymaster?: string;
}

export interface NetworkWithObjects extends Network {
    /** Web3 object. We recommend using a websocket connection. */
    readonly web3?: Web3;
    /** Web3 object specialized for sending transactions. */
    readonly web3Sender?: Web3;
    /** Multicall web3 contract instance */
    readonly multicallContract?: Web3Contract;
    /** Block explorer API HTTP Client */
    readonly explorerApiClient?: Axios;

    /** Web3 GSN object. */
    readonly web3WithGSN?: Web3;
}

export const NetworkIndex = 'networkId';

export default Network;
