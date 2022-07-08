import { BaseSync } from './BaseSync.js';

/**
 * Sync middleware to handle [Transaction](./Transaction.Transaction-1) CREATE/UPDATE actions.
 */
//TODO: Implement Set based matching
export interface TransactionSync extends BaseSync {
    type: 'Transaction';
    matchFrom?: string; //| string[];
    matchTo?: string; // | string[];
}

export function createSyncForAddress(
    networkId: string,
    actions: TransactionSync['actions'],
    address?: string, // | string[],
): TransactionSync {
    return {
        type: 'Transaction',
        networkId,
        actions,
        matchFrom: address,
        matchTo: address,
    } as TransactionSync;
}
