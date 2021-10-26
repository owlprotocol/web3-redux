import { Action } from 'redux';
import { Transaction } from '../../transaction/model';
import BaseSync from './BaseSync';

export default interface TransactionSync extends BaseSync {
    type: 'Transaction';
    filter: (x: Transaction) => boolean;
    actions?: Action[] | ((x: Transaction) => Action[]);
}

export function defaultTransactionSync(networkId: string, address: string, actions: TransactionSync['actions']) {
    return {
        type: 'Transaction',
        filter: (tx) =>
            tx.networkId === networkId &&
            (tx.to?.toLowerCase() === address.toLowerCase() || tx.from?.toLowerCase() === address.toLowerCase()),
        actions,
    } as TransactionSync;
}
