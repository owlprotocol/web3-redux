import { createSelector } from 'redux-orm';

import { Transaction } from '../../transaction/model';
import { BlockTransaction } from '../model';
import { getOrm } from '../../orm';

/** @internal */
type selectBlockTransactionSingle = (state: any, id: string) => BlockTransaction | null;
/** @internal */
type selectBlockTransactionMany = (state: any, ids?: string[]) => (BlockTransaction | null)[];
/** @internal */
export const selectBlockTransaction: selectBlockTransactionSingle | selectBlockTransactionMany = createSelector(
    getOrm().Block,
    getOrm().Block.transactions,
    (blocks: BlockTransaction | BlockTransaction[], transactions: Transaction[] | Transaction[][]) => {
        if (!blocks) return null;

        if (!Array.isArray(blocks)) {
            return { ...blocks, transactions } as BlockTransaction;
        } else {
            return blocks.map((b, idx) => {
                if (!b) return null;
                return { ...b, transactions: transactions[idx] };
            }) as (BlockTransaction | null)[];
        }
    },
);
/** @category Selectors */
export const selectSingleBlockTransaction = selectBlockTransaction as selectBlockTransactionSingle;
/** @category Selectors */
export const selectManyBlockTransaction = selectBlockTransaction as selectBlockTransactionMany;
