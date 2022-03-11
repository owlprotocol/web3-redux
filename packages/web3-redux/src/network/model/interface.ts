import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
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
    /** Web3 RPC URL (websocket recommended). Used to generate Web3 instance. */
    readonly web3Rpc?: string;
    /** Web3 object. We recommend using a websocket connection. */
    readonly web3?: Web3;
    /** Web3 object specialized for sending transactions. */
    readonly web3Sender?: Web3;
    /** @hidden Multicall.sol contract address. Used for optimized batching of calls. */
    readonly multicallAddress?: string;
    /** @hidden Multicall web3 contract instance */
    readonly multicallContract?: Web3Contract;
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
    /** Block explorer API HTTP Client */
    readonly explorerApiClient?: Axios;
    /** Ens domain */
    readonly ens?: string;
}

export default Network;