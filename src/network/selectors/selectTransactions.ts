import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model';

import { name } from '../common';
import { orm } from '../../orm';

const select = createSelector(orm[name].transactions);
function selectTransactions(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Transaction[];
}

export default selectTransactions;
