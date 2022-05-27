import { createSelector } from 'redux-orm';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
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
            if (newFilter.from) newFilter.from = toChecksumAddress(newFilter.from);
            if (newFilter.to) newFilter.to = toChecksumAddress(newFilter.to);
            if (newFilter.contractAddress) newFilter.contractAddress = toChecksumAddress(newFilter.contractAddress);
            query = query.filter(newFilter);
        }

        const result = query.toRefArray();
        return result;
        //return result;
        //return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
