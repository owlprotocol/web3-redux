import { Block, BlockTransaction } from '../../block/model';
import { create as createTransaction } from '../../transaction/actions';
import { Transaction, getTransactionId } from '../../transaction/model';
import { isStrings } from '../../utils';
import BaseSync from './BaseSync';

export default interface BlockSync<T extends any = { [key: string]: string }> extends BaseSync<Block, T> {
    type: 'Block';
}

//Triggers once per block
export function defaultBlockSync(networkId: string, actions?: BlockSync['actions']) {
    return {
        type: 'Block',
        filter: (block, cache) => (!cache || !cache[block.id!]) && block.networkId === networkId,
        updateCache: (block, cache) => {
            return { ...cache, [block.id!]: true };
        },
        actions,
    } as BlockSync;
}

export function moduloBlockSync(networkId: string, period: number, actions?: BlockSync['actions']) {
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

export const blockTransactionsSync: BlockSync = {
    id: 'BlockTransactionsSync',
    type: 'Block',
    filter: () => true,
    actions: createBlockTransactionsActions,
};

export function createBlockTransactionsActions(block: Block) {
    const transactions = (block as BlockTransaction).transactions;
    if (!transactions) {
        return [];
    } else if (isStrings(transactions)) {
        return transactions.map((hash: string) => {
            return createTransaction({
                hash,
                networkId: block.networkId,
                blockNumber: block.number,
                blockId: block.id!,
                id: getTransactionId({ hash, networkId: block.networkId }),
            });
        });
    } else {
        return transactions.map((tx: Transaction) => {
            return createTransaction({
                ...tx,
                networkId: block.networkId,
                blockId: block.id!,
                id: getTransactionId({ hash: tx.hash, networkId: block.networkId }),
            });
        });
    }
}
