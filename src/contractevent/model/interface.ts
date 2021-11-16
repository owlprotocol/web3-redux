import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';

export interface IdDeconstructed {
    readonly networkId: string;
    readonly blockHash: string;
    readonly logIndex: number;
}
export type Id = string;

export interface ReturnValues {
    returnValues: any;
}
export interface Interface<T extends ReturnValues = ReturnValues> extends IdDeconstructed {
    readonly id?: Id;
    readonly name: string;
    readonly address: string;
    readonly contractId?: string;
    readonly returnValues: T['returnValues'];
    readonly indexIds?: string[];
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, blockHash, logIndex } = id;

    return [networkId, blockHash, logIndex].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, blockHash, logIndex] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, blockHash, logIndex: parseInt(logIndex) };
}

export function validate(item: Interface): Interface {
    const id = getId(item);
    const networkId = item.networkId;
    const address = item.address;
    const addressChecksum = toChecksumAddress(item.address);
    const contractId = getContractId(item);

    const networkIndex = { networkId };
    const contractIndex = { networkId, address };
    const baseIndex = { ...contractIndex, name: item.name };
    //TODO: Add permutations for multi-key indexing
    const returnValueIndexes = Object.entries(item.returnValues).map(([k, v]) => {
        return { ...baseIndex, returnValues: { [k]: v } };
    });
    const indexIds: string[] = [networkIndex, contractIndex, baseIndex, ...returnValueIndexes].map((v) =>
        JSON.stringify(v),
    );
    return {
        ...item,
        id,
        address: addressChecksum,
        contractId,
        indexIds,
    };
}

export default Interface;
