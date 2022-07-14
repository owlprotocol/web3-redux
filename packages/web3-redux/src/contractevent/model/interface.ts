import { combinationAll } from '../../utils/combination.js';

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
    /** Return values of event */
    /** TODO: Index returnValues? */
    readonly returnValues?: T;

    /** Raw Log */
    /** Raw non-indexed log data */
    readonly data?: string;
    /** Raw indexed data */
    readonly topics?: string[];
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
    | { name: string };
export const ContractEventIndex =
    '[networkId+blockNumber+logIndex], [networkId+blockNumber+logIndex], [networkId+address+name], [networkId+name], name';

//Separate integer indexing from named indexing (eg. {0: val, value: val})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function returnValueKeyCombinations(keys: string[]) {
    const integerKeys = keys.filter((k: string) => !isNaN(parseInt(k)));
    const namedKeys = keys.filter((k: string) => isNaN(parseInt(k)));
    const integerKeysCombinations = combinationAll(integerKeys) as string[][];
    const namedKeysCombinations = combinationAll(namedKeys) as string[][];

    return [...integerKeysCombinations, ...namedKeysCombinations].filter((c) => c.length > 0); ///Remove empty set from combination
}

/** @internal */
export function validateId(item: ContractEventId) {
    return [item.networkId, item.blockNumber, item.logIndex];
}

/** @internal */
export function validate(item: ContractEvent): ContractEvent {
    //@ts-ignore
    const name = item.name ?? item.event;
    const address = item.address.toLowerCase();
    /*
    const extraIndices = item.indexIds ?? [];

    //Default we only index named keys, but user can also pass (0,1,2) as argument
    const returnValuesKeys = Object.keys(item.returnValues ?? {}).filter((k: string) => isNaN(parseInt(k)));
    let returnValuesIndexKeys: string[];
    if (!item.returnValuesIndexKeys) returnValuesIndexKeys = [];
    else if (item.returnValuesIndexKeys === true) returnValuesIndexKeys = returnValuesKeys;
    else returnValuesIndexKeys = item.returnValuesIndexKeys;

    //All events for contract
    const contractIndex = { networkId, address };
    //Events by name for contract (equivalent to signature)
    const eventIndex = { ...contractIndex, name };
    ///Events by returnValues filters (disabled by default)
    const keyCombinations = returnValueKeyCombinations(returnValuesIndexKeys);

    const returnValuesIndexes = keyCombinations.map((keys) => {
        const returnValues: any = {};
        keys.forEach((k) => {
            returnValues[k] = item.returnValues[k];
        });
        return { ...eventIndex, returnValues };
    });

    const indices: any[] = [contractIndex];
    if (name) indices.push(eventIndex);
    indices.push(...returnValuesIndexes);

    //Combine passed indices with default indices
    const indexIds: string[] = uniq([...extraIndices, ...indices.map((v) => JSON.stringify(v))]);
    */
    return {
        ...item,
        name,
        address,
    };
}

export default ContractEvent;
