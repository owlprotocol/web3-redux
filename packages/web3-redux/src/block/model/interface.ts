import { BlockTransaction } from './BlockTransaction.js';
import { BlockId } from './id.js';
import { isStrings } from '../../utils/index.js';
import { validate as validateTransaction } from '../../transaction/model/interface.js';

export const BlockIndex = '[networkId+number], networkId, hash, timestamp';

/** @internal */
export function validateId(item: BlockId) {
    return [item.networkId, item.number];
}

/** @internal */
export function validate(item: BlockTransaction): BlockTransaction {
    let transactions = item.transactions;
    if (transactions) {
        if (!isStrings(transactions))
            transactions = transactions.map((t) =>
                validateTransaction({ ...t, networkId: item.networkId, blockNumber: item.number }),
            );
    }

    const result = {
        ...item,
    };
    if (transactions) result.transactions = transactions;

    return result;
}
