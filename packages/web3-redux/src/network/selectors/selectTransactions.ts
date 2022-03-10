import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model/index.js';

import { name } from '../common.js';
import { getOrm } from '../../orm.js';

const select = createSelector(getOrm()[name].transactions);
/** @category Selectors */
function selectTransactions(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Transaction[];
}

export default selectTransactions;
