import { Transaction } from '../../transaction/model';
import BaseSync from './BaseSync';

/**
 * Sync middleware to handle [Transaction](./Transaction.Transaction-1) CREATE/UPDATE actions.
 */
export default interface TransactionSync<T extends any = { [key: string]: string }> extends BaseSync<Transaction, T> {
    type: 'Transaction';
}

export function defaultTransactionSync(networkId: string, address: string, actions: TransactionSync['actions']) {
    return {
        type: 'Transaction',
        filter: (tx, cache) =>
            (!cache || !cache[tx.id!]) &&
            tx.networkId === networkId &&
            (tx.to?.toLowerCase() === address.toLowerCase() || tx.from?.toLowerCase() === address.toLowerCase()),
        updateCache: (tx, cache) => {
            return { ...cache, [tx.id!]: true };
        },
        actions,
    } as TransactionSync;
}
