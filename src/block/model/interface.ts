import { validate as validateTransaction } from '../../transaction/model/interface';
import { isStrings } from '../../utils';
import { getId } from './id';
import BlockTransaction from './BlockTransaction';

export type Interface = BlockTransaction;

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
