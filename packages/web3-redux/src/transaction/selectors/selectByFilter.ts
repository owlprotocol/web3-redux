import { createSelector } from 'redux-orm';

import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { Transaction } from '../model/interface.js';
//import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef.js';

type selectByFilterType = (state: any, filter?: Partial<Transaction> | undefined) => Transaction[];
/** @category Selectors */
export const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<Transaction> | undefined) => filter,
    (session: any, filter: Partial<Transaction> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (filter) {
            const newFilter = { ...filter };
            if (newFilter.from) newFilter.from = newFilter.from.toLowerCase();
            if (newFilter.to) newFilter.to = newFilter.to.toLowerCase();
            if (newFilter.contractAddress) newFilter.contractAddress = newFilter.contractAddress.toLowerCase();
            query = query.filter(newFilter);
        }

        const result = query.toRefArray();
        return result;
        //return result;
        //return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
