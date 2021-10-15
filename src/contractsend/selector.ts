import { createSelector } from 'redux-orm';
import { ContractSend } from './model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id?: string) => ContractSend | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (ContractSend | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.ContractSend);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;
