import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { EthCall } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

type selectByFilterType = (state: any, filter: Partial<EthCall> | undefined) => EthCall[];
/** @category Selectors */
const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<EthCall> | undefined) => filter,
    (session: any, filter: Partial<EthCall> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
