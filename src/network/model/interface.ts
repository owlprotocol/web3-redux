import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';

export interface IdDeconstructed {
    readonly networkId: string;
}
export type Id = string;

/**
 * EVM Network object.
 * @see {@link https://chainid.network//} for a list of popular EVM Networks.
 *
 * @param networkId - A network id.
 * @param web3 - A web3 object.
 * @param web3Sender - A web3 object used for send transactions.
 */
export interface Interface extends IdDeconstructed {
    readonly id?: Id;
    readonly web3?: Web3;
    readonly web3Sender?: Web3;
    readonly multicallAddress?: string;
    readonly multicallContract?: Web3Contract;
    readonly gasLimit?: number;
}

export default Interface;
