import { createSelector } from 'redux-orm';
import { EthCall } from './model';
import { orm } from '../orm';

type selectByIdSingle = (state: any, id?: string) => EthCall | undefined;
type selectByIdMany = (state: any, ids?: string[]) => (EthCall | null)[];
export const selectById: selectByIdSingle | selectByIdMany = createSelector(orm.EthCall);
export const selectByIdSingle: selectByIdSingle = (state: any, id?: string) => {
    if (!id) return undefined;
    //@ts-ignore
    return selectById(state, id) as ReturnType<selectByIdSingle>;
};
export const selectByIdMany = selectById as selectByIdMany;
