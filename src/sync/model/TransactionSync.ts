import { Transaction } from '../../transaction/model';
import BaseSync from './BaseSync';

export default interface TransactionSync extends BaseSync {
    type: 'Transaction';
    filter: (x: Transaction) => boolean;
}

export function defaultTransactionSync(actions: TransactionSync['actions'], address: string) {
    return {
        type: 'Transaction',
        filter: (tx) => tx.to?.toLowerCase() === address.toLowerCase(),
        actions,
    } as TransactionSync;
}
