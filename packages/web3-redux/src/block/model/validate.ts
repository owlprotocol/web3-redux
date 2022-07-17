import { BlockTransaction } from './BlockTransaction.js';
import { BlockId } from './id.js';

/** @internal */
export function validateId({ networkId, number }: BlockId) {
    return { networkId, number };
}

export function toPrimaryKey({ networkId, number }: BlockId): [string, number] {
    return [networkId, number];
}

/** @internal */
export function validate(item: BlockTransaction): BlockTransaction {
    return item;
}
