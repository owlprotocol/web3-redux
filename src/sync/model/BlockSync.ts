import { batchActions } from 'redux-batched-actions';
import { BlockHeader, BlockTransaction } from '../../block/model';
import { create as createTransaction } from '../../transaction/actions';
import { Transaction, getTransactionId } from '../../transaction/model';
import { isStrings } from '../../utils';
import BaseSync from './BaseSync';

/**
 * Sync middleware to handle {@link BlockHeader} CREATE/UPDATE actions.
 */
export default interface BlockSync<T extends any = { [key: string]: string }> extends BaseSync<BlockHeader, T> {
    type: 'Block';
}

/** Triggers once per block of network
 * @param networkId Network blocks to monitor
 * @param actions Array of actions to dispatch per trigger
 */
export function defaultBlockSync(networkId: string, actions: BlockSync['actions']) {
    return {
        type: 'Block',
        filter: (block, cache) => (!cache || !cache[block.id!]) && block.networkId === networkId,
        updateCache: (block, cache) => {
            return { ...cache, [block.id!]: true };
        },
        actions,
    } as BlockSync;
}

/** Triggers every N blocks of network
 * @param networkId Network blocks to monitor
 * @param period N
 * @param actions Array of actions to dispatch per trigger
 */
export function moduloBlockSync(networkId: string, period: number, actions: BlockSync['actions'] = []) {
    return {
        type: 'Block',
        filter: (block, cache) =>
            (!cache || !cache[block.id!]) && block.networkId === networkId && block.number % period == 0,
        updateCache: (block, cache) => {
            return { ...cache, [block.id!]: true };
        },
        actions,
    } as BlockSync<{ [key: string]: string }>;
}

/**
 * Triggers for every block to dispatch actions creating Transaction objects.
 */
export const blockTransactionsSync: BlockSync = {
    id: 'BlockTransactionsSync',
    type: 'Block',
    filter: () => true,
    actions: createBlockTransactionsActions,
};

export function createBlockTransactionsActions(block: BlockHeader) {
    const transactions = (block as BlockTransaction).transactions;
    if (!transactions) {
        return [];
    } else if (isStrings(transactions)) {
        const actions = transactions.map((hash: string) => {
            return createTransaction({
                hash,
                networkId: block.networkId,
                blockNumber: block.number,
                blockId: block.id!,
                id: getTransactionId({ hash, networkId: block.networkId }),
            });
        });

        if (actions.length == 0) return [];

        const batch = batchActions(actions, `${createTransaction.type}/${actions.length}`);
        return [batch];
    } else {
        const actions = transactions.map((tx: Transaction) => {
            return createTransaction({
                ...tx,
                networkId: block.networkId,
                blockId: block.id!,
                id: getTransactionId({ hash: tx.hash, networkId: block.networkId }),
            });
        });

        if (actions.length == 0) return [];

        const batch = batchActions(actions, `${createTransaction.type}/${actions.length}`);
        return [batch];
    }
}
