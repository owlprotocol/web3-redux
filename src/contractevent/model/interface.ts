import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { combinationAll } from '../../utils/combination';
import { ModelWithId } from '../../types/model';

/** @internal */
export interface IdDeconstructed {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block hash when event was emitted */
    readonly blockHash: string;
    /** Unique index within block of event */
    readonly logIndex: number;
}
/** @internal */
export type Id = string;

/** @internal */
export interface ReturnValues {
    returnValues: any;
}

/**
 * Contract event log.
 * @see [web3.eth.Contract.events](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#events)
 * @typeParam T optional type for return values. Defaults to `any` object.
 */
export interface ContractEvent<T extends ReturnValues = ReturnValues> extends IdDeconstructed {
    /** Used to index contract events in redux-orm. Computed as `${networkId}-${blockHash}-{logIndex}` */
    readonly id?: Id;
    /** Event name */
    readonly name: string;
    /** Address of contract that emitted event */
    readonly address: string;
    /** redux-orm id of contract `${networkId}-{address}` */
    readonly contractId?: string;
    /** Return values of event */
    readonly returnValues: T['returnValues'];
    /** Keys of `returnValues` to index event on */
    readonly returnValuesIndexKeys?: string[] | boolean;
    /** ContractEventIndex redux-orm ids. Used for efficient filtering. */
    readonly indexIds?: string[];
}

/** @internal */
export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
/** @internal */
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, blockHash, logIndex } = id;

    return [networkId, blockHash, logIndex].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, blockHash, logIndex] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, blockHash, logIndex: parseInt(logIndex) };
}

//Separate integer indexing from named indexing (eg. {0: val, value: val})
function returnValueKeyCombinations(keys: string[]) {
    const integerKeys = keys.filter((k: string) => !isNaN(parseInt(k)));
    const namedKeys = keys.filter((k: string) => isNaN(parseInt(k)));
    const integerKeysCombinations = combinationAll(integerKeys) as string[][];
    const namedKeysCombinations = combinationAll(namedKeys) as string[][];

    return [...integerKeysCombinations, ...namedKeysCombinations].filter((c) => c.length > 0); ///Remove empty set from combination
}

/** @internal */
export function validate(item: ContractEvent): ModelWithId<ContractEvent> {
    const id = getId(item);
    const networkId = item.networkId;
    const address = item.address;
    const addressChecksum = toChecksumAddress(item.address);
    const contractId = getContractId(item);

    //Default we only index named keys, but user can also pass (0,1,2) as argument
    const returnValuesKeys = Object.keys(item.returnValues).filter((k: string) => isNaN(parseInt(k)));
    let returnValuesIndexKeys: string[];
    if (!item.returnValuesIndexKeys) returnValuesIndexKeys = [];
    else if (item.returnValuesIndexKeys === true) returnValuesIndexKeys = returnValuesKeys;
    else returnValuesIndexKeys = item.returnValuesIndexKeys;

    const contractIndex = { networkId, address };
    const baseIndex = { ...contractIndex, name: item.name };
    const keyCombinations = returnValueKeyCombinations(returnValuesIndexKeys);

    const returnValuesIndexes = keyCombinations.map((keys) => {
        const returnValues: any = {};
        keys.forEach((k) => {
            returnValues[k] = item.returnValues[k];
        });
        return { ...baseIndex, returnValues }; //TODO: Non-contract indexed events?
    });

    //TODO: Index by networkId, contractId?
    const indexIds: string[] = [baseIndex, ...returnValuesIndexes].map((v) => JSON.stringify(v));
    return {
        ...item,
        id,
        address: addressChecksum,
        contractId,
        returnValuesIndexKeys,
        indexIds,
    };
}

export default ContractEvent;
