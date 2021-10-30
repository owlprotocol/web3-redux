import { validatedTransaction } from '../../transaction';
import { isStrings } from '../../utils';
import Block from './Block';
import BlockTransaction from './BlockTransaction';

export interface IdDeconstructed {
    readonly networkId: string;
    readonly number: number;
}
export type Id = string;

export type Interface = Block;
export interface InterfacePartialWithId extends Partial<BlockTransaction> {
    readonly id: Id;
}
export interface InterfacePartialWithIdDeconstructed extends Partial<BlockTransaction> {
    readonly networkId: IdDeconstructed['networkId'];
    readonly number: IdDeconstructed['number'];
}

export type InterfacePartial = InterfacePartialWithId | InterfacePartialWithIdDeconstructed;
export function isPartialWithId(x: InterfacePartial): x is InterfacePartialWithId {
    return !!x.id;
}
export function isPartialWithIdDeconstructed(x: InterfacePartial): x is InterfacePartialWithIdDeconstructed {
    return !x.id;
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, number } = id;

    return [networkId, number].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, number] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, number: parseInt(number) };
}

export function validate(item: InterfacePartial): Interface {
    const id = isPartialWithIdDeconstructed(item) ? getId(item) : item.id;
    const { networkId, number } = isPartialWithId(item)
        ? getIdDeconstructed(item.id)
        : { networkId: item.networkId, number: item.number };

    let transactions = item.transactions;
    if (transactions) {
        if (!isStrings(transactions))
            transactions = transactions.map((t) => validatedTransaction({ ...t, networkId, blockNumber: number }));
    }

    const result = {
        ...item,
        id,
        networkId,
        number,
    };
    if (transactions) result.transactions = transactions;

    return result;
}

export default Interface;
