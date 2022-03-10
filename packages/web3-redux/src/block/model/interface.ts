import { getId } from './id.js';
import { BlockTransaction } from './BlockTransaction.js';
import { isStrings } from '../../utils/index.js';
import { validate as validateTransaction } from '../../transaction/model/interface.js';
import { ModelWithId } from '../../types/model.js';

/** @internal */
export function validate(item: BlockTransaction): ModelWithId<BlockTransaction> {
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
