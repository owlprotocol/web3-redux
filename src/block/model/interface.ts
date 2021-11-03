import { validateTransaction } from '../../transaction';
import { isStrings } from '../../utils';
import BlockTransaction from './BlockTransaction';

export interface IdDeconstructed {
    readonly networkId: string;
    readonly number: number;
}
export type Id = string;

export type Interface = BlockTransaction;
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

export function validate(item: Interface): Interface {
    const id = getId(item);
    let transactions = item.transactions;
    if (transactions) {
        if (!isStrings(transactions))
            transactions = transactions.map((t) =>
                validateTransaction({ ...t, networkId: item.networkId, blockNumber: item.number }),
            );
    }

    const result = {
        ...item,
        id,
    };
    if (transactions) result.transactions = transactions;

    return result;
}

export default Interface;
