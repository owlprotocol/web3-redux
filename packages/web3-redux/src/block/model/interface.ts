import { getId } from './id';
import { BlockTransaction } from './BlockTransaction';
import { isStrings } from '../../utils';
import { validate as validateTransaction } from '../../transaction/model/interface';
import { ModelWithId } from '../../types/model';

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
