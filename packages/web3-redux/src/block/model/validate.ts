import { BlockTransaction } from './BlockTransaction.js';
import { BlockId } from './id.js';

/** @internal */
export function validateId(item: BlockId) {
    return [item.networkId, item.number];
}

/** @internal */
export function validate(item: BlockTransaction): BlockTransaction {
    return item;
}
