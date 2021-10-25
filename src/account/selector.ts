import { createSelector } from 'redux-orm';
import { Account } from './model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id?: string) => Account | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (Account | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.Account);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;
