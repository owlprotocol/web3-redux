import { AbiItem, toChecksumAddress } from 'web3-utils';
import { Contract as Web3Contract } from 'web3-eth-contract';

/**
 * Contract Id object.
 *
 * @param networkId - A network id.
 * @param address - Contract address.
 * @internal
 */
export interface IdDeconstructed {
    networkId: string;
    address: string;
}
/** @internal */
export type Id = string;

/** @internal */
export type BaseWeb3Contract = Omit<Web3Contract, 'once' | 'clone' | '_address' | '_jsonInterface'>;

/**
 * Contract object.
 *
 * @param id - Contract id. Used to index contracts in redux-orm. Computed as `${networkId}-${address}`.
 * @param networkId - A network id.
 * @param address - Contract address.
 * @param abi - Contract ABI.
 * @param web3Contract - Web3 Contract instance
 * @param web3SenderContract - Web3 Contract instance used for send transactions.
 */
export interface Interface<T extends BaseWeb3Contract = BaseWeb3Contract> {
    readonly id?: string;
    readonly networkId: string;
    readonly address: string;
    readonly abi?: AbiItem[];
    readonly web3Contract?: T;
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
export function validate(contract: Interface): Interface {
    const { networkId, address } = contract;
    const addressCheckSum = toChecksumAddress(address);
    const id = getId({ networkId, address });
    return {
        ...contract,
        id,
        address: addressCheckSum,
    };
}

export default Interface;
