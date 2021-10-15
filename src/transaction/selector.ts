import { createSelector } from 'redux-orm';
import { Transaction } from './model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id?: string) => Transaction | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (Transaction | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.Transaction);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;
