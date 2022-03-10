import { AnyAction } from 'redux';
import { BlockSync, createBlockSyncEveryBlock } from './BlockSync';
import { EventSync } from './EventSync';
import { TransactionSync, createTransactionSyncForAddress } from './TransactionSync';

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
    networkId: string,
    actions: AnyAction[],
    sync: GenericSync,
    address: string,
): Sync | undefined {
    //Default sync
    if (sync === 'once') {
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
export default Sync;
