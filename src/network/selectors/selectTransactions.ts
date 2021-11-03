import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model';

import { name } from '../common';
import { getOrm } from '../../orm';

const select = createSelector(getOrm()[name].transactions);
function selectTransactions(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Transaction[];
}

export default selectTransactions;
