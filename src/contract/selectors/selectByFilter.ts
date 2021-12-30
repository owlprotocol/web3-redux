import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';
import Contract from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @internal */
type selectByFilterType = (state: any, filter: Partial<Contract> | undefined) => Contract[];
/** @internal */
const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<Contract> | undefined) => filter,
    (session: any, filter: Partial<Contract> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
