import { createSelector } from 'redux-orm';

import { Transaction } from '../../transaction/model';
import { getOrm } from '../../orm';

/** @internal */
type selectTransactionsSingle = (state: any, id: string) => Transaction[] | null;
/** @internal */
type selectTransactionsMany = (state: any, ids?: string[]) => (Transaction[] | null)[];
/** @internal */
export const selectTransactions: selectTransactionsSingle | selectTransactionsMany = createSelector(
    getOrm().Block.transactions,
);
/** @category Selectors */
export const selectSingleTransactions = selectTransactions as selectTransactionsSingle;
/** @category Selectors */
export const selectManyTransactions = selectTransactions as selectTransactionsMany;
