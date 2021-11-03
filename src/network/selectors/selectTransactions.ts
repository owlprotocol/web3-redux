import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model';

import { name } from '../common';
import ORM from '../../orm';

const select = createSelector(ORM.orm[name].transactions);
function selectTransactions(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Transaction[];
}

export default selectTransactions;
