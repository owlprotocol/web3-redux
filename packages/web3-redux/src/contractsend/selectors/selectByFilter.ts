import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { ContractSend } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

type selectByFilterType = (state: any, filter: Partial<ContractSend> | undefined) => ContractSend[];
/** @category Selectors */
const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<ContractSend> | undefined) => filter,
    (session: any, filter: Partial<ContractSend> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return result;
        //return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
