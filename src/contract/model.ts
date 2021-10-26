import { attr, fk, Model as ORMModel } from 'redux-orm';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract as Web3Contract, EventData } from 'web3-eth-contract';
import { NetworkId } from '../network/model';
import { Sync } from '../sync/model';
import { ZERO_ADDRESS } from '../utils';

/**
 * Contract call object. Stores a cached contract call.
 *
 * @param value - Contract call return value.
 * @param defaultBlock - Call at a specific block height. Block number or "latest".
 * @param args - Call function arguments.
 * @param sync - {@link ContractCallSync} used to sync calls. defaultBlock MUST be "latest".
 */
export interface ContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string> {
    value: any;
    defaultBlock: string | number;
    args?: Parameters<T['methods'][K]>;
    sync: Sync['type'] | false;
}

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

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Contract';

    static fields = {
        address: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'contracts' }),
        abi: attr(),
    };
}

export function validatedContract(contract: ContractPartial): Contract {
    const { networkId, address } = contract;
    const addressCheckSum = Web3.utils.toChecksumAddress(address);
    const methods =
        contract.methods ??
        contract.abi
            .filter((item) => item.type == 'function')
            .map((item) => item.name!)
            .reduce((acc, m) => {
                return { ...acc, [m]: {} };
            }, {});
    const id = contractId({ networkId, address });
    return {
        ...contract,
        id,
        address: addressCheckSum,
        methods,
    };
}

export function contractId({ address, networkId }: ContractIdDeconstructed): string {
    const addressChecksum = Web3.utils.toChecksumAddress(address);
    return `${networkId}-${addressChecksum}`;
}

export function deconstructId(id: string): ContractIdDeconstructed {
    const [networkId, address] = id.split('-');
    return {
        networkId,
        address,
    };
}

export function eventId(event: EventData): string {
    return `${event.transactionHash}-${event.transactionIndex}`;
}

export interface EventSubscription {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export function eventSubscriptionHash(subscription: EventSubscription): string {
    let id = `${subscription.networkId}-${subscription.address}-${subscription.eventName}`;
    if (subscription.filter) id = `${id}-${JSON.stringify(subscription.filter)}`;
    return id;
}

export interface CallArgsHash<P extends any[] = any[]> {
    args?: P;
    defaultBlock?: string | number;
    from?: string;
}
export function callArgsHash<P extends any[] = any[]>(callArgs?: CallArgsHash<P>): string {
    if (!callArgs) return `().call(latest,${ZERO_ADDRESS})`;

    // eslint-disable-next-line prefer-const
    let { args, from, defaultBlock } = callArgs!;
    if (!defaultBlock) defaultBlock = 'latest';
    if (!from) from = ZERO_ADDRESS;

    if (!args || args.length == 0) {
        return `().call(${defaultBlock},${from})`;
    } else {
        return `(${JSON.stringify(args)}).call(${defaultBlock},${from})`;
    }
}

export { Model };
