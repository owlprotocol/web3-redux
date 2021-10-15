import { createSelector } from 'redux-orm';
import { BlockTransaction, BlockTransactionObject, BlockTransactionBase } from './model';
import { Transaction } from '../transaction/model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id: string) => BlockTransactionBase | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (BlockTransactionBase | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.Block);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;

type selectTransactionsSingle = (state: any, id: string) => Transaction[] | null;
type selectTransactionsMany = (state: any, ids?: string[]) => (Transaction[] | null)[];
export const selectTransactions: selectTransactionsSingle | selectTransactionsMany = createSelector(
    orm.Block.transactions,
);
export const selectSingleTransactions = selectTransactions as selectTransactionsSingle;
export const selectManyTransactions = selectTransactions as selectTransactionsMany;

type selectBlockTransactionSingle = (state: any, id: string) => BlockTransaction | null;
type selectBlockTransactionMany = (state: any, ids?: string[]) => (BlockTransaction | null)[];
export const selectBlockTransaction: selectBlockTransactionSingle | selectBlockTransactionMany = createSelector(
    orm.Block,
    orm.Block.transactions,
    (blocks: BlockTransactionBase | BlockTransactionBase[], transactions: Transaction[] | Transaction[][]) => {
        if (!blocks) return null;

        if (!Array.isArray(blocks)) {
            return { ...blocks, transactions } as BlockTransactionObject;
        } else {
            return blocks.map((b, idx) => {
                if (!b) return null;
                return { ...b, transactions: transactions[idx] };
            }) as (BlockTransactionObject | null)[];
        }
    },
);
export const selectSingleBlockTransaction = selectBlockTransaction as selectBlockTransactionSingle;
export const selectManyBlockTransaction = selectBlockTransaction as selectBlockTransactionMany;
