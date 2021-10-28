import { AbiItem, toChecksumAddress } from 'web3-utils';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { NetworkId } from '../../network/model';
import { Sync } from '../../sync/model';

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
export interface Contract<T extends BaseWeb3Contract = BaseWeb3Contract> extends NetworkId {
    id: string;
    address: string;
    abi: AbiItem[];
    methods: {
        [callerFunctionName: string]: {
            [argsHash: string]: { ethCallId?: string; sync?: Sync['type'] | false };
        };
    };
    web3Contract?: T;
    web3SenderContract?: T;
}

export interface ContractPartial<T extends BaseWeb3Contract = BaseWeb3Contract> extends NetworkId {
    address: string;
    abi: AbiItem[];
    methods?: {
        [callerFunctionName: string]: {
            [argsHash: string]: { ethCallId?: string; sync?: Sync['type'] | false };
        };
    };
    web3Contract?: T;
    web3SenderContract?: T;
}

/**
 * Contract Id object.
 *
 * @param networkId - A network id.
 * @param address - Contract address.
 */
export interface ContractIdDeconstructed extends NetworkId {
    address: string;
}

export type ContractId = ContractIdDeconstructed | string;
export function getId({ address, networkId }: ContractIdDeconstructed): string {
    const addressChecksum = toChecksumAddress(address);
    return [networkId, addressChecksum].join('-');
}

export function validate(contract: ContractPartial): Contract {
    const { networkId, address } = contract;
    const addressCheckSum = toChecksumAddress(address);
    const methods =
        contract.methods ??
        contract.abi
            .filter((item) => item.type == 'function')
            .map((item) => item.name!)
            .reduce((acc, m) => {
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
