import type { AbiItem } from 'web3-utils';

export interface ContractEventId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly blockNumber: number;
    /** Unique index within block of event */
    readonly logIndex: number;
}

/**
 * Contract event log.
 * @see [web3.eth.Contract.events](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#events)
 * @typeParam T optional type for return values. Defaults to `any` object.
 */
export interface ContractEvent<T extends Record<string, any> = Record<string, any>> extends ContractEventId {
    /** Block hash when event was emitted */
    readonly blockHash: string;
    /** Address of contract that emitted event */
    readonly address: string;
    /** Parsed Contract Event */
    /** Event name */
    readonly name?: string;
    readonly abi?: AbiItem;
    /** Return values of event */
    /** TODO: Index returnValues? */
    readonly returnValues?: T;

    /** Raw Log */
    /** Raw non-indexed log data */
    readonly data?: string;
    /** Raw indexed data */
    readonly topics?: string[];
    /** Topics */
    readonly topic0?: any;
    readonly topic1?: any;
    readonly topic2?: any;
    readonly topic3?: any;
}

export type ContractEventIndexInput =
    | ContractEventId
    | { networkId: string; blockNumber: number }
    | { networkId: string }
    | { networkId: string; blockHash: number; logIndex: number }
    | { networkId: string; blockHash: number }
    | { networkId: string; address: string; name: string }
    | { networkId: string; address: string }
    | { networkId: string; name: string }
    | { name: string }
    | { networkId: string; address: string; topic0: any; topic1: any; topic2: any; topic3: any }
    | { networkId: string; address: string; topic0: any; topic1: any; topic2: any }
    | { networkId: string; address: string; topic0: any; topic1: any }
    | { networkId: string; address: string; topic0: any }
    | { networkId: string; topic0: any; topic1: any; topic2: any; topic3: any }
    | { networkId: string; topic0: any; topic1: any; topic2: any }
    | { networkId: string; topic0: any; topic1: any }
    | { networkId: string; topic0: any };
//| { networkId: string; address: string; topic0: any; topic3: any; topic1: any }
//| { networkId: string; address: string; topic0: any; topic2: any; topic3: any }
//| { networkId: string; address: string; topic0: any; topic2: any }
//| { networkId: string; address: string; topic0: any; topic3: any }
export const ContractEventIndex =
    '[networkId+blockNumber+logIndex], [networkId+blockNumber+logIndex], [networkId+address+name], [networkId+name], name, [networkId+address+topic0+topic1+topic2+topic3], [networkId+topic0+topic1+topic2+topic3]';

/** @internal */
export function validateId({ networkId, blockNumber, logIndex }: ContractEventId): ContractEventId {
    return { networkId, blockNumber, logIndex };
}

export function toPrimaryKey({ networkId, blockNumber, logIndex }: ContractEventId): [string, number, number] {
    return [networkId, blockNumber, logIndex];
}

/** @internal */
export function validate(item: ContractEvent): ContractEvent {
    //@ts-ignore
    const name = item.name ?? item.event;
    const address = item.address.toLowerCase();
    const topic0 = item.topic0 ?? (item.topics && item.topics.length > 0 ? item.topics[0] : undefined);
    const topic1 = item.topic1 ?? (item.topics && item.topics.length > 1 ? item.topics[1] : undefined);
    const topic2 = item.topic2 ?? (item.topics && item.topics.length > 2 ? item.topics[2] : undefined);
    const topic3 = item.topic3 ?? (item.topics && item.topics.length > 3 ? item.topics[3] : undefined);

    return {
        ...item,
        name,
        address,
        topic0,
        topic1,
        topic2,
        topic3,
    };
}

export default ContractEvent;
