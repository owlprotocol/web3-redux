import { BlockTransaction } from './BlockTransaction.js';
import { BlockId } from './id.js';

/** @internal */
export function validateId(item: BlockId) {
    return item;
}

/** @internal */
export function validate(item: BlockTransaction): BlockTransaction {
    return item;
}
