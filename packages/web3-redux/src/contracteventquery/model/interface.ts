import { ContractEventId } from '../../contractevent/model/index.js';

export interface ContractEventQueryId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Address of contract*/
    readonly address: string;
    readonly name: string;
    readonly fromBlock: number;
    readonly toBlock: number;
    readonly filterHash: string;
}

/**
 * Contract event query cache.
 */
export interface ContractEventQuery extends ContractEventQueryId {
    readonly filter?: Record<string, any>;
    readonly events?: ContractEventId[];
    readonly errorId?: string;
}

export type ContractEventIndexInput = ContractEventQueryId;
export const ContractEventQueryIndex = '[networkId+address+name+fromBlock+toBlock+filterHash]';

/** @internal */
export function validateId({
    networkId,
    address,
    name,
    fromBlock,
    toBlock,
    filterHash,
}: ContractEventQueryId): ContractEventQueryId {
    return { networkId, address: address.toLowerCase(), name, fromBlock, toBlock, filterHash };
}

export function toPrimaryKey({
    networkId,
    address,
    name,
    fromBlock,
    toBlock,
    filterHash,
}: ContractEventQueryId): [string, string, string, number, number, string] {
    return [networkId, address.toLowerCase(), name, fromBlock, toBlock, filterHash];
}

/** @internal */
export function validate(item: ContractEventQuery): ContractEventQuery {
    return {
        ...item,
        address: item.address.toLowerCase(),
    };
}

export default ContractEventQuery;
