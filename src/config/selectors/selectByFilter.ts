import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';
import Interface from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

type selectByFilterType = (state: any, filter: Partial<Interface> | undefined) => Interface[];
const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<Interface> | undefined) => filter,
    (session: any, filter: Partial<Interface> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
