import { createSelector } from 'redux-orm';
import { ContractEvent } from './model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id: string | undefined) => ContractEvent | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (ContractEvent | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.ContractEvent);
export const selectByIdSingle: selectByIdSingle = (state: any, id: string | undefined) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;
