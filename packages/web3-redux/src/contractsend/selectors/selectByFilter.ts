import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';
import { ContractSend } from '../model/interface';
import { memoizeArrayByRef } from '../../utils/memo';

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
        return memoizeArrayByRef(result);
    },
);

export default selectByFilter;
