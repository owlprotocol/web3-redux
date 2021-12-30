import { AbiItem, toChecksumAddress } from 'web3-utils';
import { Contract as Web3Contract } from 'web3-eth-contract';

/**
 * Contract Id object.
 *
 * @internal
 */
export interface IdDeconstructed {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract ethereum address */
    readonly address: string;
}
/** @internal */
export type Id = string;

/** @internal */
export type BaseWeb3Contract = Omit<Web3Contract, 'once' | 'clone' | '_address' | '_jsonInterface'>;

/**
 * Contract object.
 *
 */
export interface Contract<T extends BaseWeb3Contract = BaseWeb3Contract> {
    /** Used to index contracts in redux-orm. Computed as `${networkId}-${address}` */
    readonly id?: string;
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract ethereum address */
    readonly address: string;
    /** Contract ABI */
    readonly abi?: AbiItem[];
    /** Web3 Contract instance */
    readonly web3Contract?: T;
    /** Web3 Contract instance used for send transactions */
    readonly web3SenderContract?: T;
}

/** @internal */
export type IdArgs = Id | IdDeconstructed;
const SEPARATOR = '-';
/** @internal */
export function getId(id: IdArgs): string {
    if (typeof id == 'string') return id;
    const { networkId, address } = id;
    const addressChecksum = toChecksumAddress(address);
    return [networkId, addressChecksum].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    const addressChecksum = toChecksumAddress(address);
    return { networkId, address: addressChecksum };
}

/** @internal */
export function validate(contract: Contract): Contract {
    const { networkId, address } = contract;
    const addressCheckSum = toChecksumAddress(address);
    const id = getId({ networkId, address });
    return {
        ...contract,
        id,
        address: addressCheckSum,
    };
}

export default Contract;
