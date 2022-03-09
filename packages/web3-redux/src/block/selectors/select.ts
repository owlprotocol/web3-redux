import { createSelector } from 'redux-orm';

import Transaction from '../../transaction/model/interface';
import BlockTransaction from '../model/BlockTransaction';
import { getOrm } from '../../orm';

/** @internal */
export type selectSingle = (state: any, id?: string) => BlockTransaction | undefined;
/** @internal */
export type selectMany = (state: any, ids?: string[]) => (BlockTransaction | undefined)[];
/** @internal */
export const select: selectSingle | selectMany = createSelector(
    getOrm().Block,
    getOrm().Block.transactions,
    (blocks: BlockTransaction | BlockTransaction[], transactions: Transaction[] | Transaction[][]) => {
        if (!blocks) return undefined;

        if (!Array.isArray(blocks)) {
            return { ...blocks, transactions } as BlockTransaction;
        } else {
            return blocks.map((b, idx) => {
                if (!b) return undefined;
                return { ...b, transactions: transactions[idx] };
            }) as (BlockTransaction | null)[];
        }
    },
);

export default select;
