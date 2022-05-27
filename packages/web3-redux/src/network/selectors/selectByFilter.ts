import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { Network } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

type selectByFilterType = (state: any, filter: Partial<Network> | undefined) => Network[];
/** @category Selectors */
const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<Network> | undefined) => filter,
    (session: any, filter: Partial<Network> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return result;
        //return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
