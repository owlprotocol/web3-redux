import { AnyAction } from 'redux';
export * from './BaseSync.js';
import { BlockSync, createBlockSyncEveryBlock } from './BlockSync.js';
import { EventSync } from './EventSync.js';
import { TransactionSync, createTransactionSyncForAddress } from './TransactionSync.js';

/**
 * Sync Middleware Type
 */
export type Sync = BlockSync | TransactionSync | EventSync;
export type { BlockSync, EventSync, TransactionSync };

/**
 * Sync Middleware Type + simplified notation
 */
export type GenericSync = EventSync | 'Block' | 'Transaction' | number | 'once';
/**
 * Create a Sync object from generic parameters
 * @category Actions
 */
export function createSyncForActions(
    networkId: string | undefined,
    actions: AnyAction[],
    sync: GenericSync,
    address: string | undefined,
): Sync | undefined {
    //Default sync
    if (!networkId || !address) {
        return undefined;
    } else if (sync === 'once') {
        return undefined;
    } else if (sync === 'Transaction') {
        return createTransactionSyncForAddress(networkId, actions, address);
    } else if (sync === 'Block') {
        return createBlockSyncEveryBlock(networkId, actions);
    } else if (typeof sync === 'number') {
        return createBlockSyncEveryBlock(networkId, actions, sync);
    } else {
        sync.actions = actions;
        return sync;
    }
}

/** @internal */
export function validateId(item: Partial<Sync>) {
    if (!item.id) throw new Error('id undefined');
    return item.id;
}

/** @internal */
export function validate(item: Partial<Sync>): Sync {
    return item as Sync;
}

export default Sync;
