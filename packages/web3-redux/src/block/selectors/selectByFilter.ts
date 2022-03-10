import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { BlockHeader } from '../model/index.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @internal */
type selectByFilterType = (state: any, filter: Partial<BlockHeader> | undefined) => BlockHeader[];
/** @category Selectors */
export const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<BlockHeader> | undefined) => filter,
    (session: any, filter: Partial<BlockHeader> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
