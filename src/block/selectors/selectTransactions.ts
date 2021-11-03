import { createSelector } from 'redux-orm';

import { Transaction } from '../../transaction/model';
import ORM from '../../orm';

type selectTransactionsSingle = (state: any, id: string) => Transaction[] | null;
type selectTransactionsMany = (state: any, ids?: string[]) => (Transaction[] | null)[];
export const selectTransactions: selectTransactionsSingle | selectTransactionsMany = createSelector(
    ORM.orm.Block.transactions,
);
export const selectSingleTransactions = selectTransactions as selectTransactionsSingle;
export const selectManyTransactions = selectTransactions as selectTransactionsMany;
