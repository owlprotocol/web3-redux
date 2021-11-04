import { AbiItem, toChecksumAddress } from 'web3-utils';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { SyncType } from '../../sync/model/SyncType';

/**
 * Contract Id object.
 *
 * @param networkId - A network id.
 * @param address - Contract address.
 */
export interface IdDeconstructed {
    networkId: string;
    address: string;
}
export type Id = string;

export type BaseWeb3Contract = Omit<Web3Contract, 'once' | 'clone' | '_address' | '_jsonInterface'>;

/**
 * Contract object.
 *
 * @param id - Contract id. Used to index contracts in redux-orm. Computed as `${networkId}-${address}`.
 * @param networkId - A network id.
 * @param address - Contract address.
 * @param abi - Contract ABI.
 * @param methods - Contract call store. Call data is stored at [methodName][`(${...args}).call(${defaultBlock},${from})`]
 * @param web3Contract - Web3 Contract instance
 * @param web3SenderContract - Web3 Contract instance used for send transactions.
 */
export interface Interface<T extends BaseWeb3Contract = BaseWeb3Contract> {
    readonly id?: string;
    readonly networkId: string;
    readonly address: string;
    readonly abi?: AbiItem[];
    readonly methods?: {
        [callerFunctionName: string]: {
            [argsHash: string]: { ethCallId?: string; sync?: SyncType | false };
        };
    };
    readonly web3Contract?: T;
    readonly web3SenderContract?: T;
}

export type IdArgs = Id | IdDeconstructed;
const SEPARATOR = '-';
export function getId(id: IdArgs): string {
    if (typeof id == 'string') return id;
    const { networkId, address } = id;
    const addressChecksum = toChecksumAddress(address);
    return [networkId, addressChecksum].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    const addressChecksum = toChecksumAddress(address);
    return { networkId, address: addressChecksum };
}

export function validate(contract: Interface): Interface {
    const { networkId, address } = contract;
    const addressCheckSum = toChecksumAddress(address);
    const methods =
        contract.methods ??
        (contract.abi ?? [])
            .filter((item: { type: string }) => item.type == 'function')
            .map((item: any) => item.name!)
            .reduce((acc: any, m: any) => {
                return { ...acc, [m]: {} };
            }, {});
    const id = getId({ networkId, address });
    return {
        ...contract,
        id,
        address: addressCheckSum,
        methods,
    };
}

export default Interface;
